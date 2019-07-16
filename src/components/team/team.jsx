import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/common/button';
import { getTeam } from 'resources/user/user.selectors';
import { saveTeam } from 'resources/user/user.actions';
import { getPlayers } from 'resources/player/player.selectors';
import { fetchPlayers } from 'resources/player/player.actions';
import { PLAYER_ROLES } from 'app.constants';
import './team.styles.css';

class Team extends React.Component {
  state = {
    isLoading: true,
  }

  async componentDidMount() {
    await this.props.fetchPlayers();
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { team, players } = this.props;

    return (
      <div className="team">
        {
          team ? (
            <React.Fragment>
              <h1 className="team__title">{team.name}</h1>
              <div className="team__price">${team.summary}/mo</div>
              {PLAYER_ROLES.map((role) => {
                const player = players.find(({ id }) => id === team.players[role]);
                return (
                  <div className="team-role" key={role}>
                    <div className="team-role__name">{role}:</div>&nbsp;
                    <div className="team-role__player">{player.name}</div>
                  </div>
                )})}
            </React.Fragment>
          ) : (
            <h1 className="team__placeholder">No Team</h1>
          )
        }
        <div className="team__buttons">
          {
            team ? (
              <Button
                onClick={() => {
                  this.props.saveTeam(null);
                }}
              >
                Reset Team
              </Button>
            ) : (
              <Button
                onClick={() => this.props.history.push('/new')}
              >
                Create Team
              </Button>
            )
          }
          <Button
            onClick={() => {
              this.props.history.push('/list');
            }}
          >
            All Players
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  players: getPlayers(state),
  team: getTeam(state),
}), {
  saveTeam,
  fetchPlayers,
})(Team);
