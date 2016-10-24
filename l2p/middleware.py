import json
from django.http import QueryDict


class JSONMiddleware(object):
    """
    Middleware to process application/json requests from GET and POST requests
    """

    def process_request(self, request):
        if request.META['CONTENT_TYPE'] == 'application/json':
            if request.body is not b'':
                data = json.loads(request.body.decode('UTF-8'))

                q_data = QueryDict('', mutable=True)
                for key, value in data.items():
                    if isinstance(value, list):
                        for x in value:
                            q_data.update({key: x})
                    else:
                        q_data.update({key: value})

                if request.method == 'GET':
                    request.GET = q_data

                if request.method == 'POST':
                    request.POST = q_data

        return None
