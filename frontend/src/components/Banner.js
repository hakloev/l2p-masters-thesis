import React, { PropTypes } from 'react';

const Banner = ({ title }) => {
  return (
    <section className="banner banner--grey">
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
};

export default Banner;
