sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,Filter,FilterOperator) {
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
               
            },
            navToDecreto: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo("Decreto");
            },
           
            onSearch: function (oEvent) {
                var that = this;
                var datiGI = [];

                // var abc=this.getView().byId("filterbar").getAllFilterItems();

                var bindingInfo = ""
                var path = ""

                var numFilter = oEvent.getParameters().selectionSet.length;

                for (let i = 0; i < numFilter; i++) {
                    
                    bindingInfo = "items"
                    path = oEvent.getParameters().selectionSet[i].getBindingInfo(bindingInfo)
                    if (path == undefined) {
                        bindingInfo = "suggestionItems"
                        path = oEvent.getParameters().selectionSet[i].getBindingInfo(bindingInfo)
                    }
                    var filtro = oEvent.getParameters().selectionSet[i]
                    if (filtro) {
                        if (filtro.mProperties.dateValue instanceof Date || !isNaN(filtro.mProperties.dateValue)) {
                            if (i == 11) {
                                if(oEvent.getParameters().selectionSet[11].mProperties.value!= ''){
                                datiGI.push(new Filter({
                                    path: "DataDecreto",
                                    operator: FilterOperator.BT,
                                    value1: oEvent.getParameters().selectionSet[11].mProperties.value,
                                    value2: oEvent.getParameters().selectionSet[12].mProperties.value
                                }));
                            }
                            }
                            if (i == 17) {
                                if(oEvent.getParameters().selectionSet[17].mProperties.value!= ''){
                                datiGI.push(new Filter({
                                    path: "DataFirma",
                                    operator: FilterOperator.BT,
                                    value1: oEvent.getParameters().selectionSet[17].mProperties.value,
                                    value2: oEvent.getParameters().selectionSet[18].mProperties.value
                                }));
                            }
                            }
                            if (i == 19) {
                                if(oEvent.getParameters().selectionSet[19].mProperties.value!= ''){
                                datiGI.push(new Filter({
                                    path: "DataProtocolloAMM",
                                    operator: FilterOperator.BT,
                                    value1: oEvent.getParameters().selectionSet[19].mProperties.value,
                                    value2: oEvent.getParameters().selectionSet[20].mProperties.value
                                }));
                            }
                            }
                            if (i == 23) {
                                if(oEvent.getParameters().selectionSet[23].mProperties.value!= ''){
                                datiGI.push(new Filter({
                                    path: "DataProtocolloRag",
                                    operator: FilterOperator.BT,
                                    value1: oEvent.getParameters().selectionSet[23].mProperties.value,
                                    value2: oEvent.getParameters().selectionSet[24].mProperties.value
                                }));
                            }
                            }
                        }
                        else if(oEvent.getParameters().selectionSet[i].mProperties.value != ''){
                            datiGI.push(new Filter({
                                path: path.sorter.sPath,
                                operator: FilterOperator.EQ,
                                value1: filtro.getValue()                           
                            }));
                         //datiGI.push("?$filter= "+path.sorter.sPath+" eq '" + filtro.getValue() + "'");
                        }
                        else if(i==12 || i==18 || i==20 || i==24){
                            continue
                        }
                    }
                }
                //console.log(datiGI)
                
                var that = this;
                var oMdl = new sap.ui.model.json.JSONModel();
                this.getView().getModel().read("/DecretoImpegnoSet", {
                    filters: datiGI,
                    urlParameters: "",
                    success: function (data) {
                        oMdl.setData(data.results);
                        that.getView().getModel("temp").setProperty('/DecretoImpegnoSet', data.results)
                    },
                    error: function (error) {
                        //that.getView().getModel("temp").setProperty(sProperty,[]);
                        //that.destroyBusyDialog();
                        var e = error;
                    }
                });

                // var oMdl = new sap.ui.model.json.JSONModel();
                // var that = this;
                // var sUrl="/sap/opu/odata/sap/ZS4_NOTEIMPUTAZIONI_SRV/HeaderNISet"
                // if(datiGI.length!=0){
                //     var sUrl="/sap/opu/odata/sap/ZS4_NOTEIMPUTAZIONI_SRV/HeaderNISet"+ datiGI
                // }

                // var aData = jQuery.ajax({
                //     type: "GET",
                //     contentType: "application/json",
                //     url:sUrl,
                //     dataType: "json",
                //     data: JSON.stringify(datiGI),
                //     async: false,
                //     success: function (data, textStatus, jqXHR) {
                //         // resolve(data.value)
                //         //console.log(data)
                //         oMdl.setData(data.d.results);
                //         that.getView().getModel("temp").setProperty('/HeaderNISet', data.d.results)

                //         //console.log(data.d.results)
                //     },
                //     error: function (error) {
                //         var e = error;
                //     }
                // });
                // console.log(oMdl)

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

    
     
