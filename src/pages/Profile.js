import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import { getUser } from '../services/userAPI';
import Loading from './components/Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.handleGetInput();
  }

  handleGetInput = () => {
    getUser().then(({ name, email, image, description }) => this.setState({
      name,
      email,
      image,
      description,
      loading: false,
    }));
  };

  render() {
    const { name, email, image, description, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading
            ? <Loading /> : (
              <div>
                <img data-testid="profile-image" src={ image } alt={ name } />
                <h1 data-testid="header-user-name">{ name }</h1>
                <h2 data-testid="profile-email">{ email }</h2>
                <h3 data-testid="profile-description">{ description }</h3>
              </div>
            )
        }
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
