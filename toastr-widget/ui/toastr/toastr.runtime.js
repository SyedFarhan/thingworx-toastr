TW.Runtime.Widgets.toastr = function () {
  var thisWidget = this;

  toastr.options = {
  "closeButton": this.getProperty("closeButton"),
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": this.getProperty("preventDuplicates"),
  "onclick": null,
  "showDuration": this.getProperty("showDuration"),
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
    toastr.info('<div class="toastr-trio"><span id="toastr-span">' + message + '</span> <button id="toastr-refresh" type="button" class="btn clear">Refresh<i class="fa fa-refresh" aria-hidden="true"></i></button></div>');
    $('#' + thisWidget.jqElementId + '-refresh').bind('click', function (e) {
      thisWidget.jqElement.triggerHandler('Clicked');
      e.preventDefault();
      toastr.remove();
      toastr.clear();
  });
  };

  this.serviceInvoked = function (serviceName) {

    var widgetReference = this;
    if(serviceName === "ShowToastr") {
      this.showToastr(widgetReference);
    }
  };

  this.updateProperty = function (updatePropertyInfo) {
    if(updatePropertyInfo.TargetProperty) {
      this.setProperty("Message",updatePropertyInfo.SinglePropertyValue);
    }
  };

  this.beforeDestroy = function() {
  };


};
