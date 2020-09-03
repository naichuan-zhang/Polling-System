import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../consts';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }
    const defaults = {
        headers: headers
    }
    options = Object.assign({}, defaults, options)
    return fetch(options.url, options)
        .then(response => response.json().then(json => {
            if (!response.ok) {
                return Promise.reject(json)
            }
            return json
        }))
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    })
}
