import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../context/global state/GlobalState';
import { Header } from '../layouts/Header';

export const AddArtist = ({ editing, id }) => {
  const { uploadArtist, artists, updateArtist } = useContext(GlobalContext);

  const artistToEdit = artists.filter((artist) => {
    return artist.id === id;
  });

  const [currentLength, setCurrentLength] = useState(0);
  const [bioValue, setBioValue] = useState(editing ? artistToEdit[0].bio : '');
  const [artistName, setArtistName] = useState(
    editing ? artistToEdit[0].name : ''
  );
  const [thumbnail, setThumbnail] = useState(
    editing ? artistToEdit[0].thumbnail : ''
  );
  const [facebookLink, setFacebookLink] = useState(
    editing ? artistToEdit[0].facebookLink : ''
  );
  const [twitterLink, setTwitterLink] = useState(
    editing ? artistToEdit[0].twitterLink : ''
  );
  const [kingschatLink, setKingschatLink] = useState(
    editing ? artistToEdit[0].kingschatLink : ''
  );
  const [instagramLink, setInstagramLink] = useState(
    editing ? artistToEdit[0].instaLink : ''
  );
  const [youtubeLink, setYoutubeLink] = useState(
    editing ? artistToEdit[0].youtubeLink : ''
  );

  const calculateWords = (e) => {
    const valuesInArray = e.target.value.split(' ');
    const newValuesInArray = valuesInArray.filter((valueInArray) => {
      return valueInArray;
    });
    setCurrentLength(newValuesInArray.length);
    if (currentLength > 100) {
      return;
    } else {
      setBioValue(e.target.value);
    }
  };
  // upload artist to db
  const submitArtist = (e) => {
    e.preventDefault();

    const artist = {
      name: artistName,
      bio: bioValue,
      facebookLink,
      twitterLink,
      instagramLink,
      kingschatLink,
      youtubeLink,
      thumbnail,
    };

    editing ? updateArtist(id, artist) : uploadArtist(artist);
  };

  return (
    <div>
      <Header />
      <main className='admin-artist l'>
        <h3 className='page-title artist-title' style={{ margin: '0 30px' }}>
          Add Artist Biography
        </h3>
        <form className='posting' onSubmit={submitArtist}>
          <label className='label-title'>
            Artist{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>Name of the Artist.</p>
              </div>
            </i>
          </label>
          <input
            type='text'
            value={artistName}
            name='img'
            placeholder='Enter artist'
            required
            onChange={(e) => setArtistName(e.target.value)}
          />
          <label className='label-title'>
            Image Link{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>The link to view the artist image.</p>
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
            Facebook Link{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>Link to this artist's Facebook handle.</p>
              </div>
            </i>
          </label>
          <input
            type='text'
            name='fb'
            placeholder='Enter image caption'
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
          />
          <label className='label-title'>
            Twitter Link{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>Link to this artist's Twitter handle.</p>
              </div>
            </i>
          </label>
          <input
            type='text'
            name='tw'
            placeholder='Enter image caption'
            value={twitterLink}
            onChange={(e) => setTwitterLink(e.target.value)}
          />
          <label className='label-title'>
            Instagram Link{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>Link to this artist's Instagram handle.</p>
              </div>
            </i>
          </label>
          <input
            type='text'
            name='in'
            placeholder='Enter image caption'
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
          />
          <label className='label-title'>
            KingsChat Link{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>Link to this artist's KingsChat handle.</p>
              </div>
            </i>
          </label>
          <input
            type='text'
            name='kc'
            placeholder='Enter image caption'
            value={kingschatLink}
            onChange={(e) => setKingschatLink(e.target.value)}
          />
          <label className='label-title'>
            Youtube Link{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>Link to this artist's Youtube handle.</p>
              </div>
            </i>
          </label>
          <input
            type='text'
            name='yt'
            placeholder='Enter image caption'
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
          <label className='label-title'>
            Artist Bio{' '}
            <i className='fas fa-info-circle'>
              <div className='info-content'>
                <p>A short biography of the artist. Max: 100 words</p>
              </div>
            </i>
          </label>
          <textarea
            name='intro'
            placeholder='Start typing'
            onChange={calculateWords}
            value={bioValue}
            required
          ></textarea>
          <p className='words'>{currentLength} Words</p>
          <input type='submit' value='Submit Biography' id='submit-song' />
        </form>
      </main>
    </div>
  );
};
