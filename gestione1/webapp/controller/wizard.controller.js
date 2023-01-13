sap.ui.define(
  [
    "sap/ui/core/syncStyleClass",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/library",
    'sap/ui/model/json/JSONModel',
    "./BaseController"

  ],
  function (syncStyleClass,BaseController,CoreLibrary,JSONModel) {
    "use strict";
    var ValueState = CoreLibrary.ValueState,
            oData = {
                FilterSwitch1: true,
                FilterSwitch2: true,
                header1Visible: true,
                // HeaderNIWstep3Visible: true
            };

    return BaseController.extend("gestione1.controller.wizard", {

      onInit() {
         var oProprietà = new JSONModel(),
                    oInitialModelState = Object.assign({}, oData);
                oProprietà.setData(oInitialModelState);
                 this.getView().setModel(oProprietà);
                 this._iSelectedStepIndex = 0;
         this.controlSwitch();
         this.controlHeader();
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
        this.controlHeader();
        //this.controlPreNI();
        //this.controlHeader()
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
        this.controlHeader();
        // console.log(this._iSelectedStepIndex)
        //this.controlPreNI()
        //this.controlHeader()
        //this.getView().byId("tabGestNI").setVisible(false);
    },

    onOpenFragment : function () {

			if (!this.pFragment) {
				this.pFragment = this.loadFragment({
					name: "gestione1.fragment.anagrafica",
          controller: this
				}).then(function (oFragment) {
          this.getView().addDependent(oFragment);
          return oFragment;
        }.bind(this));
			} 
			this.pFragment.then(function(oFragment) {
				oFragment.open();
			}.bind(this));
		},

    onWarning2MessageBoxPress: function () {
      sap.m.MessageBox.warning("Servizio certificazione beneficiario avviato,in attesa di risposta, si prega di attendere", {
        title: "Procedura avvio richiesta creazione anagrafica beneficiario",                                    // default
        onClose: null,                                       // default
        styleClass: "",                                      // default
        actions: null,                 // default
        emphasizedAction: null,        // default
        initialFocus: null,                                  // default
        textDirection: sap.ui.core.TextDirection.Inherit     // default
    });
  },
    // onOpenFragmentBusyDialog: function () {
    //   load BusyDialog fragment asynchronously
    //   if (!this._pBusyDialog) {
    //     this._pBusyDialog = this.loadFragment({
    //       name: "gestione1.fragment.BusyDialog",
    //       controller: this
    //     }).then(function (oBusyDialog) {
    //       this.getView().addDependent(oBusyDialog);
    //       syncStyleClass("sapUiSizeCompact", this.getView(), oBusyDialog);
    //       return oBusyDialog;
    //     }.bind(this));
    //   }
  
    //   this._pBusyDialog.then(function(oBusyDialog) {
    //     oBusyDialog.open();
    //   }.bind(this));
    // },
     onCloseDialog : function () {
		 	this.byId("Anagrafica").close();
		},

  controlSwitch: function () {
                var oProprietà = this.getView().getModel();
                var stato= this.getView().byId("switch").getState();
                if (stato) {
                  oProprietà.setProperty("/FilterSwitch1", true)
                  oProprietà.setProperty("/FilterSwitch2", true)
                }
             else {
              oProprietà.setProperty("/FilterSwitch1", false)
                  oProprietà.setProperty("/FilterSwitch2", false)
             }
            },

            controlHeader: function () {
              var oProprietà = this.getView().getModel();
              this._oWizard = this.byId("CreateProductWizard");
        this._oSelectedStep = this._oWizard.getSteps()[this._iSelectedStepIndex];
        this._iSelectedStepIndex = this._oWizard.getSteps().indexOf(this._oSelectedStep);

        if (this._iSelectedStepIndex == 5  ) {
          oProprietà.setProperty("/header1Visible", true)
            
        } 
        else {
          oProprietà.setProperty("/header1Visible", false)
        }           
      }
              
            
    });
  }
);