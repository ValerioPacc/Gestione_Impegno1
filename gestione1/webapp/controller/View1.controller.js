sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController) {
        "use strict";

        return BaseController.extend("gestione1.controller.View1", {
            onInit: function () {
                // var oModel = new sap.ui.model.json.JSONModel("../mockdata/tabPreimpNI.json");
                // this.getView().setModel(oModel, "tabPreimpNI");

            },
            navToDecreto: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo("Decreto");
            },
            navToDettagliDE: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo("dettagliDE");
            },

        });
    });
