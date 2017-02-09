import React from 'react';
import Banner from '../components/Banner';

const styles = {
  title: {
    marginTop: 20,
  },
};

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Banner title="not found" />
        <h1 style={styles.title}>Not Found</h1>
      </div>
    );
  }
}
