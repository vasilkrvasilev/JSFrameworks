/// <reference path="jquery-2.0.3.js" />
/// <reference path="class.js" />
var controls = controls || {};
(function (c) {
	var TableView = Class.create({
	    init: function (itemsSource, columns) {
			if (!(itemsSource instanceof Array)) {
				throw "The itemsSource of a ListView must be an array!";
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

			return table.outerHTML;
		}
	});

	c.getTableView = function (itemsSource, columns) {
	    return new TableView(itemsSource, columns);
	}
}(controls || {}));