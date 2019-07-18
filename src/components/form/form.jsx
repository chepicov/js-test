import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _get from 'lodash/get';
import { withRouter } from 'react-router';
import PropTypes from 'react-proptypes';
import Select from 'components/common/select';
import Input from 'components/common/input';
import Button from 'components/common/button';
import Loading from 'components/common/loading';
import checked from 'assets/icons/checked.svg';
import error from 'assets/icons/close.svg';
import playerPlaceholder from 'assets/images/user.png';
import { fetchPlayers, fetchSinglePlayer } from 'resources/player/player.actions';
import { addTeam, editTeam, setCurrentTeam } from 'resources/team/team.actions';
import { getTeam } from 'resources/team/team.selectors';
import { getPlayers, getFreePlayers } from 'resources/player/player.selectors';
import { getUser } from 'resources/user/user.selectors';
import { PLAYER_ROLES, DETAIL_FIELDS } from 'app.constants';
import './form.styles.css';

const defaultChecks = {
  hasName: {
    label: 'A team must have a name',
    value: false,
  },
  inBudget: {
    label: 'A team must be within a budget of $200,000',
    value: true,
  },
  isFull: {
    label: 'A team must consist of 1 of each player classification of “Lead”, “Second”, “Third” and a “Skip” each.',
    value: false,
  },
};

class Form extends React.Component {
  constructor(props) {
    super(props);

    const { team } = props;

    this.state = {
      name: team ? team.name : '',
      checks: this.getDefaultChecks(props),
      selectedPlayers: team ? team.players : {},
      summary: team ? team.summary : 0,
      isLoading: false,
    };
  }

  async componentDidMount() {
    const {
      players, fetchPlayers: fetchAll, fetchSinglePlayer: fetchSingle, team,
    } = this.props;
    if (!players.length) {
      this.setState({
        isLoading: true,
      });
      await fetchAll();
      if (team && !Object.values(team.players)[0].details) {
        await Promise.all(Object.values(team.players).map(id => fetchSingle(id)));
      }
      this.setState({
        isLoading: false,
      });
    }
  }

  onChangeName = (value) => {
    this.setState((prevState) => {
      return ({
        name: value,
        checks: {
          ...prevState.checks,
          hasName: {
            ...prevState.checks.hasName,
            value: !!value,
          },
        },
      });
    });
  }

  onSubmit = (e) => {
    const {
      selectedPlayers, name, summary, checks,
    } = this.state;
    const {
      addTeam: add, editTeam: edit, history, team, user, setCurrentTeam: setCurrent,
    } = this.props;
    e.preventDefault();
    if (Object.values(checks).find(({ value }) => !value)) {
      return;
    }
    if (team) {
      edit({
        ...team,
        name,
        players: selectedPlayers,
        summary,
      });
    } else {
      add({
        name,
        user: user.email,
        players: selectedPlayers,
        summary,
      });
    }
    setCurrent('');
    history.push('/');
  }

  onSelect = key => (player) => {
    const { players, fetchSinglePlayer: fetchSingle } = this.props;
    fetchSingle(player.value);

    this.setState((prevState) => {
      const selectedPlayers = {
        ...prevState.selectedPlayers,
        [key]: player.value,
      };
      const maxBudget = 200000;
      const summary = Object.values(selectedPlayers)
        .map(id => players.find(item => item.id === id))
        .reduce((acc, item) => {
          return acc + item.price;
        }, 0);
      const isFull = PLAYER_ROLES.every(role => selectedPlayers[role]);
      return ({
        selectedPlayers,
        summary,
        checks: {
          ...prevState.checks,
          inBudget: {
            ...prevState.checks.inBudget,
            value: summary <= maxBudget,
          },
          isFull: {
            ...prevState.checks.isFull,
            value: isFull,
          },
        },
      });
    });
  }

  getDefaultChecks = (props) => {
    if (!props.team) {
      return defaultChecks;
    }

    return Object.keys(defaultChecks).reduce((acc, key) => ({
      ...acc,
      [key]: {
        ...defaultChecks[key],
        value: true,
      },
    }), {});
  }

