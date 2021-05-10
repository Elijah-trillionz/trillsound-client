import React, { createContext, useReducer } from 'react';
import AppReducer from '../app reducers/AppReducer';
import {
  ALPH_ORDER,
  TRENDING,
  PREV_PAGE,
  NEXT_PAGE,
  SET_LOADING,
  GET_WORSHIP_SONGS,
  GET_TRENDING_WORSHIP,
  GET_RAP_SONGS,
  GET_PRAISE_SONGS,
  GET_TRENDING_RAP,
  GET_TRENDING_PRAISE,
  WORSHIP_ALPH_ORDER,
  PRAISE_ALPH_ORDER,
  RAP_ALPH_ORDER,
  SEARCH_QUERY,
  GET_LAST_MONTH,
  TRENDING_LAST_MONTH,
  SONG_TO_PREVIEW,
  ARTIST_TO_PREVIEW,
  SIGNED_IN_ADMIN,
  SET_ERROR_MESSAGE,
} from '../app reducers/types';

const initialState = {
  songs: [
    {
      id: 10, // from server
      title: 'Mma Mma 1',
      artist: 'Frank Edwards',
      thumbnail: 'ads-2.jpg',
      downloadLink: '/link/frank',
      numOfDownloads: 14, // from server
      numOfStreams: 200, // from server
      genre: 'praise',
      createdAt: 'August 27, 2020 at 12:41:24 AM UTC+1', // from server; firebase
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
      officiis quos sit impedit libero ea consequuntur veritatis placeat
      optio, illo qui? Assumenda, explicabo. Vitae reiciendis numquam
      repudiandae doloribus assumenda, vero perspiciatis iusto eveniet
      rem sunt repellendus provident nemo, sapiente dolorem sint,
      inventore vel eum hic voluptates commodi obcaecati officiis porro
      nulla.`,
      date: 'January 6, 2021', // from server
    },
    {
      id: 20,
      title: 'Jesus 1',
      artist: 'Testimony Jaga',
      thumbnail: 'ads-1.jpeg',
      downloadLink: '/link/jaga',
      numOfDownloads: 98,
      numOfStreams: 61,
      genre: 'worship',
      createdAt: 'August 27, 2020 at 12:41:24 AM UTC+1',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
      officiis quos sit impedit libero ea consequuntur veritatis placeat
      optio, illo qui? Assumenda, explicabo. Vitae reiciendis numquam
      repudiandae doloribus assumenda, vero perspiciatis iusto eveniet
      rem sunt repellendus provident nemo, sapiente dolorem sint,
      inventore vel eum hic voluptates commodi obcaecati officiis porro
      nulla.`,
      date: 'January 6, 2021',
    },
    {
      id: 30,
      title: 'Fix My Eyes ft Sinach 1',
      artist: 'Ada',
      thumbnail: 'ada.jpg',
      downloadLink: '/link/ada',
      numOfDownloads: 190,
      numOfStreams: 40,
      genre: 'worship',
      createdAt: 'January 27, 2020 at 12:41:24 AM UTC+1',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
      officiis quos sit impedit libero ea consequuntur veritatis placeat
      optio, illo qui? Assumenda, explicabo. Vitae reiciendis numquam
      repudiandae doloribus assumenda, vero perspiciatis iusto eveniet
      rem sunt repellendus provident nemo, sapiente dolorem sint,
      inventore vel eum hic voluptates commodi obcaecati officiis porro
      nulla.`,
      date: 'January 6, 2021',
    },
    {
      id: 40,
      title: "What's up? Jesus 1",
      artist: 'Rap Nation',
      thumbnail: 'ads-3.jpg',
      downloadLink: '/link/ada',
      numOfDownloads: 1090,
      numOfStreams: 40,
      genre: 'rap',
      createdAt: 'August 27, 2020 at 12:41:24 AM UTC+1',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
      officiis quos sit impedit libero ea consequuntur veritatis placeat
      optio, illo qui? Assumenda, explicabo. Vitae reiciendis numquam
      repudiandae doloribus assumenda, vero perspiciatis iusto eveniet
      rem sunt repellendus provident nemo, sapiente dolorem sint,
      inventore vel eum hic voluptates commodi obcaecati officiis porro
      nulla.`,
      date: 'January 6, 2021',
    },
    {
      id: 50,
      title: 'My Saviour 1',
      artist: 'KinGZkid',
      thumbnail: 'avatar.png',
      downloadLink: '/link/ada',
      numOfDownloads: 19000,
      numOfStreams: 4000,
      genre: 'rap',
      createdAt: 'December 27, 2020 at 12:41:24 AM UTC+1',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
      officiis quos sit impedit libero ea consequuntur veritatis placeat
      optio, illo qui? Assumenda, explicabo. Vitae reiciendis numquam
      repudiandae doloribus assumenda, vero perspiciatis iusto eveniet
      rem sunt repellendus provident nemo, sapiente dolorem sint,
      inventore vel eum hic voluptates commodi obcaecati officiis porro
      nulla.`,
      date: 'December 6, 2021',
    },
  ],
  songTitles: [],
  trending: [],
  worshipSongs: [],
  praiseSongs: [],
  rapSongs: [],
  trendingWorshipSongs: [],
  trendingPraiseSongs: [],
  trendingRapSongs: [],
  fromLastMonth: [],
  trendingLastMonth: [],
  previewingSong: [],
  artistId: '',
  artists: [
    {
      id: 10, // from server
      name: 'Ada',
      thumbnail: 'ada.jpg',
      songIds: [20], // from server
      bio: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
    officiis quos sit impedit libero ea consequuntur veritatis placeat
    optio, illo qui? Assumenda, explicabo.`,
      facebookLink: 'https://facebook.com',
      instaLink: 'https://instagram.com',
      youtubeLink: 'https://youtube.com',
      date: 'December 14, 2020',
    },
    {
      id: 20,
      name: 'Testimony Jaga',
      thumbnail: 'ads-3.jpg',
      songIds: [50, 20, 30],
      bio: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
      officiis quos sit impedit libero ea consequuntur veritatis placeat
      optio, illo qui? Assumenda, explicabo.`,
      facebookLink: 'https://facebook.com',
      instaLink: 'https://instagram.com',
      twitterLink: 'https://twitter.com',
      kingschatLink: 'https://kingschat.com',
      date: 'January 14, 2021',
    },
    {
      id: 30,
      name: 'CSO',
      thumbnail: 'cso.jpg',
      songIds: [10, 40, 30],
      bio: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
    officiis quos sit impedit libero ea consequuntur veritatis placeat
    optio, illo qui? Assumenda, explicabo.`,
      instaLink: 'https://instagram.com',
      youtubeLink: 'https://youtube.com',
      twitterLink: 'https://twitter.com',
      kingschatLink: 'https://kingschat.com',
      date: 'December 11, 2020',
    },
  ],
  loading: false,
  currentPaginationIndex: 0,
  newTotalPaginationIndex: 16,
  searchResults: [],
  searchQuery: '',
  previewingArtist: [],
  admins: [
    {
      id: 10,
      username: 'Elijah Trillionz',
      zone: 'CE Mid-West Zone',
      songsUploaded: [10, 20, 30, 40],
      artistsUploaded: [10, 20],
      socialHandle: 'https://twitter/elijahtrillionz',
    },
    {
      id: 20,
      username: 'John Doe',
      zone: 'CE Lagos Zone 2',
      songsUploaded: [50],
      artistsUploaded: [30],
      socialHandle: 'https://twitter/john_doe',
    },
  ],
  signedInAdmin: [],
  errorMessage: '',
};

