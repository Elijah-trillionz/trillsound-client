import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../context/global state/GlobalState';
import { Header } from '../layouts/Header';

export const AddSong = ({ editing, id }) => {
  const { uploadSong, songs, updateSong } = useContext(GlobalContext);

  const songToEdit = songs.filter((song) => {
    return song.id === id;
  });

  const [currentLength, setCurrentLength] = useState(0);
  const [songIntroValue, setSongIntroValue] = useState(
    editing ? songToEdit[0].description : ''
  );
  const [artistName, setArtistName] = useState(
    editing ? songToEdit[0].artist : ''
  );
  const [thumbnail, setThumbnail] = useState(
    editing ? songToEdit[0].thumbnail : ''
  );
  const [songTitle, setSongTitle] = useState(
    editing ? songToEdit[0].title : ''
  );
  const [downloadLink, setDownloadLink] = useState(
    editing ? songToEdit[0].downloadLink : ''
  );
  const [genre, setGenre] = useState(editing ? songToEdit[0].genre : 'praise');

  const calculateWords = (e) => {
    const valuesInArray = e.target.value.split(' ');
    const newValuesInArray = valuesInArray.filter((valueInArray) => {
      return valueInArray;
    });
    setCurrentLength(newValuesInArray.length);
    if (currentLength > 100) {
      return;
    } else {
      setSongIntroValue(e.target.value);
    }
  };

  // upload song to database
  const submitSong = (e) => {
    e.preventDefault();

    const song = {
      title: songTitle,
      description: songIntroValue,
      artist: artistName,
      downloadLink,
      thumbnail,
      genre,
    };

    editing ? updateSong(id, song) : uploadSong(song);
  };
  return (
    <div>
      <Header />
      <main className='admin-main l'>
        <h3 className='page-title artist-title' style={{ margin: '0 30px' }}>
          Add Song
        </h3>
        <form className='posting' onSubmit={submitSong}>
          <label className='label-title'>
            Genre{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>Select the genre of the song.</p>
              </div>
            </i>
          </label>
          <select
            defaultValue={genre}
            name='genre'
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value='praise'>Praise</option>
            <option value='worship'>Worship</option>
            <option value='rap'>Rap</option>
          </select>
          <label className='label-title'>
            Song Title{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>Only title of the song and featured artist(s).</p>
              </div>
            </i>
          </label>
          <input
            type='text'
            name='title'
            placeholder='Enter song title'
            required
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <label className='label-title'>
            Artist{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>Only the artist of the song (not featured artist(s)).</p>
              </div>
            </i>
          </label>
          <input
            type='text'
            value={artistName}
            name='artist'
            placeholder='Enter artist'
            required
            onChange={(e) => setArtistName(e.target.value)}
          />
          <label className='label-title'>
            Image Link{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>The link to view the song image.</p>
              </div>
            </i>
          </label>
          <input
            type='text'
            name='img'
            placeholder='Enter image link'
            required
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
          <label className='label-title'>
            Audio Link{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>The link to download this song.</p>
              </div>
            </i>
          </label>
          <input
            type='text'
            name='img'
            placeholder='Enter audio link'
            required
            value={downloadLink}
            onChange={(e) => setDownloadLink(e.target.value)}
          />
          <label className='label-title'>
            Song Intro{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>Introduce the song with some texts. Max: 100 words</p>
              </div>
            </i>
          </label>
          <textarea
            name='intro'
            placeholder='Start typing'
            onChange={calculateWords}
            value={songIntroValue}
            required
          ></textarea>
          <p className='words'>{currentLength} Words</p>
          <input type='submit' value='Submit Song' id='submit-song' />
          <a className='close-form' href='songs'>
            Cancel
          </a>
        </form>
      </main>
    </div>
  );
};
