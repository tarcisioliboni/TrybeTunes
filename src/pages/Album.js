import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      musics: [],
      favorite: [],
      checked: true,
      unchecked: false,
      loading: false,
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

  handleChange = async (prop) => {
    this.setState({
      loading: true,
    });
    await addSong(prop);
    this.setState((prevState) => ({
      favorite: [...prevState.favorite, prop],
    }));
    this.setState({
      loading: false,
    });
  }

  render() {
    const {
      artistName,
      albumName,
      albumImage,
      musics,
      favorite,
      loading,
      checked,
      unchecked,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading ? <Loading /> : (
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
                    trackId={ music.trackId }
                    favoriteChecked={ favorite
                      .some((item) => item === music.trackId) ? checked : unchecked }
                    favoriteOnChange={ this.handleChange }
                  />
                  ))
                }
              </div>
            </section>
          )
        }
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