// whenever a song is uploaded, the arist is searched for in the database and is attributed as the owner of that song by adding the song id in the songIds of the artist

// create context
export const GlobalContext = createContext(initialState);

// create provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // actions
  const sortAlphabetically = () => {
    dispatch({
      type: ALPH_ORDER,
    });
  };

  const sortByTrending = () => {
    dispatch({
      type: TRENDING,
    });
  };

  // paginations
  const goToNextPage = (index) => {
    document.querySelector('html').scrollTop = 0;
    setLoading();
    // setTimeout(() => {
    dispatch({
      type: NEXT_PAGE,
      payload: index,
    });
    console.log(state.currentPaginationIndex, 'next');
    // }, 1000);
  };

  const goToPrevPage = (index) => {
    document.querySelector('html').scrollTop = 0;
    setLoading();
    // setTimeout(() => {
    dispatch({
      type: PREV_PAGE,
      payload: index,
    });
    console.log(state.currentPaginationIndex, 'prev');
    // }, 1000);
  };

  const updateStreams = (id) => {
    // update with this id on the database
    console.log(`updated no of streams for id: ${id}`);
  };

  const updateDownloads = (id) => {
    // update with this id on the database
    console.log(`updated no of downloads for id: ${id}`);
  };

  const getWorshipSongs = () => {
    setLoading();
    dispatch({
      type: GET_WORSHIP_SONGS,
    });
  };

  const getTrendingWorshipSongs = () => {
    setLoading();
    dispatch({
      type: GET_TRENDING_WORSHIP,
    });
  };

  const worshipInAlphOrder = () => {
    setLoading();
    dispatch({
      type: WORSHIP_ALPH_ORDER,
    });
  };

  const getRapSongs = () => {
    setLoading();
    dispatch({
      type: GET_RAP_SONGS,
    });
  };

  const getTrendingRapSongs = () => {
    setLoading();
    dispatch({
      type: GET_TRENDING_RAP,
    });
  };

  const praiseInAlphOrder = () => {
    setLoading();
    dispatch({
      type: PRAISE_ALPH_ORDER,
    });
  };

  const getPraiseSongs = () => {
    setLoading();
    dispatch({
      type: GET_PRAISE_SONGS,
    });
  };

  const rapInAlphOrder = () => {
    setLoading();
    dispatch({
      type: RAP_ALPH_ORDER,
    });
  };

  const getTrendingPraiseSongs = () => {
    setLoading();
    dispatch({
      type: GET_TRENDING_PRAISE,
    });
  };

  // search for query
  const searchForQuery = (query) => {
    setLoading();
    dispatch({
      type: SEARCH_QUERY,
      payload: query,
    });
  };

  // get all songs posted last month
  const getSongsFromLastMonth = (lastMonth) => {
    dispatch({
      type: GET_LAST_MONTH,
      payload: lastMonth,
    });
  };

  const getTrendingLastMonth = () => {
    dispatch({
      type: TRENDING_LAST_MONTH,
    });
  };

  // in loading song's info. the server will collect the id of the song and send the id to the client to filter the song
  const songToPreview = () => {
    // when the song is seen, the id of the song will be sent while the name of the artist will be used to find the id of the artist in the artist collection in the database
    setLoading();
    const id = 50;
    const artistId = 20;
    dispatch({
      type: SONG_TO_PREVIEW,
      payload: [id, artistId], // originally coming from the server
    });
  };

  const artistToPreview = () => {
    setLoading();
    const id = 20;
    dispatch({
      type: ARTIST_TO_PREVIEW,
      payload: id,
    });
  };

  // actions for admins of the website
  const signIn = (username, password) => {
    // send log in info to database
    console.log(username, password);
  };

  const getSignedInAdmin = () => {
    // id is to be set on the headers when an admin signs in by the server
    const id = 30;
    dispatch({
      type: SIGNED_IN_ADMIN,
      payload: id,
    });
  };

  const uploadSong = (song) => {
    // send to database
    console.log('song uploaded');
  };
  const updateSong = (id, song) => {
    // send to database
    console.log(`song updated for id ${id}`);
  };
  const deleteSong = (id) => {
    // send to database
    console.log(`song (${id}) deleted`);
  };

  const uploadArtist = (artist) => {
    // send to database
    console.log('artist uploaded');
  };
  const updateArtist = (id, artist) => {
    // send to database
    console.log(`artist updated for id ${id}`);
  };
  const deleteArtist = (id) => {
    // send to database
    console.log(`artist (${id}) delete`);
  };

  const changePassword = (newPassword) => {
    // send to new and old password
    console.log(newPassword);
  };

  // global
  // set loading
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };
  const setErrorMessage = (err) => {
    dispatch({
      type: SET_ERROR_MESSAGE,
      payload: err,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        artists: state.artists,
        songs: state.songs,
        songTitles: state.songTitles,
        trending: state.trending,
        currentPaginationIndex: state.currentPaginationIndex,
        newTotalPaginationIndex: state.newTotalPaginationIndex,
        trendingWorshipSongs: state.trendingWorshipSongs,
        worshipSongs: state.worshipSongs,
        praiseSongs: state.praiseSongs,
        rapSongs: state.rapSongs,
        trendingPraiseSongs: state.trendingPraiseSongs,
        trendingRapSongs: state.trendingRapSongs,
        searchResults: state.searchResults,
        searchQuery: state.searchQuery,
        fromLastMonth: state.fromLastMonth,
        trendingLastMonth: state.trendingLastMonth,
        previewingSong: state.previewingSong,
        artistId: state.artistId,
        previewingArtist: state.previewingArtist,
        // admins
        admins: state.admins,
        signedInAdmin: state.signedInAdmin,
        // globals
        errorMessage: state.errorMessage,
        loading: state.loading,
        goToNextPage,
        goToPrevPage,
        sortByTrending,
        sortAlphabetically,
        updateDownloads,
        updateStreams,
        getTrendingWorshipSongs,
        getWorshipSongs,
        getPraiseSongs,
        getRapSongs,
        getTrendingPraiseSongs,
        getTrendingRapSongs,
        rapInAlphOrder,
        praiseInAlphOrder,
        worshipInAlphOrder,
        searchForQuery,
        getSongsFromLastMonth,
        getTrendingLastMonth,
        songToPreview,
        artistToPreview,
        // admins
        signIn,
        getSignedInAdmin,
        uploadSong,
        updateSong,
        deleteSong,
        uploadArtist,
        updateArtist,
        deleteArtist,
        changePassword,
        // globals
        setErrorMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
