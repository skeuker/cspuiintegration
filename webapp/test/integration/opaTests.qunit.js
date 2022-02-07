/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["tchibo/b2c/cspuiintegration/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
