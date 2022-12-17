import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user: { description, email, image, name } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <Link to="/profile/edit">Editar perfil</Link>
        <br />
        <img src={ image } alt="foto do perfil" data-testid="profile-image" />
        <h3>Nome</h3>
        <p>{name}</p>
        <h3>E-mail</h3>
        <p>{email}</p>
        <h3>Descrição</h3>
        <p>{description}</p>
      </div>
    );
  }
}
