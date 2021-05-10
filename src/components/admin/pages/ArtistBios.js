import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/global state/GlobalState';
import { Alert } from '../layouts/Alert';
import { Header } from '../layouts/Header';
import { AddArtist } from './AddArtist';

export const ArtistBios = () => {
  const { signedInAdmin, artists, deleteArtist } = useContext(GlobalContext);

  const [time, setTime] = useState('');
  const [edit, setEdit] = useState(false);
  const [delId, setDelId] = useState(false);
  const [artistId, setArtistId] = useState(0); // change ids type to strings

  const findTime = () => {
    const currentTime = new Date().getHours();
    if (currentTime >= 0 && currentTime <= 11) {
      setTime('morning');
    } else if (currentTime >= 12 && currentTime <= 16) {
      setTime('afternoon');
    } else {
      setTime('evening');
    }
  };
  useEffect(() => {
    findTime();
  }, []);

  const editArtist = (e) => {
    setArtistId(+e.target.parentElement.parentElement.id); // remember to remove the plus sign

    setEdit(true);
  };

  const deleteThisArtist = (e) => {
    setDelId(+e.target.parentElement.parentElement.id);
  };

  const admin = signedInAdmin.length >= 1 && signedInAdmin[0];

  const uploadedArtists = artists.filter((artist) => {
    let postedArtists;
    if (admin) {
      if (admin.artistsUploaded.indexOf(artist.id) !== -1)
        postedArtists = artist;
    }

    return postedArtists;
  });

  const artistElements = uploadedArtists.map((artist, index) => {
    return (
      <li key={artist.id} id={artist.id}>
        <div className='with-date'>
          <p>Biography on {artist.name}</p>
          <p>{artist.date}</p>
        </div>
        <div className='admin-actions'>
          <span className='edit' onClick={editArtist}>
            <i className='fas fa-pencil-alt'></i>
          </span>
          <span className='del' onClick={deleteThisArtist}>
            <i className='fas fa-trash'></i>
          </span>
        </div>
      </li>
    );
  });

  const toggleNavigation = (e) => {
    const navigation = document.querySelector('.post-type-nav > ul');
    const hamburger = document.querySelector('.post-type-hamburger');
    hamburger.classList.toggle('animate');
    navigation.classList.toggle('active');
  };

  const emptyElements = (
    <div className='empty'>
      <p className='post-title'>You have not posted any artist bios yet!</p>
      <a href='add-artist'>Get Started</a>
    </div>
  );

  return (
    <>
      {edit ? (
        <AddArtist editing={true} id={artistId} />
      ) : (
        <div>
          <Header />
          <main className='admin-main'>
            <div className='greeting'>
              <h3>Good {time} Elijah Trillionz</h3>
              <span>Feeling positive today!!..</span>
            </div>
            <div className='posts-container'>
              <div className='post-type-nav'>
                <div className='post-type-hamburger' onClick={toggleNavigation}>
                  <div>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>
                  </div>
                </div>
                <ul>
                  <li className='active'>
                    {/* eslint-disable-next-line */}
                    <a>Posts On</a>
                  </li>
                  <li>
                    <a href='artists'>Artists</a>
                  </li>
                  <li>
                    <a href='songs'>Songs</a>
                  </li>
                </ul>
              </div>
              <div className='post-type-songs'>
                <h3 className='post-title'>
                  Artist Bios you have posted so far:
                </h3>
                <ul>
                  {uploadedArtists.length >= 1 ? artistElements : emptyElements}
                </ul>
              </div>
            </div>
          </main>
          {delId && (
            <Alert
              msg='Are you sure you want to delete this Artist Bio'
              action={deleteArtist}
              id={delId}
            />
          )}
        </div>
      )}
    </>
  );
};
