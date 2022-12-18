import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    userName: '',
    disableBtn: true,
    isLoading: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const minChar = 3;
      const { userName } = this.state;
      this.setState({ disableBtn: userName.length < minChar });
    });
  };

  handleClick = () => {
    const { userName } = this.state;
    const { history: { push } } = this.props;

    this.setState({ isLoading: true });
    createUser({ name: userName });
    push('/search');
  };

  render() {
    const { userName, disableBtn, isLoading } = this.state;
    const { handleChange, handleClick } = this;
    return (
      <div data-testid="page-login">
        {isLoading ? (<Loading />) : (
          <form>
            <label htmlFor="userName">
              <input
                type="text"
                name="userName"
                id="userName"
                value={ userName }
                onChange={ handleChange }
                data-testid="login-name-input"
              />
            </label>
            <br />
            <button
              type="button"
              disabled={ disableBtn }
              onClick={ handleClick }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
