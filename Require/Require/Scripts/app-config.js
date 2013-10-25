/// <reference path="libs/require.js" />
require.config({
	paths: {
		jquery: "libs/jquery-2.0.3",
		rsvp: "libs/rsvp.min",
		httpRequester: "libs/http-requester",
		mustache: "libs/mustache"
	}
});

require(["jquery", "mustache", "app/data-persister", "app/controls"], function ($, mustache, data, controls) {
	data.students()
		.then(function (people) {
			
		    var tableTemplate = mustache.compile(document.getElementById("students-template").innerHTML);
		    var tableView = controls.getTableView(people, 2);

		    var tableViewHtml = tableView.render(tableTemplate);

		    document.getElementById("content").innerHTML = tableViewHtml;

		    function handler(event) {
		        var $target = $(event.target);
		        if ($target.is("a")) {
		            var number = $target.data("number");
		            data.marks(number)
                        .then(function (studentMarks) {
                            var personTemplate;
                            if (studentMarks.length > 0) {
                                personTemplate = mustache.compile(document.getElementById("person-template").innerHTML);
                            }
                            else {
                                personTemplate = mustache.compile(document.getElementById("noperson-template").innerHTML);
                            }

                            var personView = controls.getTableView(studentMarks, 1);

                            var personViewHtml = personView.render(personTemplate);

                            document.getElementById("content").innerHTML = personViewHtml;
                        })
		        }
		    }

		    $("a").click(handler);

		}, function (err) {
			console.error(err);
		});
});