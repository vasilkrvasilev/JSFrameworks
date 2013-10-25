/// <reference path="../libs/_references.js" />


window.viewsFactory = (function () {
    var rootUrl = "Scripts/partials/";

    var templates = {};

    function getTemplate(name) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            if (templates[name]) {
                resolve(templates[name])
            }
            else {
                $.ajax({
                    url: rootUrl + name + ".html",
                    type: "GET",
                    success: function (templateHtml) {
                        templates[name] = templateHtml;
                        resolve(templateHtml);
                    },
                    error: function (err) {
                        reject(err)
                    }
                });
            }
        });
        return promise;
    }

    function getLoginView() {
        return getTemplate("login-form");
    }

    function getLogoutView() {
        return getTemplate("logout-form");
    }

    function getCurrentView() {
        return getTemplate("current");
    }

    function getAllListsView() {
        return getTemplate("allLists");
    }

    function getListFullView() {
        return getTemplate("listFull");
    }

    function getCreateListView() {
        return getTemplate("createList-form");
    }

    function getAddTodoView() {
        return getTemplate("addTodo-form");
    }

    function getAppointmentsView() {
        return getTemplate("appointments");
    }

    function getCreateAppointmentView() {
        return getTemplate("createAppointment-form");
    }

    return {
        getLoginView: getLoginView,
        getLogoutView: getLogoutView,
        getCurrentView: getCurrentView,
        getAllListsView: getAllListsView,
        getListFullView: getListFullView,
        getCreateListView: getCreateListView,
        getAddTodoView: getAddTodoView,
        getAppointmentsView: getAppointmentsView,
        getCreateAppointmentView: getCreateAppointmentView
    };
}());