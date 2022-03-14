import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';

const AlbumsAPI = require('../services/searchAlbumsAPI');

const TWO = 2;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      SaveButtonDisabled: true,
    };
  }

  moreThanTwo = () => {
    const { artistName } = this.state;

    if (artistName.length >= TWO) {
      this.setState({
        SaveButtonDisabled: false,
      });
    }
  };

  handleGetInput = async () => {
    const { artistName } = this.state;
    await AlbumsAPI({ artistName });
    this.setState({
      artistName: '',
    });
  };

  handleInputChange = ({ target }) => {
    this.setState({
      artistName: target.value,
    }, this.moreThanTwo);
  };

  render() {
    const { artistName, SaveButtonDisabled } = this.state;
    return (
      <>
        <div data-testid="page-search"> </div>
        <Header />
        <div>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do Artista"
            value={ artistName }
            onChange={ this.handleInputChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ SaveButtonDisabled }
          >
            Procurar
          </button>
        </div>
        <Link to="/">HOME</Link>
      </>
    );
  }
}

export default Search;
