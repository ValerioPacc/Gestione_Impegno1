sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "./BaseController"
  ],
  function (BaseController) {
    "use strict";

    return BaseController.extend("gestione1.controller.wizard", {

      onInit() {
        var oModel = new sap.ui.model.json.JSONModel("../mock/comboBox.json");
        this.getView().setModel(oModel, "comboBox");
        
      },

      onListSelect: function (event) {

        // console.log(event.getSource().getSelectedItem().getKey()); // works ok
        // var path = event.getSource().getSelectedItem().getBindingContext().getPath(); // Fails
        // console.log("Path=" + path)

        // var oSelectedItemPath = oEvent.getSource().getParent().getBindingContextPath();
        // var oSelectedItem = this.getOwnerComponent().getModel("comboBox").getObject(oSelectedItemPath);

        // console.log(oSelectedItem);

        var selectedItem = this.getView().byId('comboBox').getSelectedItem().getText(); console.log("text item: " + this.getView().byId('comboBox').getSelectedItem().getText())

        var oModel = this.getOwnerComponent().getModel("comboBox");

        // var text = oModel.getProperty(selectedItem)
        // console.log("You selected " + text.Modalita_pagamento)

        var setReqField = this.getView().byId('labelCS').setRequired(true);
        console.log("text item: " + this.getView().byId('labelCS').setRequired(true))
        // var fieldReq = oModel.getProperty(setReqField)
        // console.log("field set required: "+fieldReq)




      }
    });
  }
);