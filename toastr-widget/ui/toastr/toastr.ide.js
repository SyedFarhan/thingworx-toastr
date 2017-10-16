TW.IDE.Widgets.toastr = function () {
  this.widgetIconUrl = function() {
      return  "../Common/extensions/toastr_ExtensionPackage/ui/toastr/toastr.ide.png";
  };

  this.widgetProperties = function () {
    return {
      "name": "Hello, World!",
      "description": "An example widget.",
      "category": ['Common'],
      "properties": {
        "Salutation": {
          "baseType": "STRING",
          "defaultValue": "Hello, World!",
          "isBindingTarget": true
        }
      }
    };
  };

  this.renderHtml = function () {
    return "<div class=\"widget-content widget-toastr\">" +
             "<span class=\"salutation\">" + this.getProperty("Salutation") + "</span>" +
           "</div>";
  };

  this.afterSetProperty = function (name, value) {
    return true;
  };
};
