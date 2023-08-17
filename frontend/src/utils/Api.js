class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _parseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('jwt')}`}
        })
            .then(res => this._parseResponse(res));
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('jwt')}`},
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._parseResponse(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('jwt')}`}
        })
            .then(res => this._parseResponse(res));
    }

    changeLikeCardStatus(id, isLiked) {
        return isLiked
            ? fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: "PUT",
                headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('jwt')}`},
            }).then((res) => this._parseResponse(res))
            : fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: "DELETE",
                headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('jwt')}`},
            }).then((res) => this._parseResponse(res));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('jwt')}`}
        })
            .then(res => this._parseResponse(res));
    }

    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('jwt')}`},
            body: JSON.stringify({
                name: data.name,
                about: data.about //job
            })
        })
            .then(res => this._parseResponse(res));
    }

    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('jwt')}`},
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => this._parseResponse(res));
    }
}

const api = new Api({
    //baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
    //baseUrl = "nomoreparties.co",
    baseUrl: 'https://api.kanc1er.nomoreparties.co',

    headers: {
        // authorization: "57f855b2-3dbd-4c01-9fcc-5cfa2e14a7d4",
        "content-type": "application/json",
    },
});

export default api;