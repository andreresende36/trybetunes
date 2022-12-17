import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.setState({ favoriteSongs: await getFavoriteSongs() });
  }

  updateFavoriteSongs = async () => {
    this.setState({ favoriteSongs: await getFavoriteSongs() });
  };

  render() {
    const { state: { favoriteSongs }, updateFavoriteSongs } = this;
    return (
      <div data-testid="page-favorites">
        <Header />
        { favoriteSongs.map((song) => (
          <MusicCard
            key={ song.trackId }
            trackObj={ song }
            favoriteSongs={ favoriteSongs }
            updateFavoriteSongs={ updateFavoriteSongs }
          />
        ))}
      </div>
    );
  }
}
