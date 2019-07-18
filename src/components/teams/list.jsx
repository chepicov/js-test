import React from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from 'components/common/button';
import { setCurrentTeam } from 'resources/team/team.actions';
import { getTeams } from 'resources/team/team.selectors';
import './list.styles.css';

class List extends React.Component {
  goToTeam = id => () => {
    const { history, setCurrentTeam: setCurrent } = this.props;
    setCurrent(id);
    history.push(`/teams/${id}`);
  }

  addTeam = () => {
    const { history, setCurrentTeam: setCurrent } = this.props;
    setCurrent('');
    history.push('/teams/new');
  }

  render() {
    const { teams } = this.props;

    return (
      <div className="list-main">
        <div className="header">
          <h1 className="header__title">Results</h1>
          <Button
            onClick={this.addTeam}
            className="header__button"
          >
            Add Team
          </Button>
        </div>
        <div className="info">
          <div>Name</div>
          <div>Score</div>
        </div>
        <ul className="list">
          {
            teams.map(team => (
              <li className="list__item player" key={team.id}>
                <div
                  className="player__name"
                  role="button"
                  tabIndex="0"
                  onClick={this.goToTeam(team.id)}
                  onKeyDown={this.goToTeam(team.id)}
                >
                  {team.name}
                </div>
                <div className="player__price">
                  {team.score}
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setCurrentTeam: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    summary: PropTypes.number,
    players: PropTypes.arrayOf(PropTypes.string),
  })),
};

List.defaultProps = {
  teams: [],
};

export default withRouter(connect(state => ({
  teams: getTeams(state),
}), {
  setCurrentTeam,
})(List));
