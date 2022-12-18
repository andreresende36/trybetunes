import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    isLoading: true,
    userName: 'Carregando...',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ isLoading: false, userName: user.name });
  }

  render() {
    const { state: { isLoading, userName } } = this;
    return (
      <div data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        {isLoading
          ? (<Loading />)
          : <p data-testid="header-user-name">{ userName }</p> }
      </div>
    );
  }
}
