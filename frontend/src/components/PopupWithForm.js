function PopupWithForm(props) {
    return (
        <div
            className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}
        >
            <div className="popup__container">
                <button
                    className={`popup__close-button popup__close-button_type_${props.name}`}
                    type="button"
                    onClick={props.onClose}
                ></button>
                <h3 className="popup__title">
                    {props.title}
                </h3>
                <form
                    className={`popup__form popup__form-${props.name}`}
                    name={props.name}
                    onSubmit={props.onSubmit}
                >
                    {props.children}

                    <button
                        className="popup__save-button"
                        type="submit"
                    >
                        {props.btnTxt}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default PopupWithForm;