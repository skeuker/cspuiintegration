sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("tchibo.b2c.cspuiintegration.controller.UIIntegration", {

            onInit: function () {

                this.sBusinessPartner = jQuery.sap.getUriParameters().get("businessPartner");
                this.sClientId = jQuery.sap.getUriParameters().get("clientId");
                this.sCaseId = jQuery.sap.getUriParameters().get("caseId");

            },

            //apply filter to smarttable binding
            onBeforeRebindTable: function (oEvent) {

                //get business partner parameter
                this.sBusinessPartner = jQuery.sap.getUriParameters().get("businessPartner");

                //get binding parameter of the event
                var oBinding = oEvent.getParameter("bindingParams");

                //construct new business partner filter instance
                var oFilter = new sap.ui.model.Filter("BusinessPartner",
                    sap.ui.model.FilterOperator.EQ,
                    this.sBusinessPartner);

                //add business partner filter to smart table binding
                oBinding.filters.push(oFilter);

            },

            //initialize smart table 
            onSmartTableInitialise: function (oEvent) {

                //get smarttable instance
                var oTable = oEvent.getSource().getTable()

                //set single select mode
                oTable.setMode(sap.m.ListMode.SingleSelectMaster);

                //attach selection changed event
                oTable.attachSelectionChange(

                    //set handler function
                    function (oEvent) {
                        this.onCompleteButtonPress(oEvent);
                    },

                    //controller is event listner
                    this
                )

            },

            //on press of the 'Completed' button
            onCompleteButtonPress: function (oEvent) {

                //do Event Broker Callback
                this.getView().getModel('EventBrokerAPI').callFunction("/doEventBrokerCallback", {

                    //url parameters
                    urlParameters: {
                        "caseId": this.sCaseId,
                        "clientId": this.sClientId,
                        "businessPartner": this.sBusinessPartner
                    },

                    //on successful Event Broker Callback
                    success: function (oData, oResponse) {

                        //no further processing
                        return;

                    }.bind(this),

                    //on technical failure to do Callback
                    error: function (oError) {

                        var oText = JSON.parse(oError.responseText);
                        var sText = oError.message + ' with Error ' + oError.statusText;
                        alert(sText);

                    }.bind(this)

                });

            }

        });
    });
