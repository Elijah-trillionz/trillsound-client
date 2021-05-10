import React, { useState, useContext } from 'react';
import { SideBar } from '../SideBar';
import { GlobalContext } from '../../../../context/global state/GlobalState';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { MobileHeader } from '../MobileHeader';
import { TopSlider } from '../TopSlider';
import { BottomSlider } from '../BottomSlider';
import { SearchResults } from '../SearchResults';

export const NewUploads = () => {
  const {
    songs,
    updateStreams,
    updateDownloads,
    currentPaginationIndex,
    newTotalPaginationIndex,
    goToNextPage,
    goToPrevPage,
    searchResults,
    searchQuery,
  } = useContext(GlobalContext);

  const [playing, setPlaying] = useState(false);
  const [playingSong, setPlayingSong] = useState({});
  const [playingIndex, setPlayingIndex] = useState(0);

  // filter only 16 songs for the each page
  const newSongs = songs.filter((song, index) => {
    return (
      index + 1 <= newTotalPaginationIndex && index + 1 > currentPaginationIndex
    );
  });

  const prevPage = () => {
    if (currentPaginationIndex > 0) {
      goToPrevPage(currentPaginationIndex);
    } else {
      return;
    }
  };

  const nextPage = () => {
    if (newTotalPaginationIndex < songs.length) {
      goToNextPage(newTotalPaginationIndex);
    } else {
      return;
    }
  };

  // play song modal
  const openPlayModal = (index, id) => {
    const { thumbnail, title, artist } = songs[index];

    setPlayingSong({
      title,
      artist,
      thumbnail,
    });
    setPlaying(true);
    setPlayingIndex(index);

    setTimeout(() => {
      if (
        !document
          .querySelector('.song-playing-modal')
          .classList.contains('play')
      ) {
        document.querySelector('.song-playing-modal').classList.add('play');
      }
    }, 100);
  };

  // close play modal
  const closePlayModal = () => {
    document.querySelector('.song-playing-modal').classList.remove('play');
    setTimeout(() => {
      setPlaying(false);
      setPlayingSong({});
    }, 300);
  };
  const nextSong = () => {
    let index = playingIndex;
    console.log(playingIndex);
    index++;
    if (index >= songs.length) {
      index = 0;
    }
    openPlayModal(index);
  };
  const prevSong = () => {
    let index = playingIndex;
    index--;
    if (index < 0) {
      index = songs.length - 1;
    }
    openPlayModal(index);
  };
  const songElements = newSongs.map((song, index) => {
    const { title, artist, id, thumbnail, downloadLink } = song;
    return (
      <li key={id} className='song-container'>
        <div
          className='img'
          style={{
            backgroundImage: `url(${require(`../../../../imgs/${thumbnail}`)})`,
          }}
        ></div>
        <div className='song-title'>
          <h3>
            <a href='/js'>
              {title} - {artist}
            </a>
          </h3>
        </div>
        <div className='song-info'>
          <div
            className='play-song'
            onClick={() => {
              openPlayModal(index, id);
              updateStreams(id);
            }}
          >
            <i className='fas fa-play'></i>
          </div>
          <div className='download-song' onClick={() => updateDownloads(id)}>
            <a href={downloadLink}>
              <i className='fas fa-download'></i>
            </a>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <Header />
      <MobileHeader />
      <main>
        <TopSlider />
        <div className='main-container'>
          <div className='left-side songs'>
            {searchResults.length >= 1 ? (
              <SearchResults
                searchResults={searchResults}
                searchQuery={searchQuery}
              />
            ) : (
              <>
                <h3 className='page-title'>Recently Uploaded</h3>
                <div className='pagination top'>
                  <div className='pagination-s'>
                    <ul>
                      <li onClick={prevPage}>
                        <span className='prev-page'>❮ Previous</span>
                      </li>
                      <li onClick={nextPage}>
                        <span className='next-page'>Next ❯</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <ul className='songs-container'>{songElements}</ul>
                <div className='pagination'>
                  <div className='pagination-s'>
                    <ul>
                      <li onClick={prevPage}>
                        <span className='prev-page'>❮ Previous</span>
                      </li>
                      <li onClick={nextPage}>
                        <span className='next-page'>Next ❯</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className='right-side sidebar-container'>
            <SideBar />
          </div>

          {playing && (
            <div className='song-playing-modal'>
              <div className='song-playing-container'>
                <div
                  className='song-thumbnail'
                  style={{
                    backgroundImage: `url(${require(`../../../../imgs/${playingSong.thumbnail}`)})`,
                  }}
                ></div>
                <div className='playing-song-info'>
                  <div className='song-controls'>
                    <i className='fas fa-backward' onClick={prevSong}></i>
                    <i className='fas fa-pause'></i>
                    <i className='fas fa-forward' onClick={nextSong}></i>
                  </div>
                  <div className='song-progress'>
                    <div className='progressing'>
                      <div className='song-progress-bar'></div>
                      <div className='false-progress-bar'></div>
                    </div>
                    <div className='song-timing'>
                      <p>00:00</p>
                      <p>03:41</p>
                    </div>
                  </div>
                  <div className='song-title'>
                    <a href='/j'>{playingSong.title}</a>
                  </div>
                  <div className='song-artist'>
                    <a href='/a'>{playingSong.artist}</a>
                  </div>
                  <div className='cncl-btn' onClick={closePlayModal}>
                    <i className='fas fa-times-circle'></i>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <BottomSlider />
      </main>
      <div className='body-container mobile-only'></div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
