var tourismSuggestionsGridObject = null;
var tourismSuggestionsProducts = [];
var tourismSuggestionsFirstVisit = true;
var tourismSuggestionsSelectedIndex = null;
var tourismSuggestionsLoadProduct = true;

function tourismSuggestionsInit(productId) {
    // DrawSelectComboBox
    tourismSuggestionsDrawSelectComboBox(productId);
    // Load Companies
    tourismSuggestionsLoadCompanies(productId);
}

/**
 * DrawSelectComboBox
 */
function tourismSuggestionsDrawSelectComboBox(productId) {
    $('#tourismSuggestionsCompanySelect').multiselect({
        header: false,
        multiple: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        minWidth: 100,
        selectedList: 1
    });

    var tourismSuggestionsProductSelect = $('#tourismSuggestionsProductSelect').multiselect({
        header: "",
        multiple: false,
        noneSelectedText: multiselectNoneSelectedTextLabel,
        minWidth: 100,
        selectedList: 1
    });

    tourismSuggestionsProductSelect.multiselectfilter({
        ajaxHandler: tourismSuggestionsLoadProducts,
        param: productId
    });
    $('#multiselectfilter_searchInput').bind('click', function(e) {
        if ($(this).val() == ''){
            $('#tourismSuggestionsProductSelect').empty();
            $('#tourismSuggestionsProductSelect').multiselect('enable');
            $('#tourismSuggestionsProductSelect').multiselect('refresh');
        }
    });
}

/**
 * Load Companies
 * @param productId
 */
function tourismSuggestionsLoadCompanies(productId) {
    $.ajax({
        url : tourismSuggestionsListCompanies + "?format=json",
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var options = '';
            $.each(response, function(i, data) {
                var selected = (i == 0);
                options += '<option ' + (selected ? 'selected ' : '') + 'value="' + data.id + '">' + data.name + '</option>';
            });
            $('#tourismSuggestionsCompanySelect').empty().html(options);
            $('#tourismSuggestionsCompanySelect').multiselect('refresh');

            $("#tourismSuggestionsCompanySelect").bind("multiselectclick", function(event, ui) {
                $('#tourismSuggestionsProductSelect').multiselect('disable');
                tourismSuggestionsLoadProducts(productId);
            });
            // Load Products
            tourismSuggestionsLoadProducts(productId);
            // Load Suggestions
            tourismSuggestionsLoadSuggestions(productId);
        }
    });
}

/**
 * Load Products
 * @param productId
 */
function tourismSuggestionsLoadProducts(productId) {
    tourismSuggestionsLoadProduct = true;
    if ($('#multiselectfilter_searchInput').val().length < 3) {
        tourismSuggestionsLoadProduct = false;
        $('#tourismSuggestionsProductSelect').empty();
        $('#tourismSuggestionsProductSelect').multiselect('enable');
        $('#tourismSuggestionsProductSelect').multiselect('refresh');
        return;
    }

    var dataToSend = 'company.id=' + $('#tourismSuggestionsCompanySelect').val();
    dataToSend += '&fullSearch=' + $('#multiselectfilter_searchInput').val();
    dataToSend += '&catalog.id='+catalogSelectedId;
    dataToSend += '&format=json';

    $.ajax({
        url : tourismSuggestionsListProducts + "?" + dataToSend,
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if(!tourismSuggestionsLoadProduct){
                $('#tourismSuggestionsProductSelect').empty();
                $('#tourismSuggestionsProductSelect').multiselect('enable');
                $('#tourismSuggestionsProductSelect').multiselect('refresh');
                return;
            }
            var options = '';

            var products = tourismSuggestionsSynchroniseProducts(productId, response);
            $.each(products, function(i, data) {
                options += '<option value="' + data.id + '">' + data.name + '</option>';
            });

            $('#tourismSuggestionsProductSelect').empty().html(options);
            $('#tourismSuggestionsProductSelect').multiselect('enable');
            $('#tourismSuggestionsProductSelect').multiselect('refresh');

            $("#tourismSuggestionsProductSelect").bind("multiselectclick", function(event, ui) {
                showCreateTourismSuggestionsDialog(productId)
            });
        }
    });
}

