import {
  ALPH_ORDER,
  TRENDING,
  SET_LOADING,
  NEXT_PAGE,
  PREV_PAGE,
  GET_TRENDING_WORSHIP,
  GET_WORSHIP_SONGS,
  GET_PRAISE_SONGS,
  GET_RAP_SONGS,
  GET_TRENDING_PRAISE,
  GET_TRENDING_RAP,
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
} from './types';

const AppReducer = (state, action) => {
  switch (action.type) {
    case ALPH_ORDER:
      return {
        ...state,
        songTitles: state.songs.map((song, index) => {
          return `${song.title}.${index}`;
        }),
      };
    case TRENDING:
      return {
        ...state,
        trending: state.songs.map((song, index) => {
          return `${song.numOfDownloads + song.numOfStreams}.${index}`;
        }),
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPaginationIndex: action.payload,
        newTotalPaginationIndex: action.payload + 16,
        loading: false,
      };
    case PREV_PAGE:
      return {
        ...state,
        currentPaginationIndex: action.payload - 16,
        newTotalPaginationIndex: action.payload,
        loading: false,
      };
    case GET_WORSHIP_SONGS:
      return {
        ...state,
        worshipSongs: state.songs.filter((song) => {
          return song.genre === 'worship';
        }),
        loading: false,
      };
    case GET_TRENDING_WORSHIP:
      return {
        ...state,
        trendingWorshipSongs: state.worshipSongs.map((worshipSong, index) => {
          return `${
            worshipSong.numOfDownloads + worshipSong.numOfStreams
          }.${index}`;
        }),
        loading: false,
      };
    case WORSHIP_ALPH_ORDER:
      return {
        ...state,
        songTitles: state.worshipSongs.map((worshipSong, index) => {
          return `${worshipSong.title}.${index}`;
        }),
        loading: false,
      };
    case GET_PRAISE_SONGS:
      return {
        ...state,
        praiseSongs: state.songs.filter((song) => {
          return song.genre === 'praise';
        }),
        loading: false,
      };
    case GET_TRENDING_PRAISE:
      return {
        ...state,
        trendingPraiseSongs: state.praiseSongs.map((praiseSong, index) => {
          return `${
            praiseSong.numOfDownloads + praiseSong.numOfStreams
          }.${index}`;
        }),
        loading: false,
      };
    case PRAISE_ALPH_ORDER:
      return {
        ...state,
        songTitles: state.praiseSongs.map((praiseSong, index) => {
          return `${praiseSong.title}.${index}`;
        }),
        loading: false,
      };
    case GET_RAP_SONGS:
      return {
        ...state,
        rapSongs: state.songs.filter((song) => {
          return song.genre === 'rap';
        }),
        loading: false,
      };
    case GET_TRENDING_RAP:
      return {
        ...state,
        trendingRapSongs: state.rapSongs.map((rapSong, index) => {
          return `${rapSong.numOfDownloads + rapSong.numOfStreams}.${index}`;
        }),
        loading: false,
      };
    case RAP_ALPH_ORDER:
      return {
        ...state,
        songTitles: state.rapSongs.map((rapSong, index) => {
          return `${rapSong.title}.${index}`;
        }),
        loading: false,
      };
    case SEARCH_QUERY:
      return {
        ...state,
        searchResults: [action.payload],
        searchQuery: action.payload,
        loading: false,
      };
    case GET_LAST_MONTH:
      return {
        ...state,
        fromLastMonth: state.songs.filter((song) => {
          return !song.date.indexOf(action.payload);
        }),
      };
    case TRENDING_LAST_MONTH:
      return {
        ...state,
        trendingLastMonth: state.fromLastMonth.map((song, index) => {
          return `${song.numOfDownloads + song.numOfStreams}.${index}`;
        }),
      };
    case SONG_TO_PREVIEW:
      return {
        ...state,
        previewingSong: state.songs.filter((song) => {
          return song.id === action.payload[0];
        }),
        artistId: action.payload[1],
        loading: false,
      };
    case ARTIST_TO_PREVIEW:
      return {
        ...state,
        previewingArtist: state.artists.filter((artist) => {
          return artist.id === action.payload;
        }),
        loading: false,
      };
    // admins

    case SIGNED_IN_ADMIN:
      return {
        ...state,
        signedInAdmin: state.admins.filter((admin) => {
          if (admin.id === action.payload) {
            return admin;
          } else {
            return 'error';
          }
        }),
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
