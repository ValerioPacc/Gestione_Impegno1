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
            navToDettagliDE: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo("dettagliDE");
            },

            onRowSelectionChange: function (oEvent) {
                this.getView().byId("PreimpostazioneNI").setEnabled(false);
            },

            // onExport: function () {
            //     //console.log("onExport")
            //     var aCols, oRowBinding, oSettings, oSheet, oTable;

            //     if (!this._oTable) {
            //         this._oTable = this.byId('DecretoGI');
            //     }

            //     oTable = this._oTable;


            //     // var oSelectedItemPath = oEvent.getSource().getParent().getBindingContextPath();
            //     // var oSelectedItem = this.getOwnerComponent().getModel("booksMdl").getObject(oSelectedItemPath);

            //     //console.log("table1: " + oTable)
            //     oRowBinding = oTable.getBinding('items');
            //     //console.log("row binding: " + oRowBinding);
            //     aCols = this.createColumnConfig();

            //     oSettings = {
            //         workbook: {
            //             columns: aCols,
            //             hierarchyLevel: 'Level'
            //         },
            //         dataSource: oRowBinding,
            //         fileName: 'Esportazione GI',
            //         worker: false // We need to disable worker because we are using a MockServer as OData Service
            //     };

            //     oSheet = new sap.ui.export.Spreadsheet(oSettings);
            //     oSheet.build().finally(function () {
            //         oSheet.destroy();
            //     });
            // },
        });
    });

    
     
