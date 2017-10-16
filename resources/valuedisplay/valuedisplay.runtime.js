/*global TW */

(function () {
    var addedDefaultValueDisplayStyles = false,
        renderer,
        widthToUse,
        heightToUse,
        hasImage;

    TW.Runtime.Widgets.valuedisplay = function () {

        var thisWidget = this;
        var valueWrapperElement;
        var valueDisplayContainer;
        var noValueWrapperElement;

        var bindToolTip = function () {
            toolTipField = thisWidget.getProperty('ToolTipField');
            if($.trim(toolTipField) !== ''){
                $("#" + thisWidget.jqElementId).tipTip({maxWidth: "auto",
                                                        edgeOffset: 10,
                                                        content: function() {
                                                            return thisWidget.getProperty('ToolTipField');
                                                        }});
                // TW-11257 remove conflicting renderer title when binding tooltip
                thisWidget.jqElement.find('.renderer-true-default').removeAttr('title');
            }
        };

        this.runtimeProperties = function () {
            return {
                'supportsAutoResize': true,
                'needsError': true,
                'propertyAttributes': {
                    'TextIfNoValue': {
                        'isLocalizable': true
                    },
                    'ToolTipField': {
                        'isLocalizable': true
                    }
                }
            };
        };

        this.buildHtmlForNoValue = function () {
            var NoValueStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('TextIfNoValueStyle', 'DefaultValueDisplayNoTextStyle'));
            var ValueAlignment = this.getProperty('Alignment');
            var imageScaling = thisWidget.getProperty('ImageScaling');

            var html = '<div class="valuedisplay-novalue"><table class="valuedisplay-wrapper" style="text-align: ' + ValueAlignment + ';" height="100%" width="100%"><tr><td>' +
                             ((NoValueStyle.image !== undefined && NoValueStyle.image.length > 0) ? getNoValueImage(NoValueStyle) : '') +
                            '<div class="novalue-container">' + (this.getProperty('TextIfNoValue') || '') + '</div></td>' +
                        '</tr></table></div>';
            return html;
        };

        this.renderHtml = function () {

            var ValueDisplayStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('ValueDisplayStyle', 'DefaultValueDisplayStyle'));
            var ValueAlignment = this.getProperty('Alignment');

            var html = '<div class="widget-content widget-valuedisplay">' +
                '<table class="valuedisplay-wrapper" style="text-align: ' + ValueAlignment + '; display: none;" height="100%" width="100%"><tr>' +
                    '<td class="valuedisplay-text">' +
                        '<div class="valuedisplay-block">' +
                            ((ValueDisplayStyle.image !== undefined && ValueDisplayStyle.image.length > 0) ? '<img class="default" src="' + ValueDisplayStyle.image + '"/>' : '') +
                            '<div class="valuedisplay-container"></div>' +
                        '</div>' +
                    '</td></tr></table>' +
                    this.buildHtmlForNoValue() +
                '</div>';
            return html;
        };

        this.renderStyles = function() {
            var styleBlock = '';

            var widgetHeight = this.getProperty('Height');
            var widgetWidth = this.getProperty('Width');

            var ValueDisplayStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('ValueDisplayStyle', 'DefaultValueDisplayStyle'));
            var ValueDisplayLabelStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('ValueDisplayLabelStyle', 'DefaultWidgetLabelStyle'));
            var TextIfNoValueStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('TextIfNoValueStyle', 'DefaultValueDisplayNoTextStyle'));

            var ValueDisplayBG = TW.getStyleCssGradientFromStyle(ValueDisplayStyle);
            var ValueDisplayBorder = TW.getStyleCssBorderFromStyle(ValueDisplayStyle);
            var ValueDisplayText = TW.getStyleCssTextualNoBackgroundFromStyle(ValueDisplayStyle);
            var ValueDisplayTextSize = TW.getTextSize(ValueDisplayStyle.textSize);

            var ValueDisplayLabelText = TW.getStyleCssTextualNoBackgroundFromStyle(ValueDisplayLabelStyle);
            var ValueDisplayLabelTextSize = TW.getTextSize(ValueDisplayLabelStyle.textSize);
            var ValueDisplayLabelAlignment = this.getProperty('LabelAlignment', 'left');

            var novalueBG = TW.getStyleCssGradientFromStyle(TextIfNoValueStyle);
            var novalueText = TW.getStyleCssTextualNoBackgroundFromStyle(TextIfNoValueStyle);
            var novalueSize = TW.getTextSize(TextIfNoValueStyle.textSize);
            var novalueBorder = TW.getStyleCssBorderFromStyle(TextIfNoValueStyle);
            var novalueBorderSize = TextIfNoValueStyle.lineThickness;
            var novalueOffset = this.getProperty('TextIfNoValueOffset', 0);
            if (novalueOffset !== 0) {
                novalueOffset += 'px';
            }

            if (thisWidget.getProperty('ValueDisplayStyle', 'DefaultValueDisplayStyle') === 'DefaultValueDisplayStyle'
                && thisWidget.getProperty('ValueDisplayLabelStyle', 'DefaultWidgetLabelStyle') === 'DefaultWidgetLabelStyle'
                && thisWidget.getProperty('TextIfNoValueStyle', 'DefaultValueDisplayNoTextStyle') === 'DefaultValueDisplayNoTextStyle') {
                if (!addedDefaultValueDisplayStyles) {
                    addedDefaultValueDisplayStyles = true;
                    var defaultStyles = ' .widget-valuedisplay { ' + ValueDisplayBG + ValueDisplayBorder + ValueDisplayText + ValueDisplayTextSize + ' }' +
                        ' .runtime-widget-label { ' + ValueDisplayLabelText + ValueDisplayLabelTextSize + ' text-align: ' + ValueDisplayLabelAlignment + '; }' +
                        ' .valuedisplay-novalue { ' + novalueBG + novalueText + novalueSize + novalueBorder + ' }';
                    $.rule(defaultStyles).appendTo(TW.Runtime.globalWidgetStyleEl);
                }
            } else {
                styleBlock +=
                        '#' + thisWidget.jqElementId + '.fillcontent .valuedisplay-block { ' + ValueDisplayBG + ValueDisplayBorder + ValueDisplayText + ValueDisplayTextSize + ' }' +
                        '#' + thisWidget.jqElementId + '.fillwidget .valuedisplay-wrapper .valuedisplay-text { ' + ValueDisplayBG + ValueDisplayBorder + ValueDisplayText + ValueDisplayTextSize + ' }' +
                        '#' + thisWidget.jqElementId + '-bounding-box .runtime-widget-label { ' + ValueDisplayLabelText + ValueDisplayLabelTextSize + ' text-align: ' + ValueDisplayLabelAlignment + '; }' +
                        '#' + thisWidget.jqElementId + ' .valuedisplay-novalue {padding-left: ' + novalueOffset + '; ' + novalueBG + novalueText + novalueSize + novalueBorder + ' }';
            }

            if (ValueDisplayStyle.image.length > 0) {
                hasImage = true;
                styleBlock += '#' + thisWidget.jqElementId + '.height img { max-height: ' + widgetHeight + 'px; }' +
                              '#' + thisWidget.jqElementId + '.width img { max-width: ' + widgetWidth + 'px; }';
            }

            return styleBlock;
        };

        this.afterRender = function () {

            valueWrapperElement = thisWidget.jqElement.find('.valuedisplay-wrapper');
            noValueWrapperElement = thisWidget.jqElement.find('.valuedisplay-novalue');
            valueDisplayContainer = thisWidget.jqElement.find('.valuedisplay-container');

            thisWidget.jqElement.bind('click', function (e) {
                thisWidget.jqElement.triggerHandler('Clicked');
                e.preventDefault();
            });

            var ValueDisplayStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('ValueDisplayStyle', 'DefaultValueDisplayStyle'));

            var classList = "";

            if (ValueDisplayStyle.image.length > 0) {
                classList += 'hasImage ';
            }

            if (this.getProperty('TextWrap') === false) {
                classList += 'noTextWrap ';
            }

            classList += thisWidget.getProperty('VerticalAlignment', 'middle') + " ";

            classList += "fill"+ thisWidget.getProperty('BackgroundFill', 'content') + " ";

            if (thisWidget.getProperty('ValueFormat') !== undefined) {
                classList += 'formatted ';
            }

            classList += this.getProperty('ImageScaling', 'Width') + " ";

            if (this.getProperty('Overflow') === 'visible') {
                classList += 'visible';
            }

            thisWidget.jqElement.addClass(classList.trim().replace(/[ ]+/g, " "));

            if(this.getProperty('TextWrap') === false && this.getProperty('TextIfNoValue')){
                var containerWidth = this.getProperty('Width');
                var noWrapStyle = {"width": containerWidth+"px", "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis"};
                noValueWrapperElement.find(".novalue-container").css(noWrapStyle);
            }

            bindToolTip();

        };

        this.updateProperty = function (updatePropertyInfo) {
            if (updatePropertyInfo.TargetProperty === "Data" || updatePropertyInfo.TargetProperty === "ValueFormat") {
                /* Usn an inline style to increase performance during DOM and CSS manipulation */
                valueDisplayContainer.css("display", "none");
                TW.emptyJqElement(valueDisplayContainer);

                if (updatePropertyInfo.ActualDataRows.length === 0) {
                    valueDisplayContainer.html(this.buildHtmlForNoValue());
                    /* delete inline style to return to former visibility */
                    valueDisplayContainer.css("display", "");
                    return;
                } else {
                    noValueWrapperElement.css("display", "none");
                    valueWrapperElement.css("display", "table");
                }

                var valueData;
                var valueDataShape;
                var fieldDef;
                var dataRow;
                var sourceProperty;
                var valueFromRow;

                switch( updatePropertyInfo.TargetProperty )  {
                    case 'Data':
                        valueData = updatePropertyInfo.SinglePropertyValue;
                        valueDataShape = updatePropertyInfo.DataShape;
                        fieldDef = valueDataShape[updatePropertyInfo.SourceProperty];
                        dataRow = updatePropertyInfo.ActualDataRows[0];
                        sourceProperty = updatePropertyInfo.SourceProperty;
                        valueFromRow = updatePropertyInfo.RawSinglePropertyValue; //updatePropertyInfo.ActualDataRows[0][updatePropertyInfo.SourceProperty];
                        break;

                    case 'ValueFormat':
                        if( this.hasDataEverBeenUpdated !== true ) {
                            return;
                        }
                        valueData = this.lastValueData;
                        valueDataShape = this.lastDataShape;
                        fieldDef = this.lastFieldDef;
                        dataRow = this.lastDataRow;
                        sourceProperty = this.lastSourceProperty;
                        valueFromRow = this.lastValueFromRow;
                        break;
                }
                var renderInfo;

                if (this.getProperty('ValueFormat') === undefined || typeof this.getProperty('ValueFormat') === 'string') {

                    if (fieldDef === undefined) {
                        TW.log.info('ValueFormat undefined in valuedisplay');
                        if (valueData !== undefined) {
                            valueDisplayContainer.html(valueData.toString());
                        }
                    } else {
                        switch (fieldDef.baseType) {
                            case "NUMBER":
                                renderInfo = { renderer: "NUMBER", FormatString: TW.Renderer.NUMBER.defaultFormat };
                                break;
                            case "STRING":
                                renderInfo = { renderer: "STRING", FormatString: TW.Renderer.STRING.defaultFormat };
                                break;
                            case "BOOLEAN":
                                renderInfo = { renderer: "BOOLEAN", FormatString: TW.Renderer.BOOLEAN.defaultFormat };
                                break;
                            case "DATETIME":
                                renderInfo = { renderer: "DATETIME", FormatString: TW.Runtime.convertLocalizableString(TW.Renderer.DATETIME.defaultFormat) };
                                break;
                            case "LOCATION":
                                renderInfo = { renderer: "LOCATION", FormatString: TW.Renderer.LOCATION.defaultFormat };
                                break;
                            case "TAGS":
                                renderInfo = { renderer: "TAGS", FormatString: TW.Renderer.TAGS.defaultFormat };
                                break;
                            case "HYPERLINK":
                                renderInfo = { renderer: "HYPERLINK", FormatString: TW.Renderer.HYPERLINK.defaultFormat };
                                break;
                            case "IMAGELINK":
                                renderInfo = { renderer: "IMAGELINK", FormatString: TW.Renderer.IMAGELINK.defaultFormat };
                                break;
                            case "IMAGE":
                                renderInfo = { renderer: "IMAGE", FormatString: TW.Renderer.IMAGELINK.defaultFormat };
                                break;
                            case "THINGNAME":
                                renderInfo = { renderer: "THINGNAME", FormatString: TW.Renderer.THINGNAME.defaultFormat };
                                break;
                            case "THINGSHAPENAME":
                                renderInfo = { renderer: "THINGSHAPENAME", FormatString: TW.Renderer.THINGSHAPENAME.defaultFormat };
                                break;
                            case "THINGTEMPLATENAME":
                                renderInfo = { renderer: "THINGTEMPLATENAME", FormatString: TW.Renderer.THINGTEMPLATENAME.defaultFormat };
                                break;
                            case "MASHUPNAME":
                                renderInfo = { renderer: "MASHUPNAME", FormatString: TW.Renderer.MASHUPNAME.defaultFormat };
                                break;
                            case "USERNAME":
                                renderInfo = { renderer: "USERNAME", FormatString: TW.Renderer.USERNAME.defaultFormat };
                                break;
                            case "THINGCODE":
                                renderInfo = { renderer: "THINGCODE", FormatString: TW.Renderer.THINGCODE.defaultFormat };
                                break;
                            case "VEC2":
                                renderInfo = { renderer: "VEC2", FormatString: TW.Renderer.VEC2.defaultFormat };
                                break;
                            case "VEC3":
                                renderInfo = { renderer: "VEC3", FormatString: TW.Renderer.VEC3.defaultFormat };
                                break;
                            case "VEC4":
                                renderInfo = { renderer: "VEC4", FormatString: TW.Renderer.VEC4.defaultFormat };
                                break;

                            default:
                                renderInfo = { renderer: "DEFAULT" };
                        }
                        renderer = TW.Renderer[renderInfo.renderer];
                        if (renderer !== undefined) {
                            if (renderer['renderHtml'] !== undefined && (typeof renderer['renderHtml']) === "function") {
                                htmlRet = '';
                                widthToUse = 'auto';
                                heightToUse = 'auto';

                                if( renderInfo.renderer === 'IMAGELINK' || renderInfo.renderer === 'IMAGE' ) {
                                    widthToUse = thisWidget.jqElement.width();
                                    heightToUse = thisWidget.jqElement.height();
                                }
                                try {
                                    htmlRet = renderer['renderHtml']({
                                        DataRow: dataRow,
                                        ValueFieldName: sourceProperty,
                                        Value: valueFromRow,
                                        FormatString: renderInfo.FormatString,
                                        StateFormatting: undefined,
                                        ColumnInfo: {
                                            align: this.getProperty('Alignment') || 'left',    // “left”, “center”, “right
                                            label: '',    // the title of the column
                                            name: sourceProperty,    // the name of the field in the data set
                                            sortable: false,    // either true or false
                                            width: widthToUse    // either ‘auto’ or the numeric width
                                        },
                                        RowHeight : heightToUse    // either ‘auto’ or the numeric height
                                    });
                                } catch (err) {
                                    TW.log.error('Error rendering cell using renderer "' + renderInfo.renderer + '", renderInfo: ' + JSON.stringify(renderInfo), err);
                                }

                                valueDisplayContainer.html(htmlRet);
                            }
                        }
                    }
                } else {
                    // format defined
                    var colFormat = this.getProperty('ValueFormat');

                    renderer = TW.Renderer[colFormat.renderer];
                    if (renderer !== undefined) {
                        if (renderer['renderHtml'] !== undefined && (typeof renderer['renderHtml']) === "function") {
                            htmlRet = '';
                            widthToUse = 'auto';
                            heightToUse = 'auto';
                            if (colFormat.renderer === 'IMAGELINK' || colFormat.renderer === 'IMAGE') {
                                widthToUse = thisWidget.jqElement.width();
                                heightToUse = thisWidget.jqElement.height();
                            }
                            try {
                                htmlRet = renderer['renderHtml']({
                                    DataRow: dataRow,
                                    ValueFieldName: sourceProperty,
                                    Value: valueFromRow,
                                    FormatString: colFormat.FormatString,
                                    StateFormatting: colFormat.formatInfo,
                                    ColumnInfo: {
                                        align: this.getProperty('Alignment') || 'left',    // “left”, “center”, “right
                                        label: '',    // the title of the column
                                        name: sourceProperty,    // the name of the field in the data set
                                        sortable: false,    // either true or false
                                        width: widthToUse    // either ‘auto’ or the numeric width
                                    },
                                    RowHeight : heightToUse    // either ‘auto’ or the numeric height
                                });
                            } catch (err) {
                                TW.log.error('Error rendering cell using renderer "' + colFormat.renderer + '", colFormat: ' + JSON.stringify(colFormat), err);
                            }

                            valueDisplayContainer.html(htmlRet);
                        }
                    }
                }

                if(this.getProperty('TextWrap') === false){
                    var containerWidth = this.getProperty('Width');
                    var noWrapStyle = {"width": containerWidth+"px", "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis"};
                    valueDisplayContainer.children(".renderer-true-default").css(noWrapStyle);
                }
                container = null;
                children = null;
            }

            if( updatePropertyInfo.TargetProperty === 'Data' ) {
                this.hasDataEverBeenUpdated = true;
                this.lastValueData = valueData;
                this.lastDataShape = valueDataShape;
                this.lastFieldDef = fieldDef;
                this.lastDataRow = dataRow;
                this.lastSourceProperty = sourceProperty;
                this.lastValueFromRow = valueFromRow;
            }

            if (updatePropertyInfo.TargetProperty === 'ToolTipField') {
                thisWidget.setProperty('ToolTipField', updatePropertyInfo.SinglePropertyValue);
                bindToolTip();
            }

            if (updatePropertyInfo.TargetProperty === 'TextIfNoValueStyle') {
                thisWidget.setProperty('TextIfNoValueStyle', updatePropertyInfo.SinglePropertyValue);
                var noValueStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('TextIfNoValueStyle', 'DefaultValueDisplayNoTextStyle'));
                updateStyle(noValueStyle, 'valuedisplay-novalue');
            }

            if (updatePropertyInfo.TargetProperty === 'ValueDisplayStyle') {
                thisWidget.setProperty('ValueDisplayStyle', updatePropertyInfo.SinglePropertyValue);
                var valueDisplayStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('ValueDisplayStyle', 'DefaultValueDisplayStyle'));
                updateStyle(valueDisplayStyle, 'valuedisplay-block');
            }

            if (updatePropertyInfo.TargetProperty === 'ValueDisplayLabelStyle') {
                thisWidget.setProperty('ValueDisplayLabelStyle', updatePropertyInfo.SinglePropertyValue);
                var valueDisplayLabelStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('ValueDisplayLabelStyle', 'DefaultWidgetLabelStyle'));

                var ValueDisplayLabelStyle = TW.getStyleCssTextualNoBackgroundFromStyle(valueDisplayLabelStyle) + TW.getTextSize(valueDisplayLabelStyle.textSize);
                var element = document.getElementById(thisWidget.jqElementId + '-bounding-box').getElementsByClassName('runtime-widget-label')[0];
                element.style.cssText += ValueDisplayLabelStyle;
                (!valueDisplayLabelStyle.foregroundColor.length > 0) ? element.style.color = '' : '';
            }

            /* delete inline style to return to former visibility */
            valueDisplayContainer.css("display", "");
        };

        var updateStyle = function(style, className) {
            var elementToChange = (className === 'valuedisplay-novalue') ? noValueWrapperElement.find('tr') : thisWidget.jqElement.find('.' + className);
            var defaultImageElement = elementToChange.find(selector).find('img.default');
            if (defaultImageElement.length > 0) {
                if (style.image !== undefined && style.image.length > 0) {
                    defaultImageElement[0].src = style.image;
                } else {
                    defaultImageElement.remove();
                    if (className === 'valuedisplay-novalue') {
                        thisWidget.jqElement.removeClass('hasImage');
                    }
                }
            } else {
                // The case the new style has image but the old hasn't.
                if (style.image !== undefined && style.image.length > 0) {
                    if (className === 'valuedisplay-novalue') {
                        elementToChange.prepend(getNoValueImage(style));
                    } else {
                        elementToChange.prepend('<img class="default" src="' + style.image + '"/>');
                        thisWidget.jqElement.addClass('hasImage');
                    }
                }
            }
            var valueBG = TW.getStyleCssGradientFromStyle(style);
            var valueText = TW.getStyleCssTextualNoBackgroundFromStyle(style);
            var valueSize = TW.getTextSize(style.textSize);
            var valueBorder = TW.getStyleCssBorderFromStyle(style);

            document.getElementById(thisWidget.jqElementId).getElementsByClassName(className)[0].style.cssText = valueBG + valueText + valueSize + valueBorder;
        };

        var getNoValueImage = function(style) {
            var imageScaling = thisWidget.getProperty('ImageScaling');
            imageScaling = (imageScaling !== "none") ? imageScaling + ': '+ thisWidget.getProperty(imageScaling) + 'px; ' : "";
            return '<td><img style="display: inline-block; '+imageScaling+'" class="default" src="' + style.image + '"/></td>'
        };

        this.beforeDestroy = function () {
            try {
                thisWidget = null;
            } catch (err) {
            }
        };
    };
}());
