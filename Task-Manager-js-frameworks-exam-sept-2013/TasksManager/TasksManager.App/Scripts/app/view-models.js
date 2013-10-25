/// <reference path="../libs/_references.js" />

window.vmFactory = (function () {
    var data = null;

    function getLoginViewModel(successCallback) {
        var viewModel = {
            username: "",
            password: "",
            email: "",
            login: function () {
                data.users.token(this.get("username"), this.get("password"), this.get("email"))
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					});
            },
            register: function () {
                data.users.register(this.get("username"), this.get("password"), this.get("email"))
                    .then(function () {
                        alert("Now you can log in");
                });
            },
            logout: function () {
                data.users.logout()
                    .then(function () {
                        alert("You are logged out");
                    });
            }
        };
        return kendo.observable(viewModel);
    };

    function getCurrentViewModel() {
        return data.appointments.current()
			.then(function (appointments) {
			    var viewModel = {
			        appointments: appointments,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getAllListsViewModel() {
        return data.lists.all()
			.then(function (lists) {
			    var viewModel = {
			        lists: lists,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getCreateListViewModel(successCallback) {
        var viewModel = {
            title: "title",
            create: function () {
                data.lists.newList(this.get("title"))
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					});
            }
        };
        return kendo.observable(viewModel);
    };

    function getListFullViewModel(id) {
        return data.lists.byId(id)
			.then(function (list) {
			    var viewModel = {
			        list: list,
			        change: function (event) {
			            var $target = $(event.target);
			            var todoId = $target.attr("data-todoId");
			            data.todos.change(parseInt(todoId));
			        },
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getAddTodoViewModel(id, successCallback) {
        var viewModel = {
            text: "text",
            add: function () {
                data.lists.todos(id, this.get("text"));
            }
        };
        return kendo.observable(viewModel);
    };

    function getAllAppointmentsViewModel() {
        return data.appointments.all()
			.then(function (appointments) {
			    var viewModel = {
			        appointments: appointments,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getCommingAppointmentsViewModel() {
        return data.appointments.comming()
			.then(function (appointments) {
			    var viewModel = {
			        appointments: appointments,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getTodayAppointmentsViewModel() {
        return data.appointments.today()
			.then(function (appointments) {
			    var viewModel = {
			        appointments: appointments,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getCreateAppointmentViewModel(successCallback) {
        var viewModel = {
            subject: "subject", 
            description: "description", 
            appointmentDate: "appointmentDate", 
            duration: "duration",
            create: function () {
                data.appointments.newAppointment(
                    this.get("subject"), this.get("description"), this.get("appointmentDate"), this.get("duration"))
					.then(function () {
					    if (successCallback) {
					        successCallback();
					    }
					});
            }
        };
        return kendo.observable(viewModel);
    };

    return {
        getLoginVM: getLoginViewModel,
        getCurrentVM: getCurrentViewModel,
        getAllListsVM: getAllListsViewModel,
        getListFullVM: getListFullViewModel,
        getCreateListVM: getCreateListViewModel,
        getAddTodoVM: getAddTodoViewModel,
        getAllAppointmentsVM: getAllAppointmentsViewModel,
        getCreateAppointmentVM: getCreateAppointmentViewModel,
        getCommingAppointmentsVM: getCommingAppointmentsViewModel,
        getTodayAppointmentsVM: getTodayAppointmentsViewModel,
        setPersister: function (persister) {
            data = persister
        }
    };
}());