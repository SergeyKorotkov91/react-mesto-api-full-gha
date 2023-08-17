import PopupWithForm from "./PopupWithForm.js";
import { useRef, useEffect } from "react";

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            btnTxt="Сохранить"
        >
            <input
                id="input-url-avatar"
                className={`popup__input popup__input_src_value`}
                type="url"
                name="avatar"
                defaultValue=""
                placeholder="Ссылка на картинку"
                required
                ref={avatarRef}
            />
            <span className="popup__input-error input-url-avatar-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;