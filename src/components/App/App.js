import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Profile from '../Profile/Profile.js';
import NotFound from '../NotFound/NotFound.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import { getMovies } from "../../utils/MovieApi.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  registrace,
  authorizace,
  getUserInfo,
  setUserInfo,
  getSavedMovies,
  likeMovie,
  deleteMovie,
  jwtDelete
} from "../../utils/MainApi";
import Preloder from '../Preloader/Preloader.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Popup from '../Popup/Popup.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isOpenPopup, setIsOpenPopup] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    checkJWT();
  }, [])

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const movies = await getMovies();
        setMovieList(movies);
      } catch (error) {
        console.error(error);
        setIsOpenPopup(true);
        setErrorMessage(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (loggedIn) {
      getSavedMovies().then((res) => {
        if (res) {
          setSavedMovies(res);
        }
      }).catch((err) => {
        console.log(err);
        setIsOpenPopup(true);
        setErrorMessage(err);
      });
    }
    setLoading(false);
  }
    , [loggedIn]);



  function checkJWT() {
    setLoading(true);
    getUserInfo().then((res) => {
      if (!res) {
        
        throw new Error('Нет токена');
        return;
      }
      setLoggedIn(true);
      setCurrentUser(res);
      navigate("/movies", { replace: true });
      return;
    })
      .catch((err) => {
        console.log(err);
        setIsOpenPopup(true);
        setErrorMessage(err);
      }).finally(() => {
        setLoading(false);
      });
  }

  const navigate = useNavigate();

  function handleSignIn(data) {
    setIsLoading(true);
    authorizace(data.password, data.email).then((res) => {
      if (res) {
        navigate('/movies');
        setLoggedIn(true);
      }
    }).catch((err) => {
      console.log(err);
      setIsOpenPopup(true);
      setErrorMessage(err);
      
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleSignUp(data) {
    setIsLoading(true);
    registrace(data.name, data.password, data.email).then((res) => {
      if (res) {
        setLoggedIn(true);
        handleSignIn(data.email, data.password);
        navigate('/movies');
      }
    }).catch((err) => {
      setIsOpenPopup(true);
      setErrorMessage(err);
      console.log(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleUserUpdate(data) {
    setIsLoading(true);
    setUserInfo({ name: data.name, email: data.email }).then((res) => {
      if (res) {
        setCurrentUser(res);
        navigate('/movies');
      }
    }).catch((err) => {
      console.log(err);
      setIsOpenPopup(true);
      setErrorMessage(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleSignOut() {
    jwtDelete().then((res) => {
      if (res) {
        localStorage.clear();
        setLoggedIn(false);
        navigate("/", { replace: true });
        setCurrentUser({});
        console.log("Вы вышли из аккаунта");
      }
    }
    ).catch((err) => {
      console.log(err);
      setIsOpenPopup(true);
      setErrorMessage(err);
    });
  }


  function likeCard(card) {
    likeMovie(card)
      .then((userMovie) => {
        // setSavedMovies([userMovie, ...savedMovies]);
        savedMovies.push(userMovie);
        setSavedMovies(savedMovies.slice()); // обновляем состояние компонента
      })
      .catch((err) => {
        console.log(err);
        setIsOpenPopup(true);
        setErrorMessage(err);
      });

  }

  function deleteCard(card) {
    deleteMovie({ movieId: card._id })
      .then(() => {
        const newSavedMovies = savedMovies.filter((m) => m._id !== card._id);
        setSavedMovies(newSavedMovies);
        console.log("Карточка удалена");
      })
      .catch((err) => {
        console.log(err);
        setIsOpenPopup(true);
        setErrorMessage(err);
      });
  }

  function closePopup() {
    setIsOpenPopup(false);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {loading ? (
          <Preloder />
        ) : (
          <>
            <Header loggedIn={loggedIn} />
            <Routes>
              <Route path="/" exact element={<Main />} />
              <Route path="/profile" exact element={<ProtectedRoute element={Profile} handleUserUpdate={(data) => handleUserUpdate(data)}
                handleSignOut={handleSignOut} apiname={currentUser.name} apiemail={currentUser.email} loggedIn={loggedIn} ></ProtectedRoute>} />
              <Route path="/movies" exact element={<ProtectedRoute element={Movies} loggedIn={loggedIn} movieList={movieList} savedMovies={savedMovies} likeCard={likeCard} deleteCard={deleteCard} ></ProtectedRoute>} />
              <Route path="/saved-movies" exact element={<ProtectedRoute element={SavedMovies} loggedIn={loggedIn} movieList={movieList} savedMovies={savedMovies} likeCard={likeCard} deleteCard={deleteCard} ></ProtectedRoute>} />
              <Route path="/signin" exact element={<Login onSubmit={(data) => handleSignIn(data)} />} />
              <Route path="/signup" exact element={<Register onSubmit={(data) => handleSignUp(data)} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <Popup onClose={closePopup} isOpen={isOpenPopup} errorMessage={errorMessage}/> 
          </>
        )}
      </div>
      
    </CurrentUserContext.Provider>
    
  );
}

export default App;
