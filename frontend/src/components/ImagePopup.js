function ImagePopup(props) {

    return (
        <div
            className={`popup popup_type_image ${props.card.link ? 'popup_opened' : ''}`}
        >
            <div className="popup__type-image">
                <button
                    className="popup__close-button popup__close-button_type_image"
                    type="button"
                    onClick={props.onClose}
                ></button>
                <img
                    className="popup__image"
                    src={props.card.link}
                    alt={props.card.name}
                />
                <p className="popup__image-text">{props.card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;