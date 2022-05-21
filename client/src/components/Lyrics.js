import React, { useEffect, useState } from 'react';
import axios from 'axios';
import music from '../images/music.jpeg';

const Lyrics = ({ playingTrack, lyrics, setLyrics }) => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    axios.post('https://translation.googleapis.com/language/translate/v2/languages', {
      target: 'en'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${process.env.REACT_APP_TRANSLATION_API_KEY}`,
      },
      params: {
        key: process.env.REACT_APP_TRANSLATION_API_KEY,
      }
    }).then((res) => {
      setLanguages(res.data.data.languages);
    });
  }, [lyrics]);

  const translate = (target) => {
    axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${process.env.REACT_APP_TRANSLATION_API_KEY}`,
      },
      params: {
        key: process.env.REACT_APP_TRANSLATION_API_KEY,
        q: lyrics,
        target: target,
        format: 'text'
      }
    }).then((res) => {
      setLyrics(res.data.data.translations[0].translatedText);
    });
  };

  return (
    <div className='track'>
      {playingTrack.album.images ? (
        <img src={playingTrack.album.images[0].url} alt="" />
      ) : (
        <img src={music} alt="" />
      )}
      <h1 style={{ textAlign: "center" }}>{playingTrack.name}</h1>
      <h2 style={{ textAlign: "center" }}>{playingTrack.artists.map((artist) => artist.name).join(', ')}</h2>
      <select className="form-select" name="languages" onChange={(ev) => translate(ev.target.value)} style={{ width: "30%" }}>
        <option value=''>Translate Lyrics</option>
        {languages.map((language, idx) => <option key={idx} value={language.language}>{language.language}</option>)}
      </select>
      <p className="lyrics">{lyrics}</p>
    </div>
  );
};

export default Lyrics;