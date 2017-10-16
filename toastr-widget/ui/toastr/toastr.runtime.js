TW.Runtime.Widgets.helloWorld = function () {
  var valueElem;
  
  this.renderHtml = function () {
    return "<div class=\"widget-content widget-helloWorld\">" +
             "<span class=\"salutation\">" + this.getProperty("Salutation") + "</span>" +
           "</div>";
  };
  
  this.afterRender = function () {
    valueElem = this.jqElement.find(".salutation");
    valueElem.text(this.getProperty("Salutation"));
  };
  
  this.updateProperty = function (updatePropertyInfo) {
    if (updatePropertyInfo.TargetProperty === "Salutation") {
      valueElem.text(updatePropertyInfo.SinglePropertyValue);
      this.setProperty("Salutation", updatePropertyInfo.SinglePropertyValue);
    }
  };
};
