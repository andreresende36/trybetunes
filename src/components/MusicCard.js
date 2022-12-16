import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
    check: false,
  };

  handleFavorite = ({ target: { checked } }) => {
    const { trackObj } = this.props;
    this.setState(() => ({ isLoading: true, check: checked }));
    if (checked) {
      addSong(trackObj).then(() => {
        this.setState({ isLoading: false });
      });
    } else {
      removeSong(trackObj).then(() => {
        this.setState({ isLoading: false });
      });
    }
  };

  render() {
    const { trackObj } = this.props;
    const { trackName, previewUrl, trackId } = trackObj;
    const { state: { isLoading, check }, handleFavorite } = this;
    return (
      <div className="musicCard">
        {isLoading
          ? (<Loading />)
          : (
            <>
              <p>{ trackName }</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
              </audio>
              <label htmlFor="favorite-input">
                Favorita
                <input
                  type="checkbox"
                  id="favorite-input"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ handleFavorite }
                  checked={ check }
                />
              </label>
            </>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackObj: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    artistViewUrl: PropTypes.string,
    artworkUrl100: PropTypes.string,
    artworkUrl30: PropTypes.string,
    artworkUrl60: PropTypes.string,
    collectionCensoredName: PropTypes.string,
    collectionExplicitness: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    collectionViewUrl: PropTypes.string,
    country: PropTypes.string,
    currency: PropTypes.string,
    discCount: PropTypes.number,
    discNumber: PropTypes.number,
    isStreamable: PropTypes.bool,
    kind: PropTypes.string,
    previewUrl: PropTypes.string,
    primaryGenreName: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCensoredName: PropTypes.string,
    trackCount: PropTypes.number,
    trackExplicitness: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    trackNumber: PropTypes.number,
    trackPrice: PropTypes.number,
    trackTimeMillis: PropTypes.number,
    trackViewUrl: PropTypes.string,
    wrapperType: PropTypes.string,
  }).isRequired,
};