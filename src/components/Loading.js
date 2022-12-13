import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Loading extends Component {
  render() {
    const { isLoading } = this.props;
    const loading = <span>Carregando...</span>;
    return (
      <div>
        { isLoading ? loading : null }
      </div>
    );
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
