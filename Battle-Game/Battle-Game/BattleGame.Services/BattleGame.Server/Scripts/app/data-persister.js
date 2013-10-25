/// <reference path="../libs/jquery-2.0.3.js" />
/// <reference path="../libs/require.js" />
/// <reference path="../libs/rsvp.min.js" />

define(["httpRequester"], function (httpRequester) {
    function getOpen(sessionKey, resolve, reject) {
        return httpRequester.getJSON("http://localhost:22954/api/game/open/" + sessionKey, resolve, reject);
	}

    function getAktive(sessionKey, resolve, reject) {
        return httpRequester.getJSON("http://localhost:22954/api/game/my-active/" + sessionKey, resolve, reject);
    }

    function getBattle(id, sessionKey, resolve, reject) {
        return httpRequester.getJSON("http://localhost:22954/api/game/" + id + "/field/" + sessionKey, resolve, reject);
    }

    function registerUser(data, resolve, reject) {
        return httpRequester.postJSON("http://localhost:22954/api/user/register", data, resolve, reject);
    }

    function loginUser(data, resolve, reject) {
        return httpRequester.postJSON("http://localhost:22954/api/user/login", data, resolve, reject);
    }

	return {
	    open: getOpen,
	    active: getAktive,
	    battle: getBattle,
	    register: registerUser,
	    login: loginUser
	}
});