function tourismSuggestionsSynchroniseProducts(productId, products){
    var data = [];
    for(var i=0; i < products.length; i++){
        if(products[i].id != productId && !tourismSuggestionsExistProductInSuggestions(products[i].id)) {
            data[data.length] = products[i];
        }
    }
    return data;
}

function tourismSuggestionsExistProductInSuggestions(id){
    var suggestions = tourismSuggestionsGridObject.getData();
    for(var i=0; i < suggestions.length; i++){
        if(suggestions[i].id == id)
            return true;
    }
    return false;
}

/**
 * Load Suggestions For Selected Product
 * @param productId
 */
function tourismSuggestionsLoadSuggestions(productId){
    var dataToSend = 'product.id='+productId;
    dataToSend += '&format=json';
    $.ajax({
        url : tourismSuggestionsListSuggestions + "?" + dataToSend,
        type : "GET",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            tourismSuggestionsDrawForm(productId, response);
        }
    });
}

function tourismSuggestionsDrawForm(productId, suggestions) {
    // grid setup
    var columns = [
        {id: "#", name: "", width: 5, behavior: "selectAndMove", selectable: false, cssClass: "cell-reorder"},
        {id: "name", name: tourismSuggestionsProductNameLabel, field: "name", width: 60, formatter: tourismSuggestionsTitleFormatter},
        {id : "discount", name : tourismSuggestionsDiscountLabel, field : "discount", width : 40}
    ];

    var options = {
        editable : false,
        enableAddRow : false,
        asyncEditorLoading : false,
        forceFitColumns : true,
        enableCellNavigation: false,
        enableColumnReorder:false,
        rowHeight : 25
    };

    tourismSuggestionsProducts = [];
    for(var i = 0; i < suggestions.length; i++) {
        var discount = suggestions[i].discount;
        if(!isNaN(discount) && discount != ""){
            var sign = "";
            if(isNaN(discount.substring(0, 1))){
                sign = discount.substring(0, 1);
                discount = discount.substring(1);
            }
            discount = (discount / Math.pow(10, defaultCurrency.fractionDigits)).toFixed(defaultCurrency.fractionDigits);
            discount = sign + discount;
        }
        tourismSuggestionsProducts[tourismSuggestionsProducts.length] = {
            'id':suggestions[i].product.id,
            'productId':productId,
            'name':suggestions[i].product.name,
            'discount': discount,
            'required': suggestions[i].required,
            'position': ((i + 1) * 10)
        };
    }

    tourismSuggestionsGridObject= new Slick.Grid($("#tourismSuggestionsGrid"), tourismSuggestionsProducts, columns, options);
    tourismSuggestionsGridObject.setSelectionModel(new Slick.RowSelectionModel());
    tourismSuggestionsGridObject.invalidate();

    var moveRowsPlugin = new Slick.RowMoveManager();
    moveRowsPlugin.onBeforeMoveRows.subscribe(function(e, data) {
        for ( var i = 0; i < data.rows.length; i++) {
            if (data.rows[i] == data.insertBefore
                || data.rows[i] == data.insertBefore - 1) {
                e.stopPropagation();
                return false;
            }
        }
        return true;
    });

    moveRowsPlugin.onMoveRows.subscribe(function(e, args) {
        var index = args.rows[0];
        var insertBefore = args.insertBefore;
        var data = tourismSuggestionsGridObject.getData();
        data[index].position = (insertBefore * 10) + 5;
        data.sort(function (a, b) {
            var posA =parseInt( a.position );
            var posB =parseInt( b.position );
            return (posA < posB) ? -1 : (posA > posB) ? 1 : 0;
        });
        tourismSuggestionsGridObject.setData(data);
        tourismSuggestionsGridObject.invalidate();
        tourismSuggestionsBindProducts(productId);
    });
    tourismSuggestionsGridObject.registerPlugin(moveRowsPlugin);
}

function tourismSuggestionsTitleFormatter(row, cell, value, columnDef, dataContext) {
    return '<a href="javascript:void(0)" onclick="tourismSuggestionsEditSuggestedProduct(' + dataContext.productId + ',' + dataContext.id + ')">' + value + "</a>";
}

