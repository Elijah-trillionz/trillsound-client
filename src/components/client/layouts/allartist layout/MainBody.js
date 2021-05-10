import React, { useContext } from 'react';
import { SideBar } from '../SideBar';
import { GlobalContext } from '../../../../context/global state/GlobalState';
import { SearchResults } from '../SearchResults';

export const MainBody = () => {
  const {
    artists,
    searchResults,
    searchQuery,
    currentPaginationIndex,
    newTotalPaginationIndex,
    goToNextPage,
    goToPrevPage,
  } = useContext(GlobalContext);

  // filter out 16 artists for each page
  const newArtists = artists.filter((x, index) => {
    return (
      index + 1 <= newTotalPaginationIndex && index + 1 > currentPaginationIndex
    );
  });

  const artistElements = newArtists.map((artist) => {
    return (
      <li
        key={artist.id}
        className='song-container'
        style={{ height: '425px' }}
      >
        {artist.thumbnail && (
          <div
            className='img'
            style={{
              backgroundImage: `url(${require(`../../../../imgs/${artist.thumbnail}`)})`,
            }}
          ></div>
        )}
        <div className='song-title'>
          <h3 style={{ fontWeight: '600', fontSize: '25px' }}>
            <a href={`/artist/?artistId=${artist.id}`}>{artist.name}</a>
          </h3>
        </div>
        <div className='song-info'>
          <div className='play-song'>
            <i className='fab fa-instagram' style={{ fontSize: '35px' }}></i>
          </div>
          <div className='download-song'>
            <a href='/link'>
              <i className='fab fa-facebook' style={{ fontSize: '35px' }}></i>
            </a>
          </div>
        </div>
      </li>
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
    if (newTotalPaginationIndex < artists.length) {
      goToNextPage(newTotalPaginationIndex);
    } else {
      return;
    }
  };

  return (
    <div className='main-container'>
      <div className='left-side songs'>
        {searchResults.length >= 1 ? (
          <SearchResults
            searchResults={searchResults}
            searchQuery={searchQuery}
          />
        ) : (
          <>
            <h3 className='page-title'>All Artists</h3>
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
            <ul className='songs-container'>{artistElements}</ul>
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
    </div>
  );
};
