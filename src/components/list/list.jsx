import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/common/button';
import { fetchPlayers } from 'resources/player/player.actions';
import { getPlayers } from 'resources/player/player.selectors';
import { PLAYER_ROLES } from 'app.constants';
import './list.styles.css';

class List extends React.Component {
  componentDidMount() {
    this.props.fetchPlayers();
  }

  render() {
    const { players } = this.props;

    return (
      <div className="list-main">
        <Button
          onClick={() => this.props.history.push('/')}
        >
          Back To Team
        </Button>
        {PLAYER_ROLES.map((role) => {
          return (
            <section className="list-main__section" key={role}>
              <div className="header">
                <h2 className="header__title">{role}</h2>
              </div>
              <ul className="list">
                {
                  players
                    .filter(({ type }) => type === role)
                    .map(player => (
                      <li className="list__item player" key={player.id}>
                        <div className="player__name">
                          {player.name}
                        </div>
                        <div className="player__price">
                          ${player.price}
                        </div>
                      </li>
                    ))
                }
              </ul>
            </section>
          )})}
      </div>
    );
  }
}

export default connect(state => ({
  players: getPlayers(state),
}), {
  fetchPlayers,
})(List);
