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
      loading: false,
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
    }, () => {
      const { favorite } = this.state;
      console.log(favorite);
    });
  }

  handleRemoveSong = async (prop) => {
    await removeSong(prop);
    this.setState((prevState) => ({
      favorite: prevState.favorite.filter((item) => item !== prop),
      loading: false,
    }), () => this.favoriteMusic());
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
                  favorite.map((music, index) => (<MusicCard
                    musicData={ music }
                    key={ index }
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
