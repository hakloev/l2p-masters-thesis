import React, { PropTypes } from 'react';

const Banner = ({ title, color }) => {
  return (
    <section className={`banner banner--${color}`}>
      <div className="row">
        <div className="col s12">
          <h1>{title}</h1>
        </div>
      </div>
    </section>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Banner.defaultProps = {
  color: 'grey',
};

export default Banner;
