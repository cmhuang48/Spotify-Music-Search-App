import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ trackUri }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  const params = JSON.parse(localStorage.getItem('params'));
  const { access_token } = params;
  if (!access_token) return null;

  return <SpotifyPlayer 
    token={access_token}
    callback={state => {
      if(!state.isPlaying) setPlay(false);
    }}
    play={play} 
    uris={trackUri ? [trackUri] : []} 
  />;
};

export default Player;