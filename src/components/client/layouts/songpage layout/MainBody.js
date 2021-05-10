import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../context/global state/GlobalState';
import { SideBar } from '../SideBar';
import { SearchResults } from '../SearchResults';

export const MainBody = () => {
  const {
    previewingSong,
    songToPreview,
    artistId,
    artists,
    songs,
    rapSongs,
    praiseSongs,
    trendingRapSongs,
    trendingPraiseSongs,
    trendingWorshipSongs,
    worshipSongs,
    getWorshipSongs,
    getPraiseSongs,
    getRapSongs,
    getTrendingWorshipSongs,
    getTrendingPraiseSongs,
    getTrendingRapSongs,
    searchResults,
    searchQuery,
    admins,
  } = useContext(GlobalContext);
  const [genreSongs, setGenreSongs] = useState([]);
  const [genreTypeSongs, setGenreTypeSongs] = useState([]);
  const [genreType, setGenreType] = useState('');

  useEffect(songToPreview, []);

  let song, activated;
  if (previewingSong.length >= 1) {
    song = previewingSong[0];
    activated = true;
  } else {
    song = {};
  }

  const theArtist = artists.filter((artist) => {
    return artist.id === artistId;
  });

  const songsFromArtist = songs.filter((theSong, index) => {
    let id;
    if (theArtist.length >= 1) {
      theArtist[0].songIds.forEach((songId) => {
        if (theSong.id === songId && song.id !== songId && index + 1 <= 7)
          id = theSong.id;
      });
    }
    return id;
  });

  useEffect(() => {
    if (song.genre === 'rap') {
      getRapSongs();
      getTrendingRapSongs();
      setGenreSongs(trendingRapSongs);
      setGenreTypeSongs(rapSongs);
      setGenreType('rap');
    } else if (song.genre === 'praise') {
      getPraiseSongs();
      getTrendingPraiseSongs();
      setGenreSongs(trendingPraiseSongs);
      setGenreTypeSongs(praiseSongs);
      setGenreType('praise');
    } else if (song.genre === 'worship') {
      getWorshipSongs();
      getTrendingWorshipSongs();
      setGenreSongs(trendingWorshipSongs);
      setGenreTypeSongs(worshipSongs);
      setGenreType('worship');
    }
    // eslint-disable-next-line
  }, [activated]);

  const genreIndexes = genreSongs.map((genreSong) => {
    return +genreSong.substr(genreSong.indexOf('.') + 1);
  });

  const newGenreIndexes = genreIndexes.filter((genreIndex, index) => {
    return index + 1 <= 10;
  });

  const artistSongLists = songsFromArtist.map((value, index) => {
    const { title, thumbnail } = value;
    return (
      <li key={index}>
        <a href='/s'>
          {thumbnail && (
            <div
              className='art-img'
              style={{
                backgroundImage: `url(${require(`../../../../imgs/${thumbnail}`)})`,
              }}
            ></div>
          )}
          <h3 className='page-title art' style={{ color: 'black' }}>
            {title}
          </h3>
        </a>
      </li>
    );
  });

  const songLists = newGenreIndexes.map((song, index) => {
    const { title, thumbnail, artist } = genreTypeSongs[song];
    return (
      <li key={index}>
        <a href='/s'>
          {thumbnail && (
            <div
              className='art-img'
              style={{
                backgroundImage: `url(${require(`../../../../imgs/${thumbnail}`)})`,
              }}
            ></div>
          )}
          <h3 className='page-title art' style={{ color: 'black' }}>
            {title}({index + 1}) - {artist}
          </h3>
        </a>
      </li>
    );
  });

  // find out the admin that made the post
  const admin = admins.filter((adminValue) => {
    let value;
    if (song.id) {
      if (adminValue.songsUploaded.indexOf(song.id) !== -1) value = adminValue;
    }
    return value;
  });
  // CURRENTLY UNRESOLVABLE
  // for (let i = 0; i < 31; i++) {
  //   if (song.createdAt) {
  //     if (song.createdAt.indexOf(i) !== -1) {
  //       console.log(i);
  //     }
  //   }
  // }

  return (
    <div className='main-container'>
      <div className='left-side artist-profile'>
        {searchResults.length >= 1 ? (
          <SearchResults
            searchResults={searchResults}
            searchQuery={searchQuery}
          />
        ) : (
          <>
            <div className='song-header'>
              <h3
                className='page-title'
                style={{ textAlign: 'left', color: 'black' }}
              >
                Download Mp3: {song.title} by
                <a href={`/artist/?artistId=${artistId}`}> {song.artist}</a>
              </h3>
              <p>
                <span>{song.date} | </span>
                {admin.length >= 1 && (
                  <a href={admin[0].socialHandle}>
                    {admin[0].username.replace(' ', '_')}
                  </a>
                )}
              </p>
            </div>
            <div className='song-body'>
              <div className='song-img'>
                {song.thumbnail && (
                  <img
                    src={require(`../../../../imgs/${song.thumbnail}`)}
                    alt='song-img'
                  />
                )}
                <div className='song-writeup'>
                  <p>{song.description}</p>
                </div>
              </div>

              <div className='song-action'>
                <div className='play'>
                  {/* deal with how to play it later. */}
                  <audio controls={true} title='Listen Online'></audio>
                </div>
                <div className='download'>
                  <a href={song.downloadLink} title='Download mp3'>
                    Download Here
                  </a>
                </div>
              </div>
              <div className='artist-tags'>
                <span
                  className='page-title artist-title'
                  style={{ fontSize: '20px' }}
                >
                  Tags:
                </span>
                <span className='text-blue'>
                  <a href='/artists'>#artist</a>
                </span>
                {/*<!--leads to allstar page-->*/}
                <span className='text-blue'>
                  <a href={`/artist/?artistId=${artistId}`}>
                    #{song.artist && song.artist.match(/\S+/g)}
                  </a>
                </span>
                {/*<!-- leads to album page -->*/}
                <span className='text-blue'>
                  <a href={`/genre/${genreType}`}>#{genreType}</a>
                </span>
                {/*<!-- leads to protostar page-->*/}
                <span className='text-blue'>
                  <a href='/'>#BLW</a>
                </span>
                {/*<!--leads to trending page -->*/}
              </div>
            </div>
            <div className='artist-songs'>
              <h3 className='page-title artist-title'>more from this artist</h3>
              <div className='art-card'>
                <ul>{artistSongLists}</ul>
              </div>
            </div>
            <div className='related-songs'>
              <h3 className='page-title artist-title'>Related songs</h3>
              <div className='art-card'>
                <ul>{songLists}</ul>
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
