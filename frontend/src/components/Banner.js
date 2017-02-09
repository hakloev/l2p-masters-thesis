import React, { PropTypes } from 'react';

const styles = {
  wrapper: {
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    padding: '15px 0',
    backgroundColor: '#e3e3e3',
  },
};

class Banner extends React.Component {

  render() {
    const { title } = this.props;

    return (
      <section style={styles.wrapper}>
        <h1>{title}</h1>
      </section>
    );
  }
}

Banner.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Banner;
