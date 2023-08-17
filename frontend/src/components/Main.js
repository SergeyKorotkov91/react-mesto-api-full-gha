import { useContext } from "react";
import { CurrentUserContext } from "../components/contexts/CurrentUserContext.js";

import Card from "./Card";

function Main(props) {
    const userInfo = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-init" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={userInfo.avatar} alt="Аватарка" />
                    <div className="profile__change-avatar"></div>
                </div>

                <div className="profile__info">
                    <h1 className="profile__title">{userInfo.name}</h1>
                    <button
                        className="profile__edit-button"
                        type="button"
                        onClick={props.onEditProfile}
                    ></button>
                </div>
                <p className="profile__description">{userInfo.about}</p>
                <button
                    className="profile__add-button"
                    type="button"
                    onClick={props.onAddPlace}
                ></button>
            </section>

            <section className="elements">
                <ul className="elements__cards">
                    {props.cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete} />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;