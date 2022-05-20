import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ isValidSession, trackUri }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

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
  
  const params = JSON.parse(window.localStorage.getItem('params'));
  const { access_token } = params;
  if (!access_token) return null;

  return <SpotifyPlayer 
    token={access_token}
    callback={state => {
      if(!state.isPlaying) setPlay(false);
    }}
    play={play} 
    uris={trackUri ? [trackUri] : []} 
    className="player"
  />;
};

export default Player;