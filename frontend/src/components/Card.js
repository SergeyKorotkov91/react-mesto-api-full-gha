import { useContext } from "react";
import { CurrentUserContext } from "../components/contexts/CurrentUserContext.js";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;


    const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

    const cardLikeButton = `element__like-btn ${isLiked && "element__like-btn_active"
        }`;

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <li className="element">
            <img
                className="element__img"
                src={props.card.link}
                alt={props.card.name}
                onClick={handleClick}
            />
            <div className="element__bottom-block">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__likes">
                    <button className={cardLikeButton} type="button" onClick={handleLikeClick}></button>
                    <span className="element__likes-number">{props.card.likes.length}</span>
                </div>
            </div>
            {isOwn && (<button className="element__delete-btn" type="button" onClick={handleDeleteClick}></button>)}
        </li>
    );
}

export default Card;