import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "../utils/Api";
import * as auth from "../utils/auth";
import Login from "./Login";
import Register from "./Register";
import { ProtectedRoute } from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../components/contexts/CurrentUserContext.js";

function App() {

  //проверяем авторизацю
  const [isLoggedIn, setLoggedIn] = useState(false);

  //попап при регистрации
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

  //данные юзера после авторизации
  const [userData, setUserData] = useState(null);

  //стейт для проверки регистрации
  const [isRegistered, setRegistered] = useState(false);

  //навигация
  const navigate = useNavigate();

  //выход
  function logOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin");
  }

  //функция регистрации
  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setRegistered(true);
        setInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        setRegistered(false);
        setInfoTooltipOpen(true);
      });
  }

  //функция логина
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        console.log(data.token);
        setUserData(email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  //проверка токена
  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    auth
      .getContent(jwt)
      .then((res) => {
        if (!res) {
          return;
        }
        setLoggedIn(true);
        setUserData(res.email);
        navigate("/");
      })
      .catch((err) => {
        setLoggedIn(false);
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  const [currentUser, setСurrentUser] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((userInfoApi) => {
          setСurrentUser(userInfoApi);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then(({data}) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setInfoTooltipOpen(false);
  }

  //константа открытых попапов
  const openedPopups =
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isInfoTooltipOpen ||
    selectedCard;
  //закрытие на ESC

  useEffect(() => {
    const close = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    if (openedPopups) {
      window.addEventListener("keydown", close);
      return () => {
        window.removeEventListener("keydown", close);
      };
    }
  }, [openedPopups]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userInfo) {
    api
      .editUserInfo(userInfo)
      .then((userInfoApi) => {
        setСurrentUser(userInfoApi);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .editAvatar(userAvatar)
      .then((userAvatarApi) => {
        setСurrentUser(userAvatarApi);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then(({data}) => {
        setCards([data, ...cards]);

        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }


  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header userData={userData} logOut={logOut} />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                  onCardDelete={handleCardDelete}
                  footer={Footer}
                />
              }
            />
            <Route
              path="/signup"
              element={<Register handleRegistration={handleRegistration} />}
            />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
          </Routes>
        </div>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegistered={isRegistered}
        />

        <PopupWithForm name="delete-card" title="Вы уверены?" btnTxt="Да" />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
