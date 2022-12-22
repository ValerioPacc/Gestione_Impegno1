sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "./BaseController"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("gestione1.controller.Decreto", {
        onInit() {
          
        },
        navToRegistraIPE: function (oEvent) {
            this.getOwnerComponent().getRouter().navTo("registraIPE");
        },
        onBackButton: function () {
          this.getOwnerComponent().getRouter().navTo("View1");
      },
      
      });
      
    }
  );