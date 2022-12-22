sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "./BaseController"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("gestione1.controller.registraIPE", {
        onInit() {

        },
        onBackButton: function () {
          this.getOwnerComponent().getRouter().navTo("Decreto");
      },
      navToWizard: function (oEvent) {
        this.getOwnerComponent().getRouter().navTo("wizard");
    },
      });
    }
  );
  