import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    searchName: '',
    disableBtn: true,
    isLoading: false,
    artist: '',
    albumArray: [],
    result: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.setState((prevState) => ({
        disableBtn: prevState.searchName.length < 2,
      }));
    });
  };

  handleClick = () => {
    const { searchName } = this.state;
    this.setState({ isLoading: true });
    searchAlbumsAPI(searchName)
      .then((response) => {
        this.setState({
          searchName: '',
          isLoading: false,
          artist: searchName,
          albumArray: response,
        }, () => {
          const { artist, albumArray } = this.state;
          this.setState({
            result: albumArray.length === 0
              ? 'Nenhum álbum foi encontrado'
              : `Resultado de álbuns de: ${artist}`,
          });
        });
      });
  };

  render() {
    const {
      state: { searchName,
        disableBtn,
        isLoading,
        albumArray,
        result,
      },
      handleChange,
      handleClick,
    } = this;
    return (
      <div data-testid="page-search">
        {/* Cabeçalho */}
        <Header />

        {/* Formulário */}
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
          onClick={ handleClick }
        >
          Pesquisar
        </button>

        {/* Mostrar o componente Loading */}
        { isLoading
          ? (<Loading isLoading={ isLoading } />)
          : null }
        <br />

        {/* Mostrar resultados da busca */}
        <p>{ result }</p>

        {/* Container de Cards de Álbuns */}
        <div className="albumCardsContainer">
          {albumArray.map((album) => (
            <div key={ album.collectionId } className="albumCard">
              <img src={ album.artworkUrl100 } alt="imagem do álbum" />
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                {album.collectionName}
              </Link>
              <p>{album.artistName}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
