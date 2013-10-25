/// <reference path="jquery-2.0.3.js" />
/// <reference path="class.js" />
define(["libs/class"], function (Class) {
	var controls = controls || {};
	var ComboBox = Class.create({
	    init: function (itemsSource) {
	        this.itemsSource = itemsSource;
	    },
	    render: function (template) {
	        var listItem = document.createElement("li");
	        listItem.innerHTML = template(this.itemsSource);

	        return listItem;
	    }
	});

	controls.getComboBox = function (itemsSource) {
	    return new ComboBox(itemsSource);
	}

	return controls;
});