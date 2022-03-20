import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const {
      music,
      preview,
      trackId,
      favoriteOnChange,
      favoriteChecked,
    } = this.props;
    return (
      <div>
        <p>{ music }</p>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorite">
          Adicionar as Favoritas
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ favoriteChecked }
            onChange={ () => favoriteOnChange(trackId) }
            name="favorite"
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favoriteOnChange: PropTypes.func.isRequired,
  favoriteChecked: PropTypes.func.isRequired,
};

export default MusicCard;
