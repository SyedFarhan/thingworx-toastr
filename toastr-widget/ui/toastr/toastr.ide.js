TW.IDE.Widgets.toastr = function () {
  this.widgetIconUrl = function() {
      return  "../Common/extensions/toastr/ui/toastr/toastr.ide.png";
  };

  this.widgetProperties = function () {
    return {
      "name": "Toastr",
      "description": "toastr",
      'iconImage': 'toastr.ide.png',
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
        'Width': {
            'defaultValue': 100,
            "isEditable":true,
            'description': TW.IDE.I18NController.translate('tw.validator-ide.properties.width.description')
        },
        'Height': {
            'defaultValue': 25,
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
      html += '<div class="widget-content widget-toastr"><table height="100%" width="100%"><tr><td valign="middle" align="center"><span>Toastr: Invisible on runtime</span></td></tr></table></div>';
      return html;

  };

  this.widgetEvents = function () {
      return {
          'Clicked': { 'warnIfNotBound': true }
    };
  };

  this.afterSetProperty = function (name, value) {
    return true;
  };
};
