import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.handleGetInput();
  }

  handleGetInput = () => {
    getUser().then(({ name }) => this.setState({
      name,
      loading: false,
    }));
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="../search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="../favorites">Favoritas</Link>
        <Link data-testid="link-to-profile" to="../profile">Perfil</Link>
        {
          loading
            ? <Loading /> : (
              <div>
                <h1 data-testid="header-user-name">{ name }</h1>
              </div>
            )
        }
      </header>
    );
  }
}

export default Header;
