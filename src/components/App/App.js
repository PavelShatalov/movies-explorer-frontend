import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Error from "../Error/Error";
import SavedMovies from "../SavedMovies/SavedMovies";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useEffect, useState } from "react";
import InfoTooltip from "../InfoToolTip/InfoToolTip";
import successImage from "../../images/success.svg";
import failedImage from "../../images/error.svg";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState("Success");
  const [infoImage, setInfoImage] = useState(successImage);

  function closeAllPopups() {
    setIsInfoPopupOpen(false);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser((userData) => ({
            ...userData,
            name: data.name,
            email: data.email,
            _id: data._id,
          }));
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          signOut();
        });
    } else {
      signOut();
    }
  }, [loggedIn]);

  useEffect(() => {
    function loadAllMovies() {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((data) => {
          setAllMovies(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    function loadSavedMovies() {
      setIsLoading(true);
      mainApi
        .getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (loggedIn) {
      loadAllMovies();
      loadSavedMovies();
    }
  }, [loggedIn]);

  function savedMovieList(movie) {
    mainApi
      .likeMovie(movie)
      .then((userMovie) => {
        setSavedMovies([userMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
        setInfoTitle("Фильм не сохранился! Попробуйте ещё раз");
        setInfoImage(failedImage);
        setIsInfoPopupOpen(true);
      });
  }

  function deleteMovieToList(movie) {
    const movieToDelete = savedMovies.find(
      (m) => movie.id === m.movieId || movie.movieId === m.movieId
    );
    mainApi
      .deleteMovie(movieToDelete._id)
      .then((removedMovie) => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== removedMovie._id)
        );
      })
      .catch((err) => {
        console.log(err);
        setInfoTitle("Фильм не удалён! Попробуйте ещё раз");
        setInfoImage(failedImage);
        setIsInfoPopupOpen(true);
      });
  }

  function handleSignUp(data) {
    setIsLoading(true);
    mainApi
      .signUp(data)
      .then((res) => {
        if (res) {
          setInfoTitle("Вы успешно зарегистрировались!");
          setInfoImage(successImage);
          handleSignIn(data);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setInfoTitle("Не получилось зарегистрироваться! Попробуйте ещё раз.");
        setInfoImage(failedImage);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
        setIsLoading(false);
      });
  }

  function handleSignIn(data) {
    setIsLoading(true);
    mainApi
      .signIn(data)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setInfoTitle("Не получилось войти! Попробуйте ещё раз");
        setInfoImage(failedImage);
        setIsInfoPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUserUpdate(userData) {
    setIsLoading(true);
    mainApi
      .updateUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        setInfoTitle("Данные успешно обновлены!");
        setInfoImage(successImage);
      })
      .catch((err) => {
        console.log(err);
        setInfoTitle("Ошибка при обновлении данных! Попробуйте ещё раз.");
        setInfoImage(failedImage);
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfoPopupOpen(true);
      });
  }

  function signOut() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header loggedIn={loggedIn} />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  allMovies={allMovies}
                  savedMovieList={savedMovieList}
                  savedMovies={savedMovies}
                  deleteMovieToList={deleteMovieToList}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  savedMovieList={savedMovieList}
                  savedMovies={savedMovies}
                  deleteMovieToList={deleteMovieToList}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  signOut={signOut}
                  handleUserUpdate={handleUserUpdate}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  loggedIn={loggedIn}
                  handleSignUp={handleSignUp}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  loggedIn={loggedIn}
                  handleSignIn={handleSignIn}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          infoTitle={infoTitle}
          infoImage={infoImage}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;