import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../components/contexts/CurrentUserContext.js";
import { useContext } from "react";

function EditProfilePopup(props) {
    const [name, setName] = useState(" ");

    function handleChangeName(e) {
        setName(e.target.value);
    }

    const [description, setDescription] = useState(" ");

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            btnTxt="Сохранить"
        >
            <input
                id="input-name"
                className="popup__input popup__input_name_value"
                type="text"
                name="name"
                value={name || ""}
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                onChange={handleChangeName}
            />
            <span className="popup__input-error input-name-error"></span>

            <input
                id="input-description"
                className="popup__input popup__input_description_value"
                type="text"
                name="job"
                value={description || ""}
                placeholder="Профессиональная деятельность"
                minLength="2"
                maxLength="200"
                required
                onChange={handleChangeDescription}
            />
            <span className="popup__input-error input-description-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;