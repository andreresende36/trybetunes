import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    user: {},
    isLoading: false,
  };

  async componentDidMount() {
    getUser()
      .then((data) => {
        this.setState({
          user: data,
          isLoading: false,
        });
      });
  }

  render() {
    const { isLoading, user: { description, email, image, name } } = this.state;
    const profile = (
      <>
        <Link to="/profile/edit">Editar perfil</Link>
        <br />
        <img
          className="profileImg"
          src={ image }
          alt={ `foto de ${name}` }
          data-testid="profile-image"
        />
        <h3>Nome</h3>
        <p>{name}</p>
        <h3>E-mail</h3>
        <p>{email}</p>
        <h3>Descrição</h3>
        <p>{description}</p>
      </>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? (<Loading />) : profile }
      </div>
    );
  }
}
