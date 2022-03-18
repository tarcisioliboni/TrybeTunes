import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './components/Loading';
import Card from './Card';

const TWO = 2;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      artistName: '',
      SaveButtonDisabled: true,
      albums: [],
      loading: false,
    };
  }

  moreThanTwo = () => {
    const { artist } = this.state;

    if (artist.length >= TWO) {
      this.setState({
        SaveButtonDisabled: false,
      });
    }
  };

  handleGetInput = async (event) => {
    event.preventDefault();
    const { artist } = this.state;
    this.setState({
      loading: true,
    });
    const albumsList = await searchAlbumsAPI(artist);
    this.setState({
      albums: albumsList,
      artistName: artist,
      loading: false,
      artist: '',

    });
  };

  handleInputChange = ({ target }) => {
    this.setState({
      artist: target.value,
    }, this.moreThanTwo);
  };

  render() {
    const { albums, SaveButtonDisabled, artist, artistName, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <Loading /> : (
            <div>
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Nome do Artista"
                value={ artist }
                onChange={ this.handleInputChange }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ SaveButtonDisabled }
                onClick={ this.handleGetInput }
              >
                Pesquisar
              </button>
            </div>
          )
        }
        {
          albums.length === 0
            ? (<h2>Nenhum álbum foi encontrado</h2>)
            : (
              <section>
                <h2>
                  { `Resultado de álbuns de: ${artistName}`}
                </h2>
                <div>
                  {
                    albums.map(({ collectionId, collectionName }) => (
                      <Card
                        key={ collectionId }
                        id={ collectionId }
                        name={ collectionName }
                      />
                    ))
                  }
                </div>
              </section>
            )
        }
        <Link to="/">HOME</Link>
      </div>
    );
  }
}

export default Search;
