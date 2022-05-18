import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ trackUri }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  const token = window.localStorage.getItem('token')
  if (!token) return null;
  
  return <SpotifyPlayer 
    token={token}
    callback={state => {
      if(!state.isPlaying) setPlay(false);
    }}
    play={play} 
    uris={trackUri ? [trackUri] : []} />;
};

export default Player;