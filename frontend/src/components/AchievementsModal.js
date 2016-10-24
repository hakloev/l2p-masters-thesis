import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Achievement = props => {
  const { image_url: imgUrl, title, description } = props.achievement;
  return (
    <li className="collection-item avatar">
      <img src={imgUrl} alt="" className="circle" />
      <span className="title">{title}</span>
      <p>{description}</p>
    </li>
  );
};

Achievement.propTypes = {
  achievement: PropTypes.object.isRequired,
};


const AchievementsModal = props => {
  return (
    <div id="achievements-modal" className="modal">
      <div className="modal-content">
        {props.achievements.length > 1
          ? <h4>You earned {props.achievements.length} new achievments!</h4>
          : <h4>You earned a new achievement!</h4>
        }
        <ul className="collection">
          {props.achievements.map(achievement =>
            <Achievement key={`ac_${achievement.id}`} achievement={achievement} />
          )}
        </ul>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div>
  );
};

const open = () => {
  $('#achievements-modal').openModal();
};

AchievementsModal.propTypes = {
  achievements: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  const { meta: achievements } = state.achievements.newAchievements;
  return {
    achievements,
  };
};

// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({});

export {
  open,
};

export default connect(mapStateToProps, mapDispatchToProps)(AchievementsModal);
