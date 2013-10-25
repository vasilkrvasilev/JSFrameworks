/// <reference path="jquery-2.0.3.js" />
/// <reference path="class.js" />
define(["libs/class"], function (Class) {
	var controls = controls || {};
	var TableView = Class.create({
	    init: function (itemsSource, columns) {
	        if (!(itemsSource instanceof Array)) {
	            throw "The itemsSource of a TableView must be an array!";
	        }
	        this.itemsSource = itemsSource;
	        this.columns = columns;
	    },
	    render: function (template) {
	        var table = document.createElement("table");
	        table.border = 3;
	        var rest = this.itemsSource.length % this.columns;
	        for (var i = 0; i < this.itemsSource.length / this.columns; i++) {
	            var tableItem = document.createElement("tr");
	            for (var j = 0; j < this.columns; j++) {
	                var tableCell = document.createElement("td");
	                var item = this.itemsSource[i * this.columns + j];
	                tableCell.innerHTML = template(item);
	                tableItem.appendChild(tableCell);
	            }
	            table.appendChild(tableItem);
	        }

	        if (this.itemsSource.length == 0) {
	            var tableItem = document.createElement("tr");
	            var tableCell = document.createElement("td");
	            tableCell.innerHTML = template();
	            tableItem.appendChild(tableCell);
	            table.appendChild(tableItem);
	        }

	        return table.outerHTML;
	    }
	});

	controls.getTableView = function (itemsSource, columns) {
	    return new TableView(itemsSource, columns);
	}

	return controls;
});