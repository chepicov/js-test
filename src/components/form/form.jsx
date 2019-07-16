import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { withRouter } from "react-router";
import Select from 'components/common/select';
import Input from 'components/common/input';
import Button from 'components/common/button';
import checked from 'assets/icons/checked.svg';
import error from 'assets/icons/close.svg';
import { fetchPlayers } from 'resources/player/player.actions';
import { saveTeam } from 'resources/user/user.actions';
import { getPlayers } from 'resources/player/player.selectors';
import { PLAYER_ROLES } from 'app.constants';
import './form.styles.css';

const defaultChecks = {
  hasName: {
    label: 'A team must have a name',
    value: false,
  },
  inBudget: {
    label: 'A team must be within a budget of $200,000',
    value: true
  },
  isFull: {
    label: 'A team must consist of 1 of each player classification of “Lead”, “Second”, “Third” and a “Skip” each.',
    value: false,
  },
};

class Form extends React.Component {
  state = {
    name: '',
    checks: defaultChecks,
    selectedPlayers: {},
    summary: 0,
  };

  componentDidMount() {
    this.props.fetchPlayers();
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
    const { selectedPlayers, name, summary } = this.state;
    e.preventDefault();
    this.props.saveTeam({
      name,
      players: selectedPlayers,
      summary,
    });
    this.props.history.push('/');
  }

  onSelect = key => (player) => {
    const { players } = this.props;

    this.setState((prevState) => {
      const selectedPlayers = {
        ...prevState.selectedPlayers,
        [key]: player.value,
      };
      const maxBudget = 200000;
      const summary = Object.values(selectedPlayers)
        .map(id => players.find(player => player.id === id))
        .reduce((acc, player) => {
          return acc + player.price;
        }, 0);
      const isFull = PLAYER_ROLES.every(role =>
        selectedPlayers[role]);
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

  render() {
    const {
      checks,
      selectedPlayers,
      summary,
      name,
    } = this.state;

    const { players } = this.props;

    return (
      <div className="form-main">
        <form className="form" onSubmit={this.onSubmit}>
          <h1>New Team</h1>
          <div className="form__label">name:</div>
          <Input
            name="name"
            type="text"
            onChange={this.onChangeName}
            value={name}
          />
          {
            PLAYER_ROLES.map((role) => {
              const selectedPlayer = players
                .find(item => item.id === selectedPlayers[role]);
              const selectedOption = selectedPlayer && {
                value: selectedPlayer.id,
                label: selectedPlayer.name,
              };
              return (
                <div className="form__select">
                  <div className="form__label">{role}:</div>
                  <Select
                    key={role}
                    onChange={this.onSelect(role)}
                    options={players
                      .filter(({ type }) => type === role)
                      .map(item => ({ value: item.id, label: item.name, secondLabel: `$${item.price}` }))}
                    selectedOption={selectedOption}
                  />
                </div>
              );
            })
          }
          <div className="form__summary">Summary: ${summary}</div>
          <ul className="form__check">
            {
              Object.keys(checks).map(key => (
                <li className={cx('check', {
                    'check--error': !checks[key].value,
                  })}
                >
                  <img className="check__icon" src={checks[key].value ? checked : error} alt="check" />&nbsp;
                  {checks[key].label}
                </li>
              ))
            }
          </ul>
          <Button
            onClick={() => this.props.history.push('/')}
            grey
          >
            Cancel
          </Button>
          <Button
            disabled={Object.values(checks).find(({ value }) => !value)}
          >
            Save
          </Button>
        </form>
      </div>
    );
  }
}



export default withRouter(connect(state => ({
  players: getPlayers(state),
}), {
  fetchPlayers,
  saveTeam,
})(Form));
