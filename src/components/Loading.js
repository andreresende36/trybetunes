import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    const loading = <span>Carregando...</span>;
    return (
      <div>
        { loading }
      </div>
    );
  }
}
