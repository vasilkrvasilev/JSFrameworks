window.persisters = (function () {
    var usernameSaved = localStorage.getItem("username");
    var sessionKeySaved = localStorage.getItem("sessionKey");
    function saveUserData(userData) {
        localStorage.setItem("username", userData.username);
        localStorage.setItem("sessionKey", userData.sessionKey);
        usernameSaved = userData.username;
        sessionKeySaved = userData.sessionKey;
    }

    function clearUserData() {
        localStorage.removeItem("username");
        localStorage.removeItem("sessionKey");
        usernameSaved = "";
        sessionKeySaved = "";
    }

    function getJSON(requestUrl, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "GET",
                dataType: "json",
                headers: headers,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function postJSON(requestUrl, data, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: "json",
                headers: headers,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function putJSON(requestUrl, data, headers) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: "json",
                headers: headers,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    var UsersPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        login: function (username, password) {
            var user = {
                username: username,
                authCode: CryptoJS.SHA1(password).toString()
            };
            return postJSON(this.apiUrl + "login", user)
				.then(function (data) {
				    saveUserData(data);
				    return data.username;
				});
        },
        register: function (username, password) {
            var user = {
                username: username,
                authCode: CryptoJS.SHA1(password).toString()
            };
            return postJSON(this.apiUrl + "register", user)
				.then(function (data) {
				    saveUserData(data);
				    return data.username;
				});
        },
        logout: function () {
            if (!sessionKeySaved) {
                alert("Cannot log out");
            }

            var headers = {
                "X-sessionKey": sessionKeySaved
            };
            clearUserData();
            return putJSON(this.apiUrl + "logout", {}, headers);
        },
        accounts: function () {
            if (!sessionKeySaved) {
                alert("Cannot log out");
            }

            var headers = {
                "X-sessionKey": sessionKeySaved
            };

            return getJSON(this.apiUrl + "accounts", headers);
        },
        currentUser: function () {
            return usernameSaved;
        }
    });

    var AccountsPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        home: function () {
            return getJSON(this.apiUrl + "home");
        },
        logs: function (id) {
            if (!sessionKeySaved) {
                alert("Cannot log out");
            }

            var headers = {
                "X-sessionKey": sessionKeySaved
            };

            return getJSON(this.apiUrl + "logs/" + id, headers);
        },
        deposit: function (id, amount) {
            if (!sessionKeySaved) {
                alert("Invalid operation");
            }

            var headers = {
                "X-sessionKey": sessionKeySaved
            };

            return putJSON(this.apiUrl + "deposit/" + id, { amount: amount }, headers);
        },
        withdraw: function (id, amount) {
            if (!sessionKeySaved) {
                alert("Invalid operation");
            }

            var headers = {
                "X-sessionKey": sessionKeySaved
            };

            return putJSON(this.apiUrl + "withdraw/" + id, { amount: amount }, headers);
        }
    });

    var DataPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
            this.users = new UsersPersister(apiUrl + "users/");
            this.accounts = new AccountsPersister(apiUrl + "accounts/");
        }
    });


    return {
        get: function (apiUrl) {
            return new DataPersister(apiUrl);
        }
    }
}());