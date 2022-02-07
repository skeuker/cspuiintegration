/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"tchibob2c./cspuiintegration/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
