import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      musics: [],
      favorite: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.musicList();
    this.favoriteMusic();
  }

  favoriteMusic = async () => {
    this.setState({
      loading: true,
    });
    const result = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorite: result,
    }, () => {
      const { favorite } = this.state;
      console.log(favorite);
    });
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
    // console.log(filtered);
  }

  handleAddSong = async (prop) => {
    await addSong(prop);
    this.setState((prevState) => ({
      favorite: [...prevState.favorite, prop],
      loading: false,
    }));
    // console.log(prop);
    this.setState({
      loading: false,
    });
  }

  handleRemoveSong = async (prop) => {
    await removeSong(prop);
    console.log(prop);
    this.setState((prevState) => ({
      favorite: prevState.favorite.filter((item) => item !== prop),
      loading: false,
    }), () => this.favoriteMusic());
  }

  handleChange = (prop, { target }) => {
    this.setState({
      loading: true,
    });
    if (target.checked) {
      this.handleAddSong(prop);
    } else {
      this.handleRemoveSong(prop);
    }
  }

  render() {
    const {
      artistName,
      albumName,
      albumImage,
      musics,
      favorite,
      loading,
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
                    musicData={ music }
                    key={ index }
                    music={ music.trackName }
                    preview={ music.previewUrl }
                    trackId={ music.trackId }
                    favoriteChecked={ favorite
                      .some((item) => item.trackId === music.trackId) }
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
