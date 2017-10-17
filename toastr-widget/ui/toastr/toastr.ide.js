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
          "defaultValue": "",
          "isBindingTarget": true
        },
        "closeButton": {
          "baseType": "BOOLEAN",
          "isEditable":true,
          "defaultValue": true,
          "isBindingTarget": false
        },
        "preventDuplicates": {
          "baseType": "BOOLEAN",
          "isEditable":true,
          "defaultValue": true,
          "isBindingTarget": false
        },
        "showDuration": {
          "baseType": "NUMBER",
          "isEditable":true,
          "defaultValue": 500,
          "isBindingTarget": false
        },
        "tapToDismiss": {
          "baseType": "BOOLEAN",
          "isEditable":true,
          "defaultValue": false,
          "isBindingTarget": false
        },
        'Width': {
            'defaultValue': 50,
            "isEditable":true,
            'description': TW.IDE.I18NController.translate('tw.validator-ide.properties.width.description')
        },
        'Height': {
            'defaultValue': 50,
            "isEditable":true,
            'description': TW.IDE.I18NController.translate('tw.validator-ide.properties.height.description')
        }
      }
    };
  };

  this.widgetServices = function () {
      return {
          'ShowToastr': { 'warnIfNotBound': true }
      };
  };

  this.renderHtml = function () {

    var html = '';

    html += '<div class="widget-content widget-toastr" height="25px" width="25px"></div>';
    return html;
  };

  this.afterSetProperty = function (name, value) {
    return true;
  };
};
