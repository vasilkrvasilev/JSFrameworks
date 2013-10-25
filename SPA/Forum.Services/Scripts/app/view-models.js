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

    function getPostsViewModel() {
        return data.posts.all()
			.then(function (posts) {
			    var viewModel = {
			        posts: posts,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getPostsTagsViewModel(tags) {
        return data.posts.byTags(tags)
			.then(function (posts) {
			    var viewModel = {
			        posts: posts,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getPostFullViewModel(id) {
        return data.posts.byId(id)
			.then(function (post) {
			    var viewModel = {
			        post: post,
			        message: ""
			    };
			    return kendo.observable(viewModel);
			});
    }

    function getPostCommentViewModel(postId, successCallback) {
        var viewModel = {
            text: "text",
            postComment: function () {
                data.posts.comment(postId, this.get("text"))
					.then(function () {
					    if (successCallback) {
					        successCallback(postId);
					    }
					});
            }
        };
        return kendo.observable(viewModel);
    };

    return {
        getLoginVM: getLoginViewModel,
        getPostsVM: getPostsViewModel,
        getPostsTagsVM: getPostsTagsViewModel,
        getPostFullVM: getPostFullViewModel,
        getPostCommentVM: getPostCommentViewModel,
        setPersister: function (persister) {
            data = persister
        }
    };
}());