function showCreateTourismSuggestionsDialog(productId) {
    $('#tourismSuggestionsCompanySelect').multiselect('close');
    $('#tourismSuggestionsProductSelect').multiselect('close');
    $.get(tourismSuggestionsPageUrl, function(responseText) {
        if ($('#tourismSuggestionsDialog').dialog( "isOpen" ) !== true) {
            htmlresponse = jQuery.trim(responseText);
            $('#tourismSuggestionsDialog').empty();
            $('#tourismSuggestionsDialog').html(htmlresponse);

            $('#tourismSuggestionsDialog').dialog({
                width : 'auto',
                height : 'auto',
                title : "Create Suggestion",
                resizable: false,
                modal : true,
                open: function(event) {
                    $('#tourismSuggestionsDiscount').val('0');
                    $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
                    $('.ui-dialog-buttonpane').find('button:contains("createLabel")').addClass("ui-create-button");
                    $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">'+cancelLabel+'</span>');
                    $('.ui-dialog-buttonpane').find('button:contains("createLabel")').html('<span class="ui-button-text">'+tourismSuggestionsAddButtonLabel+'</span>');
                },
                buttons : {
                    cancelLabel : function() {
                        closeTourismSuggestionsDialog();
                    },
                    createLabel : function() {
                        tourismSuggestionsAddRecord(productId);
                    }
                }
            });
        }
    }, "html");
}

function tourismSuggestionsEditSuggestedProduct(productId, id){
    showEditTourismSuggestionsDialog(productId, id);
}

function showEditTourismSuggestionsDialog(productId, id) {
    $('#tourismSuggestionsCompanySelect').multiselect('close');
    $('#tourismSuggestionsProductSelect').multiselect('close');
    $.get(tourismSuggestionsPageUrl, function(responseText) {
        if ($('#tourismSuggestionsDialog').dialog( "isOpen" ) !== true) {
            htmlresponse = jQuery.trim(responseText);
            $('#tourismSuggestionsDialog').empty();
            $('#tourismSuggestionsDialog').html(htmlresponse);

            $('#tourismSuggestionsDialog').dialog({
                width : 'auto',
                height : 'auto',
                title : "Edit Suggestion",
                resizable: false,
                modal : true,
                open: function(event) {
                    var data = tourismSuggestionsGetDataRowByProductId(id);
                    $('#tourismSuggestionsDiscount').val(data.discount);
                    $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').addClass("ui-delete-button");
                    $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
                    $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').addClass("ui-update-button");
                    $('.ui-dialog-buttonpane').find('button:contains("deleteLabel")').html('<span class="ui-button-text">'+deleteLabel+'</span>');
                    $('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">'+cancelLabel+'</span>');
                    $('.ui-dialog-buttonpane').find('button:contains("updateLabel")').html('<span class="ui-button-text">'+updateLabel+'</span>');
                },
                buttons : {
                    deleteLabel : function() {
                        tourismSuggestionsDeleteRecord(productId);
                    },
                    cancelLabel : function() {
                        closeTourismSuggestionsDialog();
                    },
                    updateLabel : function() {
                        tourismSuggestionsEditRecord(productId);
                    }
                }
            });
        }
    }, "html");
}

function tourismSuggestionsGetDataRowByProductId(id) {
    for (var i = 0; i < tourismSuggestionsProducts.length; i++) {
        if (tourismSuggestionsProducts[i].id == id){
            tourismSuggestionsSelectedIndex = i;
            return tourismSuggestionsProducts[i];
        }
    }
    return null; // should never happen
}

function closeTourismSuggestionsDialog() {
    $('#tourismSuggestionsDialog').empty();
    $('#tourismSuggestionsDialog').dialog('close');
}

function tourismSuggestionsAddRecord(productId) {
    if($("#tourismSuggestionsProductSelect").val() == null)
        return;

    if ($('#tourismSuggestionsDiscount').val() == "") {
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : 'error'
        });
        $('#tourismSuggestionsDiscount').focus();
    }
    else {
        if($('input#tourismSuggestionsDiscount')[0].checkValidity()){
            var selected = $("#tourismSuggestionsProductSelect option:selected");
            var len = tourismSuggestionsProducts.length;
            tourismSuggestionsProducts[len] = {
                'id': $("#tourismSuggestionsProductSelect").val(),
                'productId': productId,
                'name': selected.text(),
                'discount': ($('#tourismSuggestionsDiscount').val() == '')?0:$('#tourismSuggestionsDiscount').val(),
                'required': false,
                'position': ''
            };
            tourismSuggestionsGridObject.setData(tourismSuggestionsProducts);
            tourismSuggestionsGridObject.render();
            selected.remove();
            $("#tourismSuggestionsProductSelect").multiselect('refresh');
            tourismSuggestionsBindProducts(productId);
            closeTourismSuggestionsDialog();
        }
        else{
            jQuery.noticeAdd({
                stayTime : 2000,
                text : fieldsInvalidMessageLabel,
                stay : false,
                type : 'error'
            });
            $('#tourismSuggestionsDiscount').focus();
        }
    }
}

