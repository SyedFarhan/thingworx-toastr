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
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

  this.renderHtml = function () {
    TW.log.info('# html: ' + html.toString());
    return '<div class="widget-content widget-toastr"></div>';
  };
  var getTitle = this.getProperty("Title");
  var getMessage = this.getProperty("Message");
  this.afterRender = function () {·
    toastr.info(this.getProperty("Title"),this.getProperty("Message"));
  };

};
