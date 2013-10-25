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

    function getUserAccountsView() {
        return getTemplate("user-accounts");
    }

    function getAccountHomeView() {
        return getTemplate("account-home");
    }

    function getAccountLogsView() {
        return getTemplate("account-logs");
    }

    function getAccountDepositWithdrawView() {
        return getTemplate("deposit-withdraw-form");
    }

    return {
        getLoginView: getLoginView,
        getUserAccountsView: getUserAccountsView,
        getAccountHomeView: getAccountHomeView,
        getAccountLogsView: getAccountLogsView,
        getAccountDepositWithdrawView: getAccountDepositWithdrawView
    };
}());