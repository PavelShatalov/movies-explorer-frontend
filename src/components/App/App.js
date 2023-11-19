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

import Preloder from '../Preloader/Preloader.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const movies = await getMovies();
        setMovieList(movies);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const navigate = useNavigate();

  function handleSignIn(data) {
    console.log(data);
  }

  function handleSignUp(data) {
    console.log(data);
  }

  function handleUserUpdate(data) {
    console.log(data);
  }

  function handleSignOut() {
    console.log('sign out');
    navigate('/');
  }

  return (
    <div className="App">
      {loading ? (
        <Preloder />
      ) : (
        <>
          <Header loggedIn={loggedIn} />
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/sign-in" exact element={<Login onSubmit={(data) => handleSignIn(data)} />} />
            <Route path="/sign-up" exact element={<Register onSubmit={(data) => handleSignUp(data)} />} />
            <Route path="/profile" exact element={<Profile handleUserUpdate={(data) => handleUserUpdate(data)} handleSignOut={handleSignOut} apiname="pavel" apiemail="mail@mail" />} />
            <Route path="/movies" exact element={<Movies movies={movieList} />} />
            <Route path="/saved-movies" exact element={<SavedMovies movies={movieList} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
