/*global TW */

TW.IDE.Widgets.valuedisplay = function () {
    var thisWidget = this;
    this.widgetProperties = function () {
        //TW.log.info('valuedisplay this.widgetProperties');
        return {
            'name': TW.IDE.I18NController.translate('tw.valuedisplay-ide.widget.name'),
            'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.widget.description'),
            'category': ['Common', 'Data'],
            'defaultBindingTargetProperty': 'Data',
            'supportsAutoResize': true,
            'supportsLabel': true,
            //'customEditor': 'ValuedisplayCustomEditor',
            'properties': {
                'CustomClass': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.custom-class.description'),
                    'baseType': 'STRING',
                    'isLocalizable': false,
                    'isBindingSource': true,
                    'isBindingTarget': true,
                    'isVisible': false
                },
                'ValueFormat': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.value-format.description'),
                    'baseType': 'RENDERERWITHSTATE',
                    'baseTypeInfotableProperty': 'Data'    // which property's datashape to use and require being bound in order to configure the renderer, etc.
                },
                'Width': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.width.description'),
                    'defaultValue': 100
                },
                'Height': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.height.description'),
                    'defaultValue': 22
                },
                'Data': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.data.description'),
                    'isBindingTarget': true,
                    'isEditable': false,
                    'baseType': 'ANYSCALAR',
                    'warnIfNotBoundAsTarget': true
                },
                'Alignment': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.alignment.description'),
                    'baseType': 'STRING',
                    'defaultValue': 'left',
                    'selectOptions': [
                        { value: 'left', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.alignment.select-options.left') },
                        { value: 'right', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.alignment.select-options.right') },
                        { value: 'center', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.alignment.select-options.center') }
                    ]
                },
                'VerticalAlignment': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.vertical-alignment.description'),
                    'baseType': 'STRING',
                    'defaultValue': 'middle',
                    'selectOptions': [
                        { value: 'bottom', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.vertical-alignment.select-options.bottom') },
                        { value: 'middle', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.vertical-alignment.select-options.middle') },
                        { value: 'top', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.vertical-alignment.select-options.top') }
                    ]
                },
                'LabelAlignment': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.label-alignment.description'),
                    'baseType': 'STRING',
                    'defaultValue': 'left',
                    'selectOptions': [
                        { value: 'left', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.label-alignment.select-options.left') },
                        { value: 'right', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.label-alignment.select-options.right') },
                        { value: 'center', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.label-alignment.select-options.center') }
                    ]
                },
                'BackgroundFill': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.background-fill.description'),
                    'baseType': 'STRING',
                    'defaultValue': 'content',
                    'selectOptions': [
                        { value: 'content', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.background-fill.select-options.content') },
                        { value: 'widget', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.background-fill.select-options.widget') }
                    ]
                },
                'ImageScaling': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.image-scaling.description'),
                    'baseType': 'STRING',
                    'defaultValue': 'Width',
                    'selectOptions': [
                        { value: 'Width', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.image-scaling.select-options.width') },
                        { value: 'Height', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.image-scaling.select-options.height') },
                        { value: 'none', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.image-scaling.select-options.none') }
                    ]
                },
                'Overflow': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.overflow.description'),
                    'baseType': 'STRING',
                    'defaultValue': 'hidden',
                    'selectOptions': [
                        { value: 'hidden', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.overflow.select-options.hidden') },
                        { value: 'visible', text: TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.overflow.select-options.visible') }
                    ]
                },
                'TextWrap': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.text-wrap.description'),
                    'baseType': 'BOOLEAN',
                    'defaultValue': true
                },
                'TextIfNoValue': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.text-if-no-value.description'),
                    'defaultValue': '',
                    'baseType': 'STRING',
                    'isLocalizable': true
                },
                'TextIfNoValueStyle': {
                    'isBindingTarget': (TW.IDE.checkCustomCSS === true) ? true : false,
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.text-if-no-value-style.description'),
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultValueDisplayNoTextStyle'
                },
                'TextIfNoValueOffset': {
                    'description':  TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.text-if-no-value-offset.description'),
                    'baseType':     'NUMBER',
                    'defaultValue': 0
                },
                'ValueDisplayStyle': {
                    'isBindingTarget': (TW.IDE.checkCustomCSS === true) ? true : false,
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.value-display-style.description'),
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultValueDisplayStyle'
                },
                'ValueDisplayLabelStyle': {
                    'isBindingTarget': (TW.IDE.checkCustomCSS === true) ? true : false,
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.value-display-label-style.description'),
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultWidgetLabelStyle'
                },
                'ToolTipField': {
                    'isBindingTarget': true,
                    'isLocalizable': true,
                    'defaultValue': '',
                    'baseType': 'STRING',
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.tooltip-field.description')
                },
                'ShowDataLoading': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.show-data-loading.description')
                },
                'Clicked': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.clicked.description')
                },
                'Label': {
                    'description': TW.IDE.I18NController.translate('tw.valuedisplay-ide.properties.label.description')
                }
            }
        };
    };

    this.widgetEvents = function () {
        return {
            'Clicked': { 'warnIfNotBound': false }
        };
    };

    this.renderHtml = function () {
        //TW.log.info('valuedisplay this.renderHtml');

        var novalueOffset = this.getProperty('TextIfNoValueOffset', 0);
        if (novalueOffset !== 0) {
            novalueOffset += 'px';
        }

        var html = '<div class="widget-content widget-valuedisplay" style="text-align:' + (this.getProperty('Alignment') || 'left') + '">' +
            '<table class="value-display-table" cellspacing="0" cellpadding="0" width="100%" height="100%"><tr>' +
                '<td valign="' + (this.getProperty('VerticalAlignment') || 'middle') + '">'
                    + (this.getProperty('TextIfNoValue') === '' ? '<span>###</span>' : '<span class="widget-valuedisplay-static" style="padding-left:' + novalueOffset + ';">' + Encoder.htmlEncode(thisWidget.getProperty('TextIfNoValue')) + '</span>') +
                '</td>' +
            '</tr></table></div>';
        return html;

    };

    this.afterRender = function () {
        //TW.log.info('valuedisplay this.afterRender');

        var ValueDisplayStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('ValueDisplayStyle'));
        var ValueDisplayLabelStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('ValueDisplayLabelStyle'));
        var TextIfNoValueStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('TextIfNoValueStyle'));

        var ValueDisplayBG = TW.getStyleCssGradientFromStyle(ValueDisplayStyle);
        var ValueDisplayBorder = TW.getStyleCssBorderFromStyle(ValueDisplayStyle);
        var ValueDisplayText = TW.getStyleCssTextualNoBackgroundFromStyle(ValueDisplayStyle);
        var ValueDisplayLabelText = TW.getStyleCssTextualNoBackgroundFromStyle(ValueDisplayLabelStyle);
        var ValueDisplayLabelTextSize = TW.getTextSize(ValueDisplayLabelStyle.textSize);

        var TextIfNoValue = TW.getStyleCssTextualNoBackgroundFromStyle(TextIfNoValueStyle);
        var TextIfNoValueSizeClass = TW.getTextSize(TextIfNoValueStyle.textSize);

        var ValueDisplayLabelAlignment = this.getProperty('LabelAlignment', 'left');

        var resource = TW.IDE.getMashupResource();
        var widgetStyles =
            '#' + thisWidget.jqElementId + '.fillwidget .value-display-table { '+ ValueDisplayBG + ValueDisplayBorder + ValueDisplayText +' } ' +
            '#' + thisWidget.jqElementId + '.fillcontent span { '+ ValueDisplayBG + ValueDisplayBorder + ValueDisplayText +' } ' +
            '#' + thisWidget.jqElementId + '-bounding-box .builder-widget-label { '+ ValueDisplayLabelText + ValueDisplayLabelTextSize + ' text-align: ' + ValueDisplayLabelAlignment + '; } ' +
            '#' + thisWidget.jqElementId + ' .widget-valuedisplay-static { '+ TextIfNoValue + TextIfNoValueSizeClass +' }';
        resource.styles.append(widgetStyles);

        var bFill = thisWidget.getProperty('BackgroundFill', 'content');
        thisWidget.jqElement.addClass("fill" + bFill);

        if(this.getProperty('TextWrap') === false){
            $('.widget-valuedisplay').addClass('noTextWrap');
        }

    };


    this.afterSetProperty = function (name, value) {
        var result = false;
        switch (name) {
            case 'Alignment':
                TW.IDE.updateWidgetPropertiesWindow();
                result = true;
                break;
            case 'BackgroundFill':
            case 'ImageScaling':
            case 'LabelAlignment':
            case 'TextIfNoValue':
            case 'TextIfNoValueOffset':
            case 'TextIfNoValueStyle':
            case 'ValueDisplayLabelStyle':
            case 'ValueDisplayStyle':
            case 'VerticalAlignment':
                result = true;
                break;
        }
        return result;
    };

    this.afterAddBindingSource = function (bindingInfo) {
        if (bindingInfo['targetProperty'] === 'Data') {
            // get the infoTableDataShape associated with this property
            var infoTableDataShape = this.getInfotableMetadataForProperty('Data');

            this.resetPropertyToDefaultValue('ValueFormat');
            if (infoTableDataShape !== undefined) {
                var formatOptions = {
                    renderer: "DEFAULT"
                };

                var fieldDef = infoTableDataShape[bindingInfo.sourceProperty];
                if( fieldDef !== undefined )  {

                    // if you update this, also update dhxgrid.runtime.js to update the defaults at runtime
                    switch (fieldDef.baseType) {
                        case 'DATETIME':
                            formatOptions.renderer = 'DATETIME';
                            break;
                        case 'LOCATION':
                            formatOptions.renderer = 'LOCATION';
                            break;
                        case 'TAGS':
                            formatOptions.renderer = 'TAGS';
                            break;
                        case 'HYPERLINK':
                            formatOptions.renderer = 'HYPERLINK';
                            break;
                        case 'IMAGELINK':
                            formatOptions.renderer = 'IMAGELINK';
                            break;
                        case 'IMAGE':
                            formatOptions.renderer = 'IMAGE';
                            break;
                        case "NUMBER":
                            formatOptions.renderer = 'NUMBER';
                            break;
                        case "STRING":
                            formatOptions.renderer = 'STRING';
                            break;
                        case "BOOLEAN":
                            formatOptions.renderer = 'BOOLEAN';
                            break;
                        case "THINGNAME":
                            formatOptions.renderer = 'THINGNAME';
                            break;
                        case "THINGSHAPENAME":
                            formatOptions.renderer = 'THINGSHAPENAME';
                            break;
                        case "THINGTEMPLATENAME":
                            formatOptions.renderer = 'THINGTEMPLATENAME';
                            break;
                        case "MASHUPNAME":
                            formatOptions.renderer = 'STRING';
                            break;
                        case "USERNAME":
                            formatOptions.renderer = 'USERNAME';
                            break;
                        default:
                            formatOptions.renderer = 'DEFAULT';
                    }
                    if (TW.Renderer[formatOptions.renderer].defaultFormat !== undefined) {
                        formatOptions.FormatString = TW.Renderer[formatOptions.renderer].defaultFormat;
                    }
                }

                // set the ColumnFormat property based on this InfoTableShape
                this.setProperty('ValueFormat', formatOptions);
            }
        }
    };
};
