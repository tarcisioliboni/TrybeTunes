import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.musicList();
  }

  musicList = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);

    this.setState({
      musics: result,
    });

    const filtered = result.filter((item) => item.kind === 'song');
    this.setState({
      musics: filtered,
      artistName: result[0].artistName,
      albumName: result[0].collectionName,
      albumImage: result[0].artworkUrl100,
    });
    console.log(filtered);
  }

  render() {
    const { artistName, albumName, albumImage, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h1 data-testid="artist-name">{ artistName }</h1>
          <h2 data-testid="album-name">{ albumName }</h2>
          <img src={ albumImage } alt={ artistName } />
          <div>
            {
              musics.map((music, index) => (<MusicCard
                key={ index }
                music={ music.trackName }
                preview={ music.previewUrl }
              />
              ))
            }
          </div>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
