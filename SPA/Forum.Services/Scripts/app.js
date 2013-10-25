/// <reference path="libs/_references.js" />


(function () {
    var appLayout =
		new kendo.Layout('<div id="main-content"></div>');
    var data = persisters.get("api/");
    vmFactory.setPersister(data);

    var router = new kendo.Router();

    router.route("/posts", function () {
        viewsFactory.getPostsView()
			.then(function (postsViewHtml) {
			    vmFactory.getPostsVM()
				.then(function (postsVM) {
				    var view =
						new kendo.View(postsViewHtml,
						{ model: postsVM });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    //...
				});
			});
    });

    router.route("/", function () {
        router.navigate("/posts");
    });

    router.route("/home", function () {
        router.navigate("/posts");
    });

    router.route("/post/:postId", function (postId) {
        //console.log(id);
        //$("#content").html("item - id - " + id);
        viewsFactory.getPostFullView()
			.then(function (postFullViewHtml) {
			    vmFactory.getPostFullVM(postId)
				.then(function (postFullVM) {
				    var view =
						new kendo.View(postFullViewHtml,
						{ model: postFullVM });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    //...
				});
			});
    });

    router.route("/posts/:tags", function (tags) {
        viewsFactory.getPostsView()
			.then(function (postsViewHtml) {
			    vmFactory.getPostsTagsVM()
				.then(function (postsTagsVM) {
				    var view =
						new kendo.View(postsViewHtml,
						{ model: postsTagsVM });
				    appLayout.showIn("#main-content", view);
				}, function (err) {
				    //...
				});
			});
    });

    router.route("/post/:postId/comment", function (postId) {
        if (!data.users.currentUser()) {
            router.navigate("/login");
        }
        else {
            viewsFactory.getPostCommentView()
                .then(function (postCommentViewHtml) {
                    var postCommentVM = vmFactory.getPostCommentVM(postId,
                        function (postId) {
                            router.navigate("/post/" + postId);
                        });
                    var view =
                        new kendo.View(postCommentViewHtml,
                        { model: postCommentVM });
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