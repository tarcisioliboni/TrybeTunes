import React, { Component } from 'react';
import Header from './components/Header';
import MusicCard from './MusicCard';
import Loading from './components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = ({
      favorite: [],
      loading: true,
    });
  }

  componentDidMount() {
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
    });
    console.log(result);
  }

  handleRemoveSong = async (prop) => {
    this.setState({
      loading: true,
    });
    await removeSong(prop);
    const result = await getFavoriteSongs();
    this.setState({
      favorite: result,
      loading: false,
    });
  }

  render() {
    const {
      favorite,
      loading,
    } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading ? <Loading /> : (
            <section>
              <div>
                {
                  favorite.map((music) => (<MusicCard
                    musicData={ music }
                    key={ music.trackId }
                    music={ music.trackName }
                    preview={ music.previewUrl }
                    trackId={ music.trackId }
                    favoriteChecked={ favorite
                      .some((item) => item.trackId === music.trackId) }
                    favoriteOnChange={ this.handleRemoveSong }
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

export default Favorites;
