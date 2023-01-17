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
            onSearch: function (oEvent) {
                    var oMdl = new sap.ui.model.json.JSONModel();
                var that = this;
                var aData = jQuery.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: "/sap/opu/odata/sap/ZODATACOSP_DECRETO_IMPEGNO_SRV/DecretoImpegnoSet",
                    dataType: "json",
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        // resolve(data.value)
                        //console.log(data)
                        oMdl.setData(data.d.results);
                        that.getView().getModel("temp").setProperty('/DecretoImpegnoSet', data.d.results)

                        //console.log(data.d.results)
                    },
                    error: function (error) {
                        var e = error;
                    }
                });
                //console.log(oMdl)

                this.getOwnerComponent().setModel(oMdl, "DecretoGI");
                //sap.ui.getCore().TableModel = oMdlW;
                // this.getView().byId("Esporta").setEnabled(true);
                // this.getView().byId("PreimpostazioneNI").setEnabled(true);
            },

            navToWizard: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo("wizard");
            },

            onRowSelectionChange: function (oEvent) {
                this.getView().byId("PreimpostazioneNI").setEnabled(false);
            },
        });
    });

    
     
