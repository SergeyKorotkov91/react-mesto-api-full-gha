import yesAuth from "../images/Union.png";
import noAuth from "../images/Unionnot.png";

export default function InfoTooltip({ isOpen, onClose, isRegistered }) {
    const image = isRegistered ? yesAuth : noAuth;
    const title = isRegistered
        ? "Вы успешно зарегистрировались!"
        : "Что-то пошло не так! Попробуйте ещё раз";
    const alt = isRegistered
        ? "картинка удачной регистрации"
        : "картинка неудачной регистрации";
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
            <div className="popup__container" onClick={(e) => e.stopPropagation()}>
                <button
                    className="popup__close-button"
                    onClick={onClose}
                    type="button"
                    aria-label="Кнопка закрытия"
                />
                <img className="popup__tooltip-img" src={image} alt={alt} />
                <h2 className="popup__tooltip-title">{title}</h2>
            </div>
        </div>
    );
}