TW.Runtime.Widgets.toastr = function () {


  toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": 0,
  "extendedTimeOut": 0,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut",
  "tapToDismiss": false
}

  this.renderHtml = function () {
    TW.log.info('# html: ' + html.toString());
    return '<div class="widget-content widget-toastr"></div>';
  };

  this.showToastr = function(widgetReference) {
    var message = widgetReference.getProperty('Message');
    //console.log('statusMsg::showMessage ' + type + ', ' + message);
    toastr.info(message);
  };

  this.serviceInvoked = function (serviceName) {

    var widgetReference = this;
    if(serviceName === "ShowToastr") {
      this.showToastr(widgetReference);
    }
  }

  //this.afterRender = function () {
  //  toastr.info(this.getProperty("Message"));
  // };

  this.updateProperty = function (updatePropertyInfo) {
    if(updatePropertyInfo.TargetProperty) {
      this.setProperty("Message",updatePropertyInfo.SinglePropertyValue);
    }
  };



};
