import { useState } from "react";

export default function Login({ handleLogin }) {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        handleLogin(email, password);
    };

    return (
        <div className="login__container">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={formValue.email}
                    id="email"
                    className="login__input login__input_type_email"
                    type="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                />
                <input
                    name="password"
                    value={formValue.password}
                    id="password"
                    className="login__input login__input_type_password"
                    type="password"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleChange}
                />

                <button className="login__button-submit" type="submit">
                    Войти
                </button>
            </form>
        </div>
    );
}