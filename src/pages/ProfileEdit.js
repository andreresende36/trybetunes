import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: true,
    disableBtn: true,
  };

  async componentDidMount() {
    getUser().then((data) => {
      this.setState({
        isLoading: false,
        name: data.name,
        email: data.email,
        description: data.description,
        image: data.image,
      }, this.validation);
    });
  }

  validation = () => {
    const { description, email, image, name } = this.state;
    const validationData = description && image && name;
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    this.setState({ disableBtn: !(validationData && emailRegex.test(email)) });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validation);
  };

  handleClick = () => {
    const { name, email, image, description } = this.state;
    const user = {
      name,
      email,
      image,
      description,
    };
    const { history: { push } } = this.props;
    this.setState({ isLoading: true }, async () => {
      await updateUser(user);
      push('/profile');
    });
  };

  render() {
    const { isLoading,
      description,
      email,
      image,
      name,
      disableBtn,
    } = this.state;
    const { handleChange, handleClick } = this;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                data-testid="edit-input-name"
                id="name"
                name="name"
                value={ name }
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="email">
              E-mail:
              <input
                type="email"
                data-testid="edit-input-email"
                id="email"
                name="email"
                value={ email }
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição:
              <textarea
                data-testid="edit-input-description"
                id="description"
                name="description"
                value={ description }
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="image">
              Link da Imagem de Perfil:
              <input
                type="text"
                data-testid="edit-input-image"
                id="image"
                name="image"
                value={ image }
                onChange={ handleChange }
              />
            </label>
            <img src={ image } alt={ `foto de ${name}` } />
            <button
              type="button"
              data-testid="edit-button-save"
              onClick={ handleClick }
              disabled={ disableBtn }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
