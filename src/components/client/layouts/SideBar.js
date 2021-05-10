import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../context/global state/GlobalState';

export const SideBar = () => {
  const {
    songs,
    getTrendingWorshipSongs,
    trendingWorshipSongs,
    getWorshipSongs,
    worshipSongs,
    rapSongs,
    trendingRapSongs,
    getRapSongs,
    getTrendingRapSongs,
    getSongsFromLastMonth,
    fromLastMonth,
    getTrendingLastMonth,
    trendingLastMonth,
    // loading,
  } = useContext(GlobalContext);
  const [hasAds, setHasAds] = useState(false);

  const allMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = new Date().getMonth();
  const lastMonth = month === 0 ? allMonths[11] : allMonths[month - 1];

  useEffect(() => {
    getWorshipSongs();
    getTrendingWorshipSongs();
    getRapSongs();
    getTrendingRapSongs();
    getSongsFromLastMonth(lastMonth);
    getTrendingLastMonth();
    // eslint-disable-next-line
  }, []);

  const adsList = ['ada.jpg', 'ads-1.jpeg', 'ads-2.jpg', 'ads-3.jpg'];

  const songsMax = songs.filter((song, index) => {
    return index + 1 <= 5;
  });

  const songElement = songsMax.map((song) => {
    const { title, artist, id } = song;
    return (
      <li key={id}>
        {/* use the link params to determine the song to load on the song page using your server */}
        <a href={`/song/?songId=${id}`}>
          {title} - {artist}
        </a>
      </li>
    );
  });

  let sortTrendingWorshipIndex;
  if (trendingWorshipSongs.length >= 1) {
    trendingWorshipSongs.sort((a, b) => {
      return b - a;
    });
    sortTrendingWorshipIndex = trendingWorshipSongs.map(
      (trendingWorshipSong) => {
        return +trendingWorshipSong.substr(
          trendingWorshipSong.indexOf('.') + 1
        );
      }
    );
  } else {
    sortTrendingWorshipIndex = worshipSongs.map((worshipSong) => {
      return worshipSong;
    });
  }

  const newWorshipIndex = sortTrendingWorshipIndex.filter((song, index) => {
    return index + 1 <= 5;
  });

  const trendingWorshipSongElement = newWorshipIndex.map((songIndex) => {
    const { title, artist, id } = worshipSongs[songIndex];
    return (
      <li key={id}>
        {/* use the link params to determine the song to load on the song page using your server */}
        <a href={`/song/?songId=${id}`}>
          {title} - {artist}
        </a>
      </li>
    );
  });

  let sortTrendingRapIndex;
  if (trendingRapSongs.length >= 1) {
    trendingRapSongs.sort((a, b) => {
      return b - a;
    });
    sortTrendingRapIndex = trendingRapSongs.map((trendingRapSong) => {
      return +trendingRapSong.substr(trendingRapSong.indexOf('.') + 1);
    });
  } else {
    sortTrendingRapIndex = rapSongs.map((rapSong) => {
      return rapSong;
    });
  }

  const newRapIndex = sortTrendingRapIndex.filter((song, index) => {
    return index + 1 <= 5;
  });

  const trendingRapSongElement = newRapIndex.map((songIndex) => {
    const { title, artist, id } = rapSongs[songIndex];
    return (
      <li key={id}>
        {/* use the link params to determine the song to load on the song page using your server */}
        <a href={`/song/?songId=${id}`}>
          {title} - {artist}
        </a>
      </li>
    );
  });

  let sortTrendingLastMonthIndex;
  if (trendingLastMonth.length >= 1) {
    trendingLastMonth.sort((a, b) => {
      return b - a;
    });
    sortTrendingLastMonthIndex = trendingLastMonth.map((trendingLastMonth) => {
      return +trendingLastMonth.substr(trendingLastMonth.indexOf('.') + 1);
    });
  } else {
    sortTrendingLastMonthIndex = fromLastMonth.map((song) => {
      return song;
    });
  }

  const newLastMonthIndex = sortTrendingLastMonthIndex.filter((song, index) => {
    return index + 1 <= 5;
  });

  const trendingLastMonthElement = newLastMonthIndex.map((songIndex, index) => {
    const { title, artist, id } = fromLastMonth[songIndex];
    return (
      <li key={id}>
        {/* use the link params to determine the song to load on the song page using your server */}
        <a href={`/song/?songId=${id}`}>
          {index + 1}. {title} - {artist}
        </a>
      </li>
    );
  });

  let link = '/make_ads',
    slidingIndex = adsList.length;

  const ads = adsList.map((ad, index) => {
    return (
      <li key={index} className='ad'>
        <img src={require(`../../../imgs/${ad}`)} alt={`ads- ${index + 1}`} />
      </li>
    );
  });

  const slideAds = () => {
    slidingIndex--;
    if (slidingIndex < 0) {
      slidingIndex = adsList.length - 1;
    }
    const ads = document.querySelectorAll('.ad');
    ads.forEach((ad) => {
      ad.classList.remove('slide');
    });
    ads[slidingIndex].classList.add('slide');
    setTimeout(slideAds, 5000);
  };

  useEffect(() => {
    if (adsList) {
      setTimeout(() => {
        setHasAds(true);
        slideAds();
      }, 3000);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='categories'>
      <div className='all-stars cat-list'>
        <h3 className='category-title'>Recent Uploads</h3>
        <ul>
          {songElement}
          <li>
            <a href='/new-uploads' className='last'>
              See all
            </a>
          </li>
        </ul>
      </div>
      <div className='worship cat-list'>
        <h3 className='category-title'>Trending Worship Songs</h3>
        <ul>
          {/* search list of songs for this song and display it */}
          {trendingWorshipSongElement}
          <li>
            <a href='/genre/worship/trending#trending' className='last'>
              See all
            </a>
          </li>
        </ul>
      </div>
      <a href={link}>
        <div
          className='pro-ads'
          style={{
            backgroundColor: `${hasAds ? 'transparent' : 'rgb(1, 10, 27)'}`,
          }}
        >
          {!hasAds && <p>Advertise here</p>}
          {hasAds && (
            <div className='ads-slider'>
              <ul>{ads}</ul>
            </div>
          )}
        </div>
      </a>
      <a href={link}>
        <div
          className='pro-ads'
          style={{
            backgroundColor: `${hasAds ? 'transparent' : 'rgb(1, 10, 27)'}`,
            marginBottom: '10px',
          }}
        >
          {!hasAds && <p>Advertise here</p>}
          {hasAds && (
            <div className='single-ad'>
              <img src={require('../../../imgs/cso.jpg')} alt='ad' />
            </div>
          )}
        </div>
      </a>
      <div className='trill-chart cat-list'>
        <h3 className='category-title'>{lastMonth} Top Five</h3>
        <ul>
          {/* search list of songs for this song and display it */}
          {trendingLastMonthElement}
        </ul>
      </div>
      <div className='trill-chart cat-list'>
        <h3 className='category-title'>Trending Rap Songs</h3>
        <ul>
          {/* search list of songs for this song and display it */}
          {trendingRapSongElement}
          <li>
            <a href='/genre/rap/trending#trending' className='last'>
              See all
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