  render() {
    const {
      checks,
      selectedPlayers,
      summary,
      name,
      isLoading,
    } = this.state;

    const {
      players, history, team, user,
    } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    const isOwner = !team || team.user === user.email;

    return (
      <div className="form-main">
        <form className="form" onSubmit={this.onSubmit}>
          <h1>{team ? team.name : 'New Team'}</h1>
          {
            isOwner ? (
              <React.Fragment>
                <div className="form__label">name:</div>
                <Input
                  name="name"
                  type="text"
                  onChange={this.onChangeName}
                  value={name}
                />
              </React.Fragment>
            ) : null
          }
          <div className="form__players">
            {
              PLAYER_ROLES.map((role) => {
                const selectedPlayer = players
                  .find(item => item.id === selectedPlayers[role]);
                const selectedOption = selectedPlayer && {
                  value: selectedPlayer.id,
                  label: selectedPlayer.name,
                };
                return (
                  <div className="form__player">
                    <div className="form__player-label">
                      {role}
                      :
                    </div>
                    <img
                      className="form__image"
                      src={_get(selectedPlayer, 'details.image') || playerPlaceholder}
                      alt={_get(selectedPlayer, 'name') || 'player'}
                    />
                    <div className="form__details">
                      {_get(selectedPlayer, 'details') ? (
                        DETAIL_FIELDS.map(field => (field.key !== 'dominant-hand' ? (
                          <div className="form-field">
                            <div className="form-field__label">
                              {field.label}
                              :&nbsp;
                            </div>
                            <div className="form-field__value">
                              {field.prefix}
                              {_get(selectedPlayer.details, field.key)
                                || _get(selectedPlayer, field.key)}
                            </div>
                          </div>
                        ) : (
                          <div className="form-field">
                            <div className="form-field__value">{selectedPlayer.details[field.key] === 'RHD' ? 'Right-Handed' : 'Left-Handed'}</div>
                          </div>
                        )))
                      ) : 'No info'}
                    </div>
                    {
                      isOwner ? (
                        <Select
                          key={role}
                          onChange={this.onSelect(role)}
                          options={players
                            .filter(({ type }) => type === role)
                            .map(item => ({ value: item.id, label: item.name, secondLabel: `$${item.price}` }))}
                          selectedOption={selectedOption}
                        />
                      ) : (<div className="form__name">{selectedOption && selectedOption.label}</div>)
                    }
                  </div>
                );
              })
            }
          </div>
          {
            isOwner ? (
              <React.Fragment>
                <div className="form__summary">
                  Summary: $
                  {summary}
                </div>
                <ul className="form__check">
                  {
                    Object.keys(checks).map(key => (
                      <li className={cx('check', {
                        'check--error': !checks[key].value,
                      })}
                      >
                        <img className="check__icon" src={checks[key].value ? checked : error} alt="check" />
                        &nbsp;
                        {checks[key].label}
                      </li>
                    ))
                  }
                </ul>
                <Button
                  onClick={() => history.push('/')}
                  grey
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={Object.values(checks).find(({ value }) => !value)}
                >
                  Save
                </Button>
              </React.Fragment>
            ) : (
              <Button
                type="button"
                onClick={() => history.push('/')}
              >
                Back
              </Button>
            )
          }
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  team: PropTypes.shape({
    user: PropTypes.string,
    name: PropTypes.string,
    summary: PropTypes.number,
    players: PropTypes.arrayOf(PropTypes.string),
  }),
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  addTeam: PropTypes.func.isRequired,
  editTeam: PropTypes.func.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  fetchSinglePlayer: PropTypes.func.isRequired,
  setCurrentTeam: PropTypes.func.isRequired,
};

Form.defaultProps = {
  team: null,
};

export default withRouter(connect((state) => {
  const team = getTeam(state);
  return ({
    team,
    players: team ? getPlayers(state) : getFreePlayers(state),
    user: getUser(state),
  });
}, {
  fetchPlayers,
  fetchSinglePlayer,
  addTeam,
  editTeam,
  setCurrentTeam,
})(Form));
