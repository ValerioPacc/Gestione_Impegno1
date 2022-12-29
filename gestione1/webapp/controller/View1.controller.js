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
                var oFilter = this.getView().byId("filterID"),
				that = this;
				
			oFilter.addEventDelegate({
				"onAfterRendering": function(oEvent) {
					var oResourceBundle = that.getOwnerComponent().getModel("i18n").getResourceBundle();


					var oButton = oEvent.srcControl._oSearchButton;
					oButton.setText(oResourceBundle.getText("Avvio"));
				}
			});
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
