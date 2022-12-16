import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    tracksArray: [],
    artist: '',
    album: '',
    favoriteSongs: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    getMusics(id)
      .then((response) => this.setState({
        tracksArray: response,
      }, () => {
        this.setState((prevState) => (
          { artist: prevState.tracksArray[0].artistName,
            album: prevState.tracksArray[0].collectionName,
          }));
      }));
    this.setState({ favoriteSongs: await getFavoriteSongs() });
  }

  updateFavoriteSongs = async () => {
    this.setState({ favoriteSongs: await getFavoriteSongs() });
  };

  render() {
    const { artist, album, tracksArray, favoriteSongs } = this.state;
    const { updateFavoriteSongs } = this;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artist }</p>
        <p data-testid="album-name">{ album }</p>

        {tracksArray.slice(1).map((track) => (
          <MusicCard
            key={ track.trackId }
            trackObj={ track }
            favoriteSongs={ favoriteSongs }
            updateFavoriteSongs={ updateFavoriteSongs }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
