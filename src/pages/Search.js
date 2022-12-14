import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchName: '',
    disableBtn: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.setState((prevState) => ({
        disableBtn: prevState.searchName.length < 2,
      }));
    });
  };

  render() {
    const { state: { searchName, disableBtn }, handleChange } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          name="searchName"
          id="searchName"
          value={ searchName }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disableBtn }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
