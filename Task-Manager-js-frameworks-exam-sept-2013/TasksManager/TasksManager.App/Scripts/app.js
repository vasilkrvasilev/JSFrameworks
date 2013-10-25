/// <reference path="libs/_references.js" />


(function () {
    var appLayout =
		new kendo.Layout('<div id="main-content"></div><div id="current-content"></div>');
    var data = persisters.get("api/");
    vmFactory.setPersister(data);

    var router = new kendo.Router();

    router.route("/current", function () {
        viewsFactory.getCurrentView()
			.then(function (currentViewHtml) {
			    vmFactory.getCurrentVM()
				.then(function (currentVM) {
				    var view =
						new kendo.View(currentViewHtml,
						{ model: currentVM });
				    appLayout.showIn("#current-content", view);
				}, function (err) {
				    //...
				});
			});
    });

    router.route("/todo-lists", function () {
        viewsFactory.getAllListsView()
			.then(function (allListsViewHtml) {
			    vmFactory.getAllListsVM()
				.then(function (allListsVM) {
				    var view =
						new kendo.View(allListsViewHtml,
						{ model: allListsVM });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    //...
				});
			});
    });

    router.route("/", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }
        else {
            router.navigate("/current");
            router.navigate("/todo-lists");
        }
    });

    router.route("/home", function () {
        router.navigate("/");
    });

    router.route("/todo-lists/:id", function (id) {
        viewsFactory.getListFullView()
			.then(function (listFullViewHtml) {
			    vmFactory.getListFullVM(id)
				.then(function (listFullVM) {
				    var view =
						new kendo.View(listFullViewHtml,
						{ model: listFullVM });
				    appLayout.showIn("#main-content", view);
				    kendo.bind($("button"), listFullVM);
				}, function (err) {
				    //...
				});
			});
    });

    router.route("/todo-list/new", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }
        else {
            viewsFactory.getCreateListView()
                .then(function (createListViewHtml) {
                    var createListVM = vmFactory.getCreateListVM(
                        function () {
                            router.navigate("/todo-lists");
                        });
                    var view =
                        new kendo.View(createListViewHtml,
                        { model: createListVM });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    //...
                });
        }
    });

    router.route("/todo-add/:id", function (id) {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }
        else {
            viewsFactory.getAddTodoView()
                .then(function (addTodoViewHtml) {
                    var addTodoVM = vmFactory.getAddTodoVM(id);
                    var view =
                        new kendo.View(addTodoViewHtml,
                        { model: addTodoVM });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    //...
                });
        }
    });

    router.route("/appointments", function () {
        viewsFactory.getAppointmentsView()
			.then(function (appointmentsViewHtml) {
			    vmFactory.getAllAppointmentsVM()
				.then(function (allAppointmentsVM) {
				    var view =
						new kendo.View(appointmentsViewHtml,
						{ model: allAppointmentsVM });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    //...
				});
			});
    });

    router.route("/comming", function () {
        viewsFactory.getAppointmentsView()
			.then(function (appointmentsViewHtml) {
			    vmFactory.getCommingAppointmentsVM()
				.then(function (commingAppointmentsVM) {
				    var view =
						new kendo.View(appointmentsViewHtml,
						{ model: commingAppointmentsVM });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    //...
				});
			});
    });

    router.route("/today", function () {
        viewsFactory.getAppointmentsView()
			.then(function (appointmentsViewHtml) {
			    vmFactory.getTodayAppointmentsVM()
				.then(function (todayAppointmentsVM) {
				    var view =
						new kendo.View(appointmentsViewHtml,
						{ model: todayAppointmentsVM });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    //...
				});
			});
    });

    router.route("/appointment/new", function () {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }
        else {
            viewsFactory.getCreateAppointmentView()
                .then(function (createAppointmentViewHtml) {
                    var createAppointmentVM = vmFactory.getCreateAppointmentVM(
                        function () {
                            router.navigate("/appointments");
                        });
                    var view =
                        new kendo.View(createAppointmentViewHtml,
                        { model: createAppointmentVM });
                    appLayout.showIn("#main-content", view);
                }, function (err) {
                    //...
                });
        }
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

    router.route("/logout", function () {
        //debugger;
        //if (!data.users.currentUser()) {
        //    router.navigate("/");
        //}
        //else {
            viewsFactory.getLogoutView()
				.then(function (logoutViewHtml) {
				    var loginVm = vmFactory.getLoginVM();
				    var view = new kendo.View(logoutViewHtml,
						{ model: loginVm });
				    appLayout.showIn("#main-content", view);
				});
        //}
    });

    $(function () {
        appLayout.render("#app");
        router.start();
    });
}());