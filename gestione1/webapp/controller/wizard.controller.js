sap.ui.define(
  [
    "./BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/core/syncStyleClass"
  ],
  function (BaseController,Fragment,syncStyleClass) {
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

      },

      onBackButton: function () {
        this._oWizard = this.byId("CreateProductWizard");
        this._oSelectedStep = this._oWizard.getSteps()[this._iSelectedStepIndex];
        this._iSelectedStepIndex = this._oWizard.getSteps().indexOf(this._oSelectedStep);
        //console.log(this._iSelectedStepIndex)
        if (this._iSelectedStepIndex == 0) {
            //console.log(this.getOwnerComponent().getRouter().navTo("View1"))
            this._iSelectedStepIndex = 0
            this.getOwnerComponent().getRouter().navTo("View1");
            this.getView().byId("HeaderNIW").setVisible(false);
            return;
        }
        var oNextStep = this._oWizard.getSteps()[this._iSelectedStepIndex - 1];
        if (this._oSelectedStep && !this._oSelectedStep.bLast) {
            this._oWizard.goToStep(oNextStep, true);
        } else {
            this._oWizard.previousStep();
        }
        this._iSelectedStepIndex--
        this._oSelectedStep = oNextStep;
        // this.controlPreNI();
        // this.controlHeader()
    },

    onNextButton: function () {
        // this.onSearch()
        // this.onCommunicationPress()
        // var oModelP = new sap.ui.model.json.JSONModel("../mockdata/tabGestNI.json");
        // this.getView().setModel(oModelP, "HeaderNIW");
        this._oWizard = this.byId("CreateProductWizard");
        this._oSelectedStep = this._oWizard.getSteps()[this._iSelectedStepIndex];
        this._iSelectedStepIndex = this._oWizard.getSteps().indexOf(this._oSelectedStep);
        var oNextStep = this._oWizard.getSteps()[this._iSelectedStepIndex + 1];

        if (this._oSelectedStep && !this._oSelectedStep.bLast) {
            this._oWizard.goToStep(oNextStep, true);
        } else {
            this._oWizard.nextStep();
        }

        this._iSelectedStepIndex++;
        this._oSelectedStep = oNextStep;
        // console.log(this._iSelectedStepIndex)
        // this.controlPreNI()
        // this.controlHeader()
        //this.getView().byId("tabGestNI").setVisible(false);
    },

      navToAnagrafica: function (oEvent) {
        this.getOwnerComponent().getRouter().navTo("anagrafica");
    },

    onWarning2MessageBoxPress: function () {
      sap.m.MessageBox.warning("bbbbbbbbbbbbbbb", {
        title: "aaaaaaaa",                                    // default
        onClose: null,                                       // default
        styleClass: "",                                      // default
        actions: null,                 // default
        emphasizedAction: null,        // default
        initialFocus: null,                                  // default
        textDirection: sap.ui.core.TextDirection.Inherit     // default
    });
  },

  onOpenFragmentBusyDialog: function () {
    // load BusyDialog fragment asynchronously
    if (!this._pBusyDialog) {
      this._pBusyDialog = Fragment.load({
        name: "gestione1.fragment.BusyDialog",
        controller: this
      }).then(function (oBusyDialog) {
        this.getView().addDependent(oBusyDialog);
        syncStyleClass("sapUiSizeCompact", this.getView(), oBusyDialog);
        return oBusyDialog;
      }.bind(this));
    }

    this._pBusyDialog.then(function(oBusyDialog) {
      oBusyDialog.open();
    }.bind(this));
  }




    });
  }
);


