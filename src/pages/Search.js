import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';

class Search extends Component {
  render() {
    return (
      <>
        <div data-testid="page-search"> </div>
        <Header />
        <Link to="/">HOME</Link>
      </>
    );
  }
}

export default Search;
