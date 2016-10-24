import logging
import uuid
import tempfile
import os
from docker import Client
from docker.errors import NotFound
from requests.exceptions import ReadTimeout, ConnectionError


class DockerSandbox(object):

    def __init__(self, url='unix://var/run/docker.sock', image='python:3.5-slim', name_prefix='l2p_', timeout=10, memory_limit='128m', network_mode='none'):
        self.log = logging.getLogger(__name__)
        self.cli = Client(base_url=url)
        self.image = image
        self.container_name = '%s-%s' % (name_prefix, uuid.uuid4())
        self.timeout = timeout
        self.memory_limit = memory_limit
        self.network_mode = network_mode
        self.container = None

    def __enter__(self):
        return self._initiate()

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._exit()
        if exc_val:
            raise exc_val

    def _initiate(self):
        return self

    def _exit(self):
        pass

    def run(self, code, file_name='input.py'):

        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tmp')
        with tempfile.TemporaryDirectory(dir=path) as tmp_path:
            self.log.debug('Temporary code file %s written to %s' % (file_name, path))
            with open(os.path.join(tmp_path, file_name), 'w') as f:
                f.write(code.encode().decode('utf-8'))

            host_config = self.cli.create_host_config(
                mem_limit=self.memory_limit,
                network_mode=self.network_mode,
                binds=['%s/:/mnt/data' % tmp_path]
            )
            try:
                container = self.cli.create_container(
                    image=self.image,
                    host_config=host_config,
                    volumes=['/mnt/data'],
                    command='python3 /mnt/data/%s' % file_name
                )
            except NotFound as e:
                self.log.info('Failed creating container: %s' % e)
                return {'error': 'Failed to create container'}
            except ConnectionError as e:
                self.log.info('Failed to connect to Docker socker, is it turned on? %s' % e)
                return {'error': 'Failed to connect to Docker socket'}

            container_id = container.get('Id')

            self.cli.start(container=container_id)

            try:
                self.cli.wait(container=container_id, timeout=self.timeout)
            except ReadTimeout:
                return {
                    'output': None,
                    'error': 'Timed out!',
                    'timeout': True
                }
            else:
                output = self.cli.logs(container=container_id, stdout=True).decode('UTF-8')
                if self.cli.inspect_container(container=container_id)['State']['ExitCode'] != 0:
                    return {
                        'output': output,
                        'error': 'Compilation failed',
                        'timeout': False
                    }
                return {
                    'output': output,
                    'error': None,
                    'timeout': False
                }
            finally:
                self.cli.stop(container=container_id)
                self.cli.remove_container(container=container_id, force=True)


if __name__ == "__main__":
    with DockerSandbox() as docker:
        docker.run('def f(num1, num2):\r\n    return num1 == num1\r\nprint(f(2,2))')
