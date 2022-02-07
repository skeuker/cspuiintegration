/*global QUnit*/

sap.ui.define([
	"tchibob2c./cspuiintegration/controller/UIIntegration.controller"
], function (Controller) {
	"use strict";

	QUnit.module("UIIntegration Controller");

	QUnit.test("I should test the UIIntegration controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
