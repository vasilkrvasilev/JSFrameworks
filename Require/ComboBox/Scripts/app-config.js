/// <reference path="../libs/jquery-2.0.3.js" />
/// <reference path="app/controls.js" />
/// <reference path="libs/require.js" />
require.config({
    paths: {
        jquery: "libs/jquery-2.0.3",
        mustache: "libs/mustache"
    }
});

require(["jquery", "mustache", "app/controls"], function ($, mustache, controls) {
    
    var people = [
        { id: 1, name: "Doncho Minkov", age: 18, avatarUrl: "Scripts/app/sql.png" },
        { id: 2, name: "Georgi Georgiev", age: 19, avatarUrl: "Scripts/app/sql.png" }];

    var $list = $('<ul></ul>');
    $list.click(handler);
    for (var count = 0; count < people.length; count++) {
        var listTemplate = mustache.compile(document.getElementById("person-template").innerHTML);
        var comboBox = controls.getComboBox(people[count]);
        var comboBoxHtml = comboBox.render(listTemplate);
        if (count == 0) {
            comboBoxHtml.className = "selected";
        }
        else {
            comboBoxHtml.className = "non-selected";
        }

        $list.append(comboBoxHtml);
    }

    $('#content').append($list);
    $(".non-selected").hide();

	function handler(event) {
		var $target = $(event.target);
		var $li = $target.closest('li');
		var selected = $li.attr("class");
		if (selected == "selected") {
		    $("li").show();
		    $("li").attr("class", "non-selected");
		}
		else {
		    $li.removeClass();
		    $li.attr("class", "selected");
		    $(".non-selected").hide();
		}
	}
});