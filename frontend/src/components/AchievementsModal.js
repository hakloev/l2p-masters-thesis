import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import { actions } from '../data/modals';

const Achievement = props => {
  const { image_url: imgUrl, title, description } = props.achievement;
  return (
    <ListItem
      leftAvatar={<Avatar src={imgUrl} />}
      primaryText={title}
      secondaryText={description}
    />
  );
};

Achievement.propTypes = {
  achievement: PropTypes.object.isRequired,
};


class AchievementsModal extends React.Component {

  render() {
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.toggleModal}
      />,
    ];

    return (
      <Dialog
        title={this.props.achievements.length > 1
          ? <h4>You earned {this.props.achievements.length} new achievments!</h4>
          : <h4>You earned a new achievement!</h4>}
        actions={modalActions}
        open={this.props.open}
      >
        <List>
          {this.props.achievements.map(achievement =>
            <Achievement key={`ac_${achievement.id}`} achievement={achievement} />
          )}
        </List>
      </Dialog>
    );
  }

}

AchievementsModal.propTypes = {
  achievements: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { meta: achievements } = state.achievements.newUserAchievements;
  const { achievementsModalOpen } = state.modals;
  return {
    achievements,
    open: achievementsModalOpen,
  };
};

// eslint-disable-next-line
const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => {
      dispatch(actions.toggleAchievementsModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AchievementsModal);
