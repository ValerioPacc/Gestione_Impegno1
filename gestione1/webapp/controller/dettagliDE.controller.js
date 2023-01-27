sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
        "./BaseController"

    ],
    function(BaseController, MessageBox) {
      "use strict";
  
      return BaseController.extend("gestione1.controller.dettagliDE", {
        onInit() {
          
        },

        onSelect: function (oEvent) {
          var key = oEvent.getParameters().key;
          if (key === "ListaIPE") {
              // var oProprietà = this.getView().getModel();
              // oProprietà.setProperty("/TableVisible", true)
              this.getView().byId("idIconTabBar").destroyContent()

          }
        },

        onConfirmationCancelMessageBoxPress: function () {
          MessageBox.confirm("Vuoi cancellare il Decreto in provvisorio?", {
            actions: ["OK", "Annulla"],
            emphasizedAction: "Annulla",
            title:"Cancellazione",
            onClose: function (sAction) {
             
              if (sAction === "OK") {
                MessageBox.success("Decreto cancellato con successo");
              }
              else{
                sAction.close();
              }
            }
          })
        },

        navToRegistraIPE: function (oEvent) {
          this.getOwnerComponent().getRouter().navTo("registraIPE");
      },

      navToWizard: function (oEvent) {
        this.getOwnerComponent().getRouter().navTo("wizard");
    },

        onBackButton: function () {
          this.getOwnerComponent().getRouter().navTo("View1");
      },
      });
      
    }
  );
  