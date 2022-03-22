import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const {
      musicData,
      preview,
      trackId,
      favoriteOnChange,
      favoriteChecked,
      music,
    } = this.props;
    return (
      <div>
        <p>{ music }</p>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ favoriteChecked }
            onChange={ (event) => favoriteOnChange(musicData, event) }
            name="favorite"
            id={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  preview: PropTypes.string.isRequired,
  music: PropTypes.string.isRequired,
  musicData: PropTypes.arrayOf.isRequired,
  trackId: PropTypes.number.isRequired,
  favoriteOnChange: PropTypes.func.isRequired,
  favoriteChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
