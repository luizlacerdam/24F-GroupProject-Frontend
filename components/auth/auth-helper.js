import {jwtDecode} from 'jwt-decode';

const authenticate = (token, cb) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);

        let decoded = jwtDecode(token);
        sessionStorage.setItem('username', decoded.username);
    }
    cb();
}

const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    return !!sessionStorage.getItem('token');
}

const getToken = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    return sessionStorage.getItem('token');
}

const getUsername = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    return sessionStorage.getItem('username');
}

const clearJWT = (cb) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        sessionStorage.removeItem('username');
    }
    cb();
}

export {authenticate, isAuthenticated, getToken, getUsername, clearJWT};