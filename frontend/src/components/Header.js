import headerLogo from "../images/logo.svg";
import { Link, useLocation, Route, Routes } from "react-router-dom";

function Header({ userData, logOut }) {
    const location = useLocation();
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
            <div className="header__information">
                {location.pathname === "/signin" && (
                    <Link to="/signup" className="header__replace-link">
                        Регистрация
                    </Link>
                )}
                {location.pathname === "/signup" && (
                    <Link to="/signin" className="header__replace-link">
                        Войти
                    </Link>
                )}

                {location.pathname === "/" && (
                    <>
                        <p className="header__email">{userData}</p>
                        <Link to="/signin" className="header__replace-link" onClick={logOut}>
                            Выйти
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;