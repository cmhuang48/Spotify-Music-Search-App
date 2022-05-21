import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
  initiateGetResult,
  initiateLoadMoreTracks,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists
} from '../actions/result';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';
import Header from './Header';
import Loader from './Loader';
import Player from './Player';
import Lyrics from './Lyrics';

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('tracks');
  const [playingTrack, setPlayingTrack] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const { isValidSession, history } = props;

  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
        setCategory('tracks');
      });
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  const loadMore = async (type) => {
    if (isValidSession()) {
      const { dispatch, tracks, albums, artists, playlist } = props;
      setIsLoading(true);
      switch (type) {
        case 'tracks': 
          await dispatch(initiateLoadMoreTracks(tracks.next));
          break;
        case 'albums':
          await dispatch(initiateLoadMoreAlbums(albums.next));
          break;
        case 'artists':
          await dispatch(initiateLoadMoreArtists(artists.next));
          break;
        case 'playlist':
          await dispatch(initiateLoadMorePlaylist(playlist.next));
          break;
        default:
      }
      setIsLoading(false);
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  useEffect(() => {
    if (!playingTrack) return;
    
    // change this to https://spotify-translate-server.herokuapp.com/lyrics before pushing to heroku
    axios.get('http://localhost:3001/lyrics', { 
      params: {
        track: playingTrack.name,
        artist: playingTrack.artists[0].name 
      }
    }).then(res => {
      console.log('lyrics', res)
      setLyrics(res.data.lyrics);
    })
  }, [playingTrack]);


  const setTrack = (track) => {
    setPlayingTrack(track);
  };

  const { tracks, albums, artists, playlist } = props;
  const result = { tracks, albums, artists, playlist };

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div className="dashboard">
          <Header />
          <SearchForm handleSearch={handleSearch} />
          <Loader show={isLoading}>Loading...</Loader>
          {!playingTrack ? (
            <SearchResult
              result={result}
              loadMore={loadMore}
              category={category}
              setCategory={setCategory}
              playingTrack={playingTrack}
              setTrack={setTrack}
              isValidSession={isValidSession}
            />
            ) : (
              <Lyrics playingTrack={playingTrack} lyrics={lyrics} setLyrics={setLyrics} />
            )
          }
          <Player trackUri={playingTrack?.uri} isValidSession={isValidSession} />
        </div>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              session_expired: true
            }
          }}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
    albums: state.albums,
    artists: state.artists,
    playlist: state.playlist
  };
};

export default connect(mapStateToProps)(Dashboard);