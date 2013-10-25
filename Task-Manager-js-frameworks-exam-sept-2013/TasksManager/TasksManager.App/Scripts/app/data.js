window.persisters = (function () {
    var usernameSaved = localStorage.getItem("username");
    var accessTokenSaved = localStorage.getItem("accessToken");
    var idSaved = localStorage.getItem("id");
    function saveLoginData(userData) {
        localStorage.setItem("username", userData.username);
        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("id", userData.id);
        usernameSaved = userData.username;
        accessTokenSaved = userData.accessToken;
        idSaved = userData.id;
    }

    function saveRegisterData(userData) {
        localStorage.setItem("username", userData.username);
        localStorage.setItem("id", userData.id);
        usernameSaved = userData.username;
        idSaved = userData.id;
    }

    function clearUserData() {
        localStorage.removeItem("username");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("id");
        usernameSaved = "";
        accessTokenSaved = "";
        idSaved = "";
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
        token: function (username, password, email) {
            var user = {
                username: username,
                authCode: CryptoJS.SHA1(password).toString(),
                email: email
            };
            return postJSON(this.apiUrl + "auth/token", user)
				.then(function (data) {
				    saveLoginData(data);
				    return data.username;
				});
        },
        register: function (username, password, email) {
            var user = {
                username: username,
                authCode: CryptoJS.SHA1(password).toString(),
                email: email
            };
            return postJSON(this.apiUrl + "users/register", user);
        },
        logout: function () {
            if (!accessTokenSaved) {
                alert("Cannot log out");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };
            clearUserData();
            return putJSON(this.apiUrl + "users", {}, headers);
        },
        currentUser: function () {
            return usernameSaved;
        }
    });

    var ListsPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        newList: function (title) {
            if (!accessTokenSaved) {
                alert("You are not logged in");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };

            var list = {
                title: title,
                todos: []
            };

            return postJSON(this.apiUrl, list, headers);
        },
        all: function () {
            if (!accessTokenSaved) {
                alert("You are not logged in");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };

            return getJSON(this.apiUrl, headers);
        },
        byId: function (id) {
            if (!accessTokenSaved) {
                alert("You are not logged in");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };

            return getJSON(this.apiUrl + id + "/todos", headers);
        },
        todos: function (id, text) {
            if (!accessTokenSaved) {
                alert("You are not logged in");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };

            var todo = {
                text: text
            };

            return postJSON(this.apiUrl + id + "/todos", todo, headers);
        }
    });

    var TodosPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        change: function (id) {
            if (!accessTokenSaved) {
                alert("You are not logged in");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };

            return putJSON(this.apiUrl + id, {}, headers);
        }
    });

    var AppointmentsPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
        },
        newAppointment: function (subject, description, appointmentDate, duration) {
            if (!accessTokenSaved) {
                alert("You are not logged in");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };

            var appointment = {
                subject: subject,
                description: description,
                appointmentDate: appointmentDate,
                duration: duration
            };

            return postJSON(this.apiUrl, appointment, headers);
        },
        all: function () {
            if (!accessTokenSaved) {
                alert("You are not logged in");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };

            return getJSON(this.apiUrl + "all", headers);
        },
        comming: function () {
            if (!accessTokenSaved) {
                alert("You are not logged in");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };

            return getJSON(this.apiUrl + "comming", headers);
        },
        byDate: function (date) {
            if (!accessTokenSaved) {
                alert("You are not logged in");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };

            return getJSON(this.apiUrl + "?date=" + date, headers);
        },
        today: function () {
            if (!accessTokenSaved) {
                alert("You are not logged in");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };

            return getJSON(this.apiUrl + "today", headers);
        },
        current: function () {
            if (!accessTokenSaved) {
                alert("You are not logged in");
            }

            var headers = {
                "X-accessToken": accessTokenSaved
            };

            return getJSON(this.apiUrl + "current", headers);
        }
    });

    var DataPersister = Class.create({
        init: function (apiUrl) {
            this.apiUrl = apiUrl;
            this.users = new UsersPersister(apiUrl);
            this.lists = new ListsPersister(apiUrl + "lists/");
            this.todos = new TodosPersister(apiUrl + "todos/");
            this.appointments = new AppointmentsPersister(apiUrl + "appointments/");
        }
    });


    return {
        get: function (apiUrl) {
            return new DataPersister(apiUrl);
        }
    }
}());