import React from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import TracksList from './TracksList';
import AlbumsList from './AlbumsList';
import ArtistsList from './ArtistsList';
import PlayList from './PlayList';

const SearchResult = (props) => {
  const {
    isValidSession,
    loadMore,
    result,
    category,
    setCategory,
    playingTrack,
    setTrack
  } = props;
  const { tracks, albums, artists, playlist } = result;

  if (!isValidSession()) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            session_expired: true
          }
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <div className="search-buttons">
        {!_.isEmpty(tracks.items) && (
          <button
            className={`${
              category === 'tracks' ? 'btn active' : 'btn'
            }`}
            onClick={() => setCategory('tracks')}
          >
            Tracks
          </button>
        )}
        {!_.isEmpty(albums.items) && (
          <button
            className={`${
              category === 'albums' ? 'btn active' : 'btn'
            }`}
            onClick={() => setCategory('albums')}
          >
            Albums
          </button>
        )}
        {!_.isEmpty(artists.items) && (
          <button
            className={`${
              category === 'artists' ? 'btn active' : 'btn'
            }`}
            onClick={() => setCategory('artists')}
          >
            Artists
          </button>
        )}
        {!_.isEmpty(playlist.items) && (
          <button
            className={`${
              category === 'playlist' ? 'btn active' : 'btn'
            }`}
            onClick={() => setCategory('playlist')}
          >
            Playlists
          </button>
        )}
      </div>
      <div className={`${category === 'tracks' ? '' : 'hide'}`}>
        {tracks && <TracksList 
          tracks={tracks} 
          playingTrack={playingTrack} 
          setTrack={setTrack} 
        />}
      </div>
      <div className={`${category === 'albums' ? '' : 'hide'}`}>
        {albums && <AlbumsList 
          albums={albums} 
        />}
      </div>
      <div className={`${category === 'artists' ? '' : 'hide'}`}>
        {artists && <ArtistsList           
          artists={artists} 
        />}
      </div>
      <div className={`${category === 'playlist' ? '' : 'hide'}`}>
        {playlist && <PlayList 
          playlist={playlist} 
        />}
      </div>
      {!_.isEmpty(result[category]) &&
        !_.isEmpty(result[category].next) && (
          <div className="load-more" onClick={() => loadMore(category)}>
            <Button variant="info" type="button">
              Load More
            </Button>
          </div>
        )}
    </React.Fragment>
  );
};

export default SearchResult;