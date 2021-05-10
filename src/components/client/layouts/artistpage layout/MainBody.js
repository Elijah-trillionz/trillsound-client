import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../../context/global state/GlobalState';
import { SideBar } from '../SideBar';
import { SearchResults } from '../SearchResults';

export const MainBody = () => {
  const {
    songs,
    artists,
    trending,
    previewingArtist,
    artistToPreview,
    sortByTrending,
    searchQuery,
    searchResults,
  } = useContext(GlobalContext);

  useEffect(() => {
    artistToPreview();
    sortByTrending();
    // eslint-disable-next-line
  }, []);

  let artist, trendingFromArtist, artistSongs;
  console.log(previewingArtist);
  if (previewingArtist.length >= 1) {
    artist = previewingArtist[0];
    trending.sort((a, b) => {
      return b - a;
    });
    const trendingIndexes = trending.map((song) => {
      return +song.substr(song.indexOf('.') + 1);
    });

    const allTrendingSongs = trendingIndexes.map((songIndex) => {
      return songs[songIndex];
    });

    trendingFromArtist = allTrendingSongs.filter((song) => {
      let theSongs;
      if (artist.songIds.indexOf(song.id) !== -1) {
        theSongs = song;
      }

      return theSongs;
    });

    artistSongs = songs.filter((song) => {
      let theSongs;
      if (artist.songIds.indexOf(song.id) !== -1) {
        theSongs = song;
      }

      return theSongs;
    });
  } else {
    artist = [];
    trendingFromArtist = [];
    artistSongs = [];
  }

  const newTrendingPart = trendingFromArtist.filter((x, index) => {
    return index + 1 <= 4;
  });

  const trendingLists = newTrendingPart.map((trending) => {
    const { thumbnail, id, title } = trending;
    return (
      <li key={id}>
        <a href='/s'>
          <div
            className='art-img'
            style={{
              backgroundImage: `url(${require(`../../../../imgs/${thumbnail}`)})`,
            }}
          ></div>
          <h3 className='page-title art' style={{ color: 'black' }}>
            {title}
          </h3>
        </a>
      </li>
    );
  });

  const songLists = artistSongs.map((song, index) => {
    const { title, thumbnail } = song;
    return (
      <li key={index}>
        <a href='/s'>
          <div
            className='art-img'
            style={{
              backgroundImage: `url(${require(`../../../../imgs/${thumbnail}`)})`,
            }}
          ></div>
          <h3 className='page-title art' style={{ color: 'black' }}>
            {title}
          </h3>
        </a>
      </li>
    );
  });

  // sorting related artists
  const relatedArtists = artists.filter((artistValue) => {
    let related;
    if (artist.songIds) {
      if (
        artistValue.songIds.length === artist.songIds.length &&
        artistValue.id !== artist.id
      ) {
        related = artistValue;
      } else if (artistValue.songIds.length < artist.songIds.length) {
        related = artistValue;
      }
    }

    return related;
  });

  const randomArtistsElement = relatedArtists.map((relatedArtist) => {
    const { id, name, thumbnail } = relatedArtist;

    return (
      <a href={`/artist/?artistId=${id}`} key={id}>
        <div className='artist-img-container'>
          {thumbnail && (
            <img
              src={require(`../../../../imgs/${thumbnail}`)}
              alt='artist img'
            />
          )}
          <h3>{name}</h3>
          <p>See more about {name}</p>
        </div>
      </a>
    );
  });

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
            <div className='bio-container'>
              <div>
                <div className='artist-img-container'>
                  {artist.thumbnail && (
                    <img
                      src={require(`../../../../imgs/${artist.thumbnail}`)}
                      alt='artist img'
                    />
                  )}
                  <h3>{artist.name}</h3>
                  <p>Biography of BLW Star {artist.name}</p>
                </div>
              </div>
              <div className='about-container'>
                <h3 className='page-title artist-title'>About {artist.name}</h3>
                <p>{artist.bio}</p>
              </div>
            </div>
            <div className='artist-albums'>
              <h3 className='page-title artist-title'>
                Popular Songs of {artist.name}
              </h3>
              <div className='art-card'>
                <ul>{trendingLists}</ul>
              </div>
            </div>
            <div className='artist-songs'>
              <h3 className='page-title artist-title'>
                latest songs of {artist.name}
              </h3>
              <div className='art-card'>
                <ul>{songLists}</ul>
              </div>
            </div>
            <div className='artist-social'>
              <h3 className='page-title artist-title half'>
                contact testimony jaga on:
              </h3>
              <p>
                {artist.facebookLink && (
                  <b>
                    Facebook{' '}
                    <a href={artist.facebookLink}>
                      @{artist.name.match(/\S+/g)}
                    </a>
                  </b>
                )}
                {artist.kingschatLink && (
                  <b>
                    KingsChat
                    <a href={artist.kingschatLink}>@Testimony Jaga</a>
                  </b>
                )}
                {artist.twitterLink && (
                  <b>
                    Twitter
                    <a href={artist.twitterLink}>@Testimony Jaga</a>
                  </b>
                )}
                {artist.instaLink && (
                  <b>
                    Instagram
                    <a href={artist.instaLink}>@Testimony Jaga</a>
                  </b>
                )}
                {artist.youtubeLink && (
                  <b>
                    YouTube
                    <a href={artist.youtubeLink}>@Testimony Jaga</a>
                  </b>
                )}
              </p>
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
                <a href='/alph#alph-order'>#songs</a>
              </span>
              {/*<!-- leads to protostar page-->*/}
              <span className='text-blue'>
                <a href='/'>#BLW</a>
              </span>
              {/*<!--leads to trending page -->*/}
            </div>
            <div className='related-artists'>
              <h3 className='page-title'>
                <a href='/artists'>
                  Related Artists
                  <i
                    className='far fa-bookmark'
                    style={{ marginLeft: '10px' }}
                  />
                </a>
              </h3>
              <div className='artist-lists'>{randomArtistsElement}</div>
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
