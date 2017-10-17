TW.IDE.Widgets.toastr = function () {
  this.widgetIconUrl = function() {
      return  "../Common/extensions/toastr_ExtensionPackage/ui/toastr/toastr.ide.png";
  };

  this.widgetProperties = function () {
    return {
      "name": "Toastr",
      "description": "toastr",
      "category": ['Common'],
      "properties": {
        "Message": {
          "baseType": "STRING",
          "defaultValue": "Measurments have been updated, please refresh!",
          "isBindingTarget": true
        }
      }
    };
  };

  this.renderHtml = function () {

    var html = '';

    html += '<div class="widget-content widget-toastr"></div>';
    return html;
  };

  this.afterSetProperty = function (name, value) {
    return true;
  };
};
