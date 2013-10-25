/// <reference path="libs/_references.js" />


(function () {
    var appLayout =
		new kendo.Layout('<div id="main-content"></div>');
    var data = persisters.get("api/");
    vmFactory.setPersister(data);

    var router = new kendo.Router();

    router.route("/home", function () {
        viewsFactory.getAccountHomeView()
			.then(function (accountHomeViewHtml) {
			    vmFactory.getAccountHomeVM()
				.then(function (accountHomeVM) {
				    var view =
						new kendo.View(accountHomeViewHtml,
						{ model: accountHomeVM });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    //...
				});
			});
    });

    router.route("/", function () {
        router.navigate("/home");
    });

    router.route("/about", function () {
        router.navigate("/home");
    });

    router.route("/user/accounts", function () {
        //if (!data.users.currentUser()) {
        //    router.navigate("/login");
        //}
        //else {
            viewsFactory.getUserAccountsView()
                .then(function (userAccountsViewHtml) {
                    vmFactory.getUserAccountsVM()
                    .then(function (userAccountsVM) {
                        var view =
                            new kendo.View(userAccountsViewHtml,
                            { model: userAccountsVM });
                        appLayout.showIn("#main-content", view);
                    }, function (err) {
                        //...
                    });
                });
        //}
    });

    router.route("/account/logs/:id", function (id) {
        //if (!data.users.currentUser()) {
        //    router.navigate("/login");
        //}
        //else {
            viewsFactory.getAccountLogsView()
                .then(function (accountLogsViewHtml) {
                    vmFactory.getAccountLogsVM(id)
                    .then(function (accountLogsVM) {
                        var view =
                            new kendo.View(accountLogsViewHtml,
                            { model: accountLogsVM });
                        appLayout.showIn("#main-content", view);
                    }, function (err) {
                        //...
                    });
                });
        //}
    });

    router.route("/account/money/:id", function (id) {
        //if (!data.users.currentUser()) {
        //    router.navigate("/login");
        //}
        //else {
            viewsFactory.getAccountDepositWithdrawView(id)
                .then(function (accountDepositWithdrawViewHtml) {
                    var accountDepositWithdrawVM = vmFactory.getAccountDepositWithdrawVM(id,
                        function (id) {
                            router.navigate("/account/logs/" + id);
                        });
                    var view =
                        new kendo.View(accountDepositWithdrawViewHtml,
                        { model: accountDepositWithdrawVM });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    //...
            });
        //}
    });

    router.route("/login", function () {
        debugger;
        if (data.users.currentUser()) {
            router.navigate("/");
        }
        else {
            viewsFactory.getLoginView()
				.then(function (loginViewHtml) {
				    var loginVm = vmFactory.getLoginVM(
						function () {
						    router.navigate("/");
						});
				    var view = new kendo.View(loginViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				});
        }
    });

    //only for registered users
    router.route("/special", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }
    });

    $(function () {
        appLayout.render("#app");
        router.start();
    });
}());