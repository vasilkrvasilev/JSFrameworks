/// <reference path="require.js" />
/// <reference path="jquery-2.0.3.js" />
/// <reference path="rsvp.min.js" />

define(["jquery"], function ($) {
    function getJSON(serviceUrl, resolve, reject) {
        jQuery.ajax({
            url: serviceUrl,
            type: "GET",
            dataType: "json",
            success: function (data) {
                resolve(data);
            },
            error: function (err) {
                reject(err);
            }
        });
    }

    function postJSON(serviceUrl, data, resolve, reject) {
        jQuery.ajax({
            url: serviceUrl,
            dataType: "json",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data) {
                resolve(data);
            },
            error: function (err) {
                reject(err);
            }
        });
    }

	return {
		getJSON: getJSON,
		postJSON: postJSON
	}
});