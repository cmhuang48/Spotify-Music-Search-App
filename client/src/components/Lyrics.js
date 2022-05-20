import React from 'react';
import music from '../images/music.jpeg';

const Lyrics = ({ lyrics, playingTrack }) => {
  return (
    <div className='track'>
      {playingTrack.album.images ? (
        <img src={playingTrack.album.images[0].url} alt="" />
      ) : (
        <img src={music} alt="" />
      )}
      <h1>{playingTrack.name}</h1>
      <h2>{playingTrack.artists.map((artist) => artist.name).join(', ')}</h2>
      <p className="lyrics">{lyrics}</p>
    </div>
  );
};

export default Lyrics;