import PopupWithForm from "./PopupWithForm.js";
import { useRef, useEffect } from "react";

function AddPlacePopup(props) {
    const nameCardRef = useRef();
    const linkCardRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlaceSubmit({
            name: nameCardRef.current.value,
            link: linkCardRef.current.value,
        });
    }

    useEffect(() => {
        nameCardRef.current.value = "";
        linkCardRef.current.value = "";
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="new-place"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            btnTxt="Создать"
        >
            <input
                id="place"
                className="popup__input popup__input_place_value"
                type="text"
                name="place"
                defaultValue=""
                placeholder="Название"
                minLength="2"
                maxLength="200"
                required
                ref={nameCardRef}
            />
            <span className="popup__input-error input-place-error"></span>
            <input
                id="input-url"
                className="popup__input popup__input_src_value"
                type="url"
                name="link"
                defaultValue=""
                placeholder="Ссылка на картинку"
                required
                ref={linkCardRef}
            />
            <span className="popup__input-error input-url-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;