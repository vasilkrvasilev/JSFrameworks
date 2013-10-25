/// <reference path="libs/require.js" />
/// <reference path="libs/sammy-0.7.4.js" />
/// <reference path="libs/jquery-2.0.3.js" />
/// <reference path="app/data-persister.js" />


(function () {

	require.config({
		paths: {
			jquery: "libs/jquery-2.0.3",
			sammy: "libs/sammy-0.7.4",
			httpRequester: "libs/http-requester",
			mustache: "libs/mustache",
			underscore: "libs/underscore",
            sha1: "libs/sha1"
		}
	})

	require(["jquery", "underscore", "sammy", "mustache", "app/data-persister", "app/controls", "sha1"],
        function ($, underscore, sammy, mustache, data, controls, sha1) {
            var sessionKey = localStorage.getItem("sessionKey");
            function saveUserData(userData) {
                localStorage.setItem("sessionKey", userData.sessionKey);
                sessionKey = userData.sessionKey;
            }

            var app = sammy("#main-content", function () {

                this.get("#/register-login", function () {
                    var self = this;
                    var tableTemplate = mustache.compile(document.getElementById("register-login-template").innerHTML);
                    var tableView = controls.getTableView([], 1);

                    var tableViewHtml = tableView.render(tableTemplate);

                    document.getElementById("content").innerHTML = tableViewHtml;
                    $('#register').click(onRegisterBottonClick);
                    $('#login').click(onLoginBottonClick);

                    function onRegisterBottonClick(event) {
                        var username = $("#username").val();
                        var nickname = $("#nickname").val();
                        var password = $("#password").val();
                        var user = {
                            username: username,
                            nickname: nickname,
                            authCode: CryptoJS.SHA1(username + password).toString()
                        };

                        data.register(user, function (response) {
                            saveUserData(response);
                            self.redirect("#/open/" + sessionKey);
                        }, function (err) {
                            console.log(err.Message);
                        });
                    }

                    function onLoginBottonClick(event) {
                        var username = $("#username").val();
                        var password = $("#password").val();
                        var user = {
                            username: username,
                            authCode: CryptoJS.SHA1(username + password).toString()
                        };

                        data.login(user, function (response) {
                            saveUserData(response);
                            self.redirect("#/open/" + sessionKey);
                        }, function (err) {
                            console.log(err.Message);
                        });
                    }
                });

                this.get("#/open/:sessionKey", function () {
                    data.open(this.params["sessionKey"], function (response) {
                        var tableTemplate = mustache.compile(document.getElementById("open-game-template").innerHTML);
                        var tableView = controls.getTableView(response, 1);
                        //    [{
                        //    creator: "Obi Wan Kenobi",
                        //    id: 30,
                        //    title: "The Empire Strikes Back"
                        //}, {
                        //    creator: "Doncho Minkov",
                        //    id: 31,
                        //    title: "JS apps"
                        //}]

                        var tableViewHtml = tableView.render(tableTemplate);

                        document.getElementById("content").innerHTML = tableViewHtml +
                            "<div><a href=\"index.html#/active/" + sessionKey + "\">Active Games</a></div>";

                    }, function (err) {
                        console.log(err.Message);
                    });
                });

                this.get("#/active/:sessionKey", function () {
                    var self = this;
                    data.active(this.params["sessionKey"], function (response) {
                        var tableTemplate = mustache.compile(document.getElementById("active-game-template").innerHTML);
                        var tableView = controls.getTableView(response, 1);
                        //    [{
                        //    "creator": "Obi Wan Kenobi",
                        //    "id": 30,
                        //    "status": "in-progress",
                        //    "title": "The Empire Strikes Back" 
                        //}, {
                        //    "creator": "Doncho Minkov",
                        //    "id": 31,
                        //    "status": "full",
                        //    "title": "Battle of the Titans" 
                        //}]

                        var tableViewHtml = tableView.render(tableTemplate);

                        document.getElementById("content").innerHTML = tableViewHtml;
                        $('a').click(onGameBottonClick);

                        function onGameBottonClick(event) {
                            var $target = $(event.target);
                            var $div = $target.closest('div');
                            var number = $div.data("number");
                            self.redirect("#/battle/" + number + "/" + sessionKey);
                        }

                    }, function (err) {
                        console.log(err.Message);
                    });
                });

                this.get("#/battle/:id/:sessionKey", function () {
                    data.battle(this.params["id"], this.params["sessionKey"], function (response) {
                        //var response = {
                        //    "gameId": 5,
                        //    "title": "Battle of the Titans",
                        //    "turn": 11,
                        //    "inTurn": "red",
                        //    "red": {
                        //        "nickname": "Doncho Minkov",
                        //        "units": [{
                        //            "id": 109,
                        //            "type": "warrior",
                        //            "attack": 8,
                        //            "armor": 3,
                        //            "hitPoints": 15,
                        //            "owner": "red",
                        //            "mode": "attack",
                        //            "position": { "x": 6, "y": 0 }
                        //        }, {
                        //            "id": 110,
                        //            "type": "warrior",
                        //            "attack": 8,
                        //            "armor": 3,
                        //            "hitPoints": 11,
                        //            "owner": "red",
                        //            "mode": "defend",
                        //            "position": { "x": 5, "y": 2 }
                        //        }, {
                        //            "id": 114,
                        //            "type": "ranger",
                        //            "attack": 8,
                        //            "armor": 1,
                        //            "hitPoints": 4,
                        //            "owner": "red",
                        //            "mode": "attack",
                        //            "position": { "x": 6, "y": 1 }
                        //        }]
                        //    },
                        //    "blue": {
                        //        "nickname": "Georgi Georgiev",
                        //        "units": [{
                        //            "id": 119,
                        //            "type": "warrior",
                        //            "attack": 8,
                        //            "armor": 3,
                        //            "hitPoints": 15,
                        //            "owner": "blue",
                        //            "mode": "defend",
                        //            "position": { "x": 2, "y": 0 }
                        //        }, {
                        //            "id": 121,
                        //            "type": "ranger",
                        //            "attack": 8,
                        //            "armor": 1,
                        //            "hitPoints": 10,
                        //            "owner": "blue",
                        //            "mode": "attack",
                        //            "position": { "x": 2, "y": 1 }
                        //        }]
                        //    }
                        //};

                        var tableTemplate = mustache.compile(document.getElementById("battle-field-template").innerHTML);
                        var tableView = controls.getTableView([response], 1);

                        var tableViewHtml = tableView.render(tableTemplate);

                        var field = [];
                        for (var count = 0; count < 81; count++) {
                            field[count] = {
                                id: 0,
                                owner: "none",
                                url: "Scripts/images/empty.png",
                                attack: 0,
                                armor: 0,
                                hitPoints: 0,
                                mode: "none"
                            }
                        }

                        //var selected = underscore.filter(response[0].red, 'units');

                        for (var count = 0; count < response.red.units.length; count++) {
                            var unit = response.red.units[count];
                            if (unit.mode == "defend") {
                                if (unit.type == "warrior") {
                                    unit.url = "Scripts/images/red-def-war.png";
                                }
                                else {
                                    unit.url = "Scripts/images/red-def-ran.png";
                                }
                            }
                            else {
                                if (unit.type == "warrior") {
                                    unit.url = "Scripts/images/red-non-war.png";
                                }
                                else {
                                    unit.url = "Scripts/images/red-non-ran.png";
                                }
                            }
                            field[9 * unit.position.y + unit.position.x] = {
                                id: unit.id,
                                owner: unit.owner,
                                url: unit.url,
                                attack: unit.attack,
                                armor: unit.armor,
                                hitPoints: unit.hitPoints,
                                mode: unit.mode
                            }
                        }

                        for (var count = 0; count < response.blue.units.length; count++) {
                            var unit = response.blue.units[count];
                            if (unit.mode == "defend") {
                                if (unit.type == "warrior") {
                                    unit.url = "Scripts/images/blue-def-war.png";
                                }
                                else {
                                    unit.url = "Scripts/images/blue-def-ran.png";
                                }
                            }
                            else {
                                if (unit.type == "warrior") {
                                    unit.url = "Scripts/images/blue-non-war.png";
                                }
                                else {
                                    unit.url = "Scripts/images/blue-non-ran.png";
                                }
                            }
                            field[9 * unit.position.y + unit.position.x] = {
                                id: unit.id,
                                owner: unit.owner,
                                url: unit.url,
                                attack: unit.attack,
                                armor: unit.armor,
                                hitPoints: unit.hitPoints,
                                mode: unit.mode
                            }
                        }

                        var fieldTemplate = mustache.compile(document.getElementById("units-template").innerHTML);
                        var fieldView = controls.getTableView(field, 9);

                        var fieldViewHtml = fieldView.render(fieldTemplate);

                        document.getElementById("content").innerHTML = tableViewHtml + fieldViewHtml;

                    }, function (err) {
                        console.log(err.Message);
                    });
                });
            });

            app.run("#/register-login");
            //app.run("#/open/" + sessionKey);
            //app.run("#/active/" + sessionKey);
            //app.run("#/battle/1/" + sessionKey);
	});
}());