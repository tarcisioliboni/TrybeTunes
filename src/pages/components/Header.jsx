import React, { Component } from 'react';
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
      <div>
        {
          loading
            ? <Loading /> : (
              <header data-testid="header-component">
                <h1 data-testid="header-user-name">{ name }</h1>
              </header>
            )
        }
      </div>
    );
  }
}

export default Header;
