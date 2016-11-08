import React, { PropTypes } from 'react';

const StatisticsBadge = ({ count, title, subtitle }) => {
  return (
    <div className="stats-badge">
      <div className="stats-badge-content">
        <div className="stats-badge-count">
          {count}
        </div>
      </div>
      <div className="stats-badge-desc">
        {title}
        <span className="stats-badge-subtitle">{subtitle}</span>
      </div>
    </div>
  );
};

StatisticsBadge.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

StatisticsBadge.defaultProps = {
  count: 0,
};

export default StatisticsBadge;
