
// this will be instantiated with
//     new TW.IDE.Dialogs.ValuedisplayCustomEditor()

TW.IDE.Dialogs.ValuedisplayCustomEditor = function () {

    this.title = "Format";
    this.currentColDefinitions = {};
    this.existingFieldMetadata = {};

    // note: this is a little more complicated because we have the HTML already in the index.html and, as a result of being called, the ids will be duplicated
    //       within index.html.  Therefore, whenever we reference them we always "fully qualify" the ids by first referencing the dom ID and then the id within the dialog

    this.renderHtml = function (properties) {
        TW.log.info('ValuedisplayCustomEditor renderHtml() called');
        var html = '';
        var widgetDataSources = TW.IDE.ConfigureDialog.widgetDataSources;
        var resultingShape = TW.IDE.GetInfotableMetadataForTargetProperty(widgetDataSources, 'Data');
        var columnName = TW.IDE.GetSourceFieldFromInfotableForTargetProperty(widgetDataSources, 'Data');

        this.resultingShape = resultingShape;

        var existingColFormat = properties['ValueFormat'];
        var colFormat = undefined;

        var htmlFieldList = '<ul id="grid-config-list-ul">';

        var thisExistingFieldMetadata = this.existingFieldMetadata;
        var curColDefs = this.currentColDefinitions;

        if (existingColFormat !== undefined) {
            colFormat = JSON.parse(existingColFormat);
            for (var i = 0; i < colFormat.formatInfo.length; i++) {
                var row = colFormat.formatInfo[i];
                this.currentColDefinitions[row.FieldName] = row;
                htmlFieldList +=
                          '<li>'
                            + '<div class="column-name" title="' + row.FieldName + '">' + row.FieldName + '</div>'
                            + '<div class="checkbox" style="display:none;"><input type="checkbox" checked="checked" class="visible"></input></div>'
                            + '<div class="re-order" style="display:none;"></div>'
                        + '</li>';
            }
        }

        if (resultingShape !== undefined) {
            //for (var fieldName in resultingShape) {
            var fieldName = columnName;
            thisExistingFieldMetadata[fieldName] = resultingShape[fieldName];

            // add this field to the list if there is no column format already or if this column isn't in the column format
            if (colFormat === undefined || (curColDefs[fieldName] === undefined)) {
                // add it in and presume it's checked
                htmlFieldList =
                          '<ul id="grid-config-list-ul"><li>'
                            + '<div class="column-name" title="' + fieldName + '">' + fieldName + '</div>'
                            + '<div class="checkbox" style="display:none;"><input type="checkbox" checked="checked" class="visible"></input></div>'
                            + '<div class="re-order" style="display:none;"></div>'
                        + '</li>';


                var thisValueFormatInfo = {
                    FieldName: fieldName,
                    Title: fieldName,
                    Width: "auto",
                    Align: "left",
                    "FormatOptions": {
                        renderer: "string"
                    }
                };

                // if you update this, also update valuedisplay.runtime.js to update the defaults at runtime
                switch (resultingShape[fieldName].baseType) {
                    case 'DATETIME':
                        thisValueFormatInfo.FormatOptions.renderer = 'DATETIME';
                        break;
                    case 'LOCATION':
                        thisValueFormatInfo.FormatOptions.renderer = 'LOCATION';
                        break;
                    case 'TAGS':
                        thisValueFormatInfo.FormatOptions.renderer = 'TAGS';
                        break;
                    case 'HYPERLINK':
                        thisValueFormatInfo.FormatOptions.renderer = 'HYPERLINK';
                        break;
                    case 'IMAGELINK':
                        thisValueFormatInfo.FormatOptions.renderer = 'IMAGELINK';
                        break;
                    case "NUMBER":
                        thisValueFormatInfo.FormatOptions.renderer = 'NUMBER';
                        break;
                    case "STRING":
                        thisValueFormatInfo.FormatOptions.renderer = 'STRING';
                        break;
                    case "BOOLEAN":
                        thisValueFormatInfo.FormatOptions.renderer = 'BOOLEAN';
                        break;
                    case "THINGNAME":
                        thisValueFormatInfo.FormatOptions.renderer = 'THINGNAME';
                        break;
                    case "THINGSHAPENAME":
                        thisValueFormatInfo.FormatOptions.renderer = 'THINGSHAPENAME';
                        break;
                    case "THINGTEMPLATENAME":
                        thisValueFormatInfo.FormatOptions.renderer = 'THINGTEMPLATENAME';
                        break;
                    case "MASHUPNAME":
                        thisValueFormatInfo.FormatOptions.renderer = 'MASHUPNAME';
                        break;
                    case "USERNAME":
                        thisValueFormatInfo.FormatOptions.renderer = 'USERNAME';
                        break;
                    default:
                        thisValueFormatInfo.FormatOptions.renderer = 'DEFAULT';
                }
                if (TW.Renderer[thisValueFormatInfo.FormatOptions.renderer].defaultFormat !== undefined) {
                    thisValueFormatInfo.FormatOptions.FormatString = TW.Renderer[thisValueFormatInfo.FormatOptions.renderer].defaultFormat;
                }
                curColDefs[fieldName] = thisValueFormatInfo;
            }
            //}
            htmlFieldList += '</ul>';
        } else {
            htmlFieldList = '<div>[Must be bound to data]</div></ul>';
        }

        $('#grid-config-list').html(htmlFieldList);
        // $('#grid-config-list').html('');

        html = $('#grid-config-window').html();


        return html;
    };

    // note: this is a little more complicated because we have the HTML already in the index.html and, as a result of being called, the ids will be duplicated
    //       within index.html.  Therefore, whenever we reference them we always "fully qualify" the ids by first referencing the dom ID and then the id within the dialog

    this.afterRender = function (domElementId) {
        this.jqElementId = domElementId;
        thisItem = this;

        $('#' + this.jqElementId + ' div.column-1').hide();
        $('#' + this.jqElementId + ' #auto-width').hide();
        $('#' + this.jqElementId + ' #width-label').hide();
        $('#' + this.jqElementId + ' #column-width').hide();
        $('#' + this.jqElementId + ' div.header h1').text('Value Format');
        $('#' + this.jqElementId + ' #field-name').text('');

        //        if ($('#' + this.jqElementId + ' #grid-config-list ul#grid-config-list-ul li').length === 0) {
        //            // no fields ... hide the column formatting section completely

        //            $('#' + this.jqElementId + ' #grid-config').hide();
        //        } else {
        // there are fields to select from and configure :)

        //            // make the list of fields draggable
        //            $('#' + this.jqElementId + '  #grid-config-list ul#grid-config-list-ul').sortable().disableSelection();

        // fill in the valid renderers
        htmlRenderChoices = '';
        for (var rendererName in TW.Renderer) {
            htmlRenderChoices += '<option value="' + rendererName + '">' + TW.Renderer[rendererName].displayName + '</option>';
        }

        $('#' + this.jqElementId + ' #grid-config-renderers').html(htmlRenderChoices);

        $('#' + this.jqElementId + ' #grid-config-renderers').change(function () {
            thisItem.resetRenderer();
        });

        //            $('#' + this.jqElementId + '  #grid-config-list ul#grid-config-list-ul li').click(function (e) {
        //                var liTarget = e.target;
        //                if (e.target.localName !== 'li') {
        //                    liTarget = thisItem.liFromAnyItemWithinLi(e.target);
        //                }

        //                if (!$(liTarget).hasClass('selected')) {
        //                    // save whatever we have in currently selected item
        //                    if (thisItem.itemSelectionLeaving($('#' + domElementId + '  #grid-config-list ul#grid-config-list-ul li.selected'))) {

        //                        // selected a new one - remove "selected" class from all the existing ones
        //                        $('#' + domElementId + '  #grid-config-list ul#grid-config-list-ul li').removeClass('selected');

        //                        // do the work to select this one
        //                        thisItem.itemSelected(liTarget);
        //                    }
        //                } else {
        //                    TW.log.info('already selected');
        //                }
        //            });

        var selectedField = $('#' + this.jqElementId + ' #grid-config-list ul#grid-config-list-ul li')[0];
        this.itemSelected(selectedField);
        //        }
    };

    this.resetRenderer = function () {
        var rendererChosen = $('#' + this.jqElementId + ' #grid-config-renderers').val();
        var renderer = TW.Renderer[rendererChosen];
        if (renderer !== undefined) {
            if (renderer.formatNeeded) {
                $('#' + this.jqElementId + ' #grid-config-renderer-format-section').show();
                $('#' + this.jqElementId + ' #grid-config-renderer-format-section-tooltip').html(renderer.formatTooltip);
                $('#' + this.jqElementId + ' #grid-config-renderer-tooltip').html(renderer.rendererTooltip);
                $('#' + this.jqElementId + ' #grid-config-renderer-format').val(renderer.defaultFormat);

            } else {
                $('#' + this.jqElementId + ' #grid-config-renderer-format-section').hide();
            }

            if (renderer.supportsStateFormatting) {
                $('#' + this.jqElementId + ' #grid-config-state-formatting-section').show();
            } else {
                $('#' + this.jqElementId + ' #grid-config-state-formatting-section').hide();
            }
        }
    };

    this.liFromAnyItemWithinLi = function (domElement) {
        return $(domElement).parents('li')[0];
    };

    this.isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    // save whatever is in the UI for this field
    this.itemSelectionLeaving = function (liTarget) {
        if (liTarget !== undefined) {
            // only validate and save it if it's checked
            if (this.fieldChecked(liTarget)) {
                var fieldName = this.fieldNameFromLi(liTarget);
                var autoChecked = $('#' + this.jqElementId + ' #auto-width').is(":checked");
                var widthSpecified = $('#' + this.jqElementId + ' #column-width').val();
                var title = $('#' + this.jqElementId + ' #column-display-name').val().trim();
                var alignment = $('#' + this.jqElementId + ' #alignment').val();
                var rendererChosen = $('#' + this.jqElementId + ' #grid-config-renderers').val();
                var rendererFormat = $('#' + this.jqElementId + ' #grid-config-renderer-format').val();

                if (!autoChecked) {
                    if (!this.isNumber(widthSpecified)) {
                        alert('must specify valid width, "' + widthSpecified + '" is not valid');
                        return false;
                    }
                }

                if (title.length === 0) {
                    alert('must specify a Title');
                    return false;
                }

                var renderer = TW.Renderer[rendererChosen];
                if (renderer === undefined) {
                    alert('Internal error, could not find renderer "' + rendererChosen + '"');
                    return false;
                }

                if (renderer.formatNeeded) {
                    msg = renderer.validateFormat(rendererFormat);
                    if (msg !== undefined) {
                        alert(msg);
                        return false;
                    }
                }

                var curStateFormat = undefined;

                if (renderer.supportsStateFormatting) {

                    // note: we need to be specific about this because this same HTML is in index.html, there are duplicates of #state-formatting-body, etc.
                    curStateFormat = TW.IDE.ExtractStateFormatFromDialog(curStateFormat, 
                            '#configure-bindings-dialog-custom-contents #state-formatting-dependent-field',
                            '#configure-bindings-dialog-custom-contents #state-formatting-state-definition',
                            '#configure-bindings-dialog-custom-contents #state-formatting-body');
                }

                this.currentColDefinitions[fieldName] =
                {
                    FieldName: fieldName,
                    Title: title,
                    Width: (autoChecked ? "auto" : widthSpecified),
                    Align: alignment,
                    "FormatOptions": {
                        renderer: rendererChosen,
                        FormatString: rendererFormat,
                        formatInfo: curStateFormat
                    }
                };
            }
        }

        return true;
    };

    // handle selecting an item
    this.itemSelected = function (liTarget) {
        if (liTarget !== undefined) {
            $(liTarget).addClass('selected');

            var fieldName = this.fieldNameFromLi(liTarget);
            var curDef = this.currentColDefinitions[fieldName];

            $('#' + this.jqElementId + ' #auto-width').attr('checked', curDef.Width === "auto" ? true : false);
            $('#' + this.jqElementId + ' #field-name').text(fieldName);

            $('#' + this.jqElementId + ' #column-width').val(curDef.Width === "auto" ? "120" : curDef.Width);
            $('#' + this.jqElementId + ' #column-display-name').val(curDef.Title);
            $('#' + this.jqElementId + ' #alignment').val(curDef.Align);
            $('#' + this.jqElementId + ' #grid-config-renderers').val(curDef.FormatOptions.renderer);
            $('#' + this.jqElementId + ' #grid-config-renderer-format').val(curDef.FormatOptions.FormatString);

            this.resetRenderer();

            // note: we need to be specific about this because this same HTML is in index.html, there are duplicates of #state-formatting-body, etc.
            TW.IDE.ManageStateFormatPortionOfDialog(curDef.FormatOptions.formatInfo, this.resultingShape,
                        '#configure-bindings-dialog-custom-contents #state-formatting-dependent-field',
                        '#configure-bindings-dialog-custom-contents #state-formatting-state-definition',
                        '#configure-bindings-dialog-custom-contents #state-formatting-body');
        }
    };


    /*
    {
    "FieldName": "InsideTemp",
    "Title": "Inside Temp",
    "Width": 100,
    "Align": "right",
    "FormatOptions": {
    "renderer": "valuedisplaynumeric",
    "FormatString" : "0,000.0",
    "formatInfo" : {
    "FieldName": "OutsideTemp",
    "StateFormats": [
    {
    "value": 55,
    "comparator": "==",
    "state": "State1"
    },
    {
    "value": 55.1,
    "comparator": "==",
    "state": "State2"
    }
    ]
    }
    }
    }

    */

    this.fieldNameFromLi = function (liDomElement) {
        return $(liDomElement).find('div.column-name').text()
    };

    this.fieldChecked = function (liDomElement) {
        return $($(liDomElement).find('input')).is(":checked");
    };

    this.updateProperties = function (widgetObj) {
        // call itemSelectionLeaving() on current target and validate that it's ok before we save
        if (!this.itemSelectionLeaving($('#' + this.jqElementId + '  #grid-config-list ul#grid-config-list-ul li.selected'))) {
            return false;
        }

        var colFormat = { formatInfo: [] };
        var thisItem = this;
        // figure out which ones are checked
        $('#' + this.jqElementId + ' #grid-config-list input').each(function (index, element) {
            var thisJq = $(this);
            if (thisJq.is(":checked")) {
                var fieldName = thisItem.fieldNameFromLi(thisItem.liFromAnyItemWithinLi(thisJq));
                colFormat.formatInfo.push(thisItem.currentColDefinitions[fieldName]);
            }
        });

        widgetObj.setProperty('ValueFormat', JSON.stringify(colFormat));

        return true;
    };
};
