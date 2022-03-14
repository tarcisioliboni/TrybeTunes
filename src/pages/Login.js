import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './components/Loading';

const userAPI = require('../services/userAPI');

const THREE = 3;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      SaveButtonDisabled: true,
      loading: false,
      beforeLoading: false,
    };
  }

  Carregamento = () => {
    this.setState({
      loading: true,
    }, this.handleGetInput);
  }

  handleGetInput = async () => {
    const { name } = this.state;
    await userAPI.createUser({ name });
    this.setState({
      beforeLoading: true,
    });
  };

  moreThanThree = () => {
    const { name } = this.state;

    if (name.length >= THREE) {
      this.setState({
        SaveButtonDisabled: false,
      });
    }
  };

  handleInputChange = ({ target }) => {
    this.setState({
      name: target.value,
    }, this.moreThanThree);
  };

  render() {
    const { name, SaveButtonDisabled, loading, beforeLoading } = this.state;

    return (
      <>
        {
          loading
            ? <Loading /> : (
              <div data-testid="page-login">
                <form>
                  <input
                    data-testid="login-name-input"
                    type="text"
                    value={ name }
                    onChange={ this.handleInputChange }
                    placeholder="Nome"
                  />

                  <button
                    data-testid="login-submit-button"
                    type="button"
                    onClick={ this.Carregamento }
                    disabled={ SaveButtonDisabled }
                  >
                    Entrar
                  </button>
                </form>
              </div>
            )
        }
        {
          beforeLoading && <Redirect to="/search" />
        }
      </>
    );
  }
}

export default Login;
