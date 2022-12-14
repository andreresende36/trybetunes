import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    userName: '',
    disableBtn: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const minChar = 3;
      const { userName } = this.state;
      if (userName.length >= minChar) {
        this.setState({ disableBtn: false });
      } else {
        this.setState({ disableBtn: true });
      }
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { userName } = this.state;
    this.setState({ isLoading: true });
    createUser({ name: userName })
      .then(() => {
        this.setState({ isLoading: false }, () => {
          const { handleLogin } = this.props;
          handleLogin(true);
        });
      });
  };

  render() {
    const { userName, disableBtn, isLoading } = this.state;
    const { handleChange, handleClick } = this;
    return (
      <div data-testid="page-login">
        {isLoading ? (<Loading isLoading={ isLoading } />) : (
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
              type="submit"
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
  handleLogin: PropTypes.func.isRequired,
};