function tourismSuggestionsEditRecord(productId) {
    if ($('#tourismSuggestionsDiscount').val() == "") {
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : 'error'
        });
        $('#tourismSuggestionsDiscount').focus();
    }
    else {
        if($('input#tourismSuggestionsDiscount')[0].checkValidity()){
            tourismSuggestionsProducts[tourismSuggestionsSelectedIndex].discount = ($('#tourismSuggestionsDiscount').val() == '')?0:$('#tourismSuggestionsDiscount').val();
            tourismSuggestionsProducts[tourismSuggestionsSelectedIndex].required = false,
                tourismSuggestionsGridObject.setData(tourismSuggestionsProducts);
            tourismSuggestionsGridObject.render();
            tourismSuggestionsBindProducts(productId);
            closeTourismSuggestionsDialog();
        }
        else{
            jQuery.noticeAdd({
                stayTime : 2000,
                text : fieldsInvalidMessageLabel,
                stay : false,
                type : 'error'
            });
            $('#tourismSuggestionsDiscount').focus();
        }
    }
}

function tourismSuggestionsDeleteRecord(productId){
    var data = [];
    for(var i = 0; i < tourismSuggestionsProducts.length; i++){
        if(i != tourismSuggestionsSelectedIndex)
            data[data.length] = tourismSuggestionsProducts[i];
    }
    tourismSuggestionsProducts = data;
    tourismSuggestionsGridObject.setData(tourismSuggestionsProducts);
    tourismSuggestionsGridObject.render();
    tourismSuggestionsBindProducts(productId);
    closeTourismSuggestionsDialog();
    $('#tourismSuggestionsProductSelect').multiselect('disable');
    tourismSuggestionsLoadProducts(productId);
}

function tourismSuggestionsUpdatePosition(data){
//    var dataToSend = "category.id=" + selectedProductCategoryId + "&format=json&tagids=";
//    for(var i = 0; i < data.length; i++){
//        dataToSend += data[i].featureId + ",";
//    }
//    $.ajax({
//        url : updateFeaturesPositionUrl,
//        type : "POST",
//        noticeType : "PUT",
//        data : dataToSend,
//        dataType : "json",
//        cache : false,
//        async : true,
//        success : function(response, status) {
//            tourismSuggestionsLoadSuggestions(productId);
//        },
//        error : function() {
//            $("#categoriesMain").hideLoading();
//        }
//    });
}

function tourismSuggestionsBindProducts(productId){
    if(tourismSuggestionsFirstVisit)
        return;
    var dataToSend = 'product.id='+productId;
    var suggestions = tourismSuggestionsGridObject.getData();
    for(var i=0; i < suggestions.length; i++){
        var discount = suggestions[i].discount;
        if(!isNaN(discount) && discount != ""){
            var sign = "";
            if(isNaN(discount.substring(0, 1))){
                sign = discount.substring(0, 1);
                discount = discount.substring(1);
            }
            discount = parseInt(parseFloat(discount) *  Math.pow(10, defaultCurrency.fractionDigits));
            discount = sign + discount;
        }
        dataToSend +='&suggestion.required=' + suggestions[i].required;
        dataToSend +='&suggestion.discount=' + discount;
        dataToSend +='&suggestion.product.id=' + suggestions[i].id;
    }
    dataToSend +='&format=json';
    dataToSend = encodeURI(dataToSend);
    $.ajax({
        url : tourismSuggestionsBindSuggestions + "?" + dataToSend,
        type : "POST",
        noticeType : "PUT",
        data : "",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            tourismSuggestionsLoadSuggestions(productId);
        }
    });
}