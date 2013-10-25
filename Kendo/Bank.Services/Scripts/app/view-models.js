/// <reference path="../libs/_references.js" />

window.vmFactory = (function () {
    var data = null;

    function getLoginViewModel(successCallback) {
        var viewModel = {
            username: "DonchoMinkov",
            password: "123456q",
            login: function () {
                data.users.login(this.get("username"), this.get("password"))
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					});
            },
            register: function () {
                data.users.register(this.get("username"), this.get("password"))
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					});
            }
        };
        return kendo.observable(viewModel);
    };

    function getUserAccountsViewModel() {
        return data.users.accounts()
			.then(function (user) {
			    debugger;
			    var viewModel = {
			        user: user,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getAccountHomeViewModel() {
        return data.accounts.home()
			.then(function (model) {
			    var viewModel = {
			        model: model,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getAccountLogsViewModel(id) {
        return data.accounts.logs(id)
			.then(function (account) {
			    var viewModel = {
			        account: account,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getAccountDepositWithdrawViewModel(id, successCallback) {
        var viewModel = {
            amount: "0",
            deposit: function () {
                data.accounts.deposit(id, this.get("amount"))
					.then(function () {
					    if (successCallback) {
					        successCallback(id);
					    }
					});
            },
            withdraw: function () {
                data.accounts.withdraw(id, this.get("amount"))
					.then(function () {
					    if (successCallback) {
					        successCallback(id);
					    }
					});
            }
        };
        return kendo.observable(viewModel);
    };

    return {
        getLoginVM: getLoginViewModel,
        getUserAccountsVM: getUserAccountsViewModel,
        getAccountHomeVM: getAccountHomeViewModel,
        getAccountLogsVM: getAccountLogsViewModel,
        getAccountDepositWithdrawVM: getAccountDepositWithdrawViewModel,
        setPersister: function (persister) {
            data = persister
        }
    };
}());