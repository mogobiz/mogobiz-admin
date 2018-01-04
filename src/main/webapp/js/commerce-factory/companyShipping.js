function companyShippingAutoUpdateField(compId, objId, objProperty, blankOK, checkValidity) {
    $(objId).unbind();
    $(objId).change(function() {
        companyShippingDoUpdateField(compId, objId, objProperty, blankOK, checkValidity);
    });
}

function companyShippingDoUpdateField(compId, objId, objProperty, blankOK, checkValidity) {
    if (!blankOK && $(objId).val().length == 0) {
        $(objId).focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    }
    else if(checkValidity && !$(objId)[0].checkValidity()){
        $(objId).focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    }
    else if((objProperty.indexOf("company.shipFrom") == 0 && $("#shippingCountry").val() == null)){
        $(objId).val("");
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyShippingChooseCountryErrorLabel,
            stay : false,
            type : 'error'
        });
    }
    else {
        var dataToSend = "company.id=" + compId;
        dataToSend += "&" + objProperty + "=" + $(objId).val();
        dataToSend += "&format=json";
        $.ajax( {
            url : shippingPolicyUpdateUrl,
            type : "POST",
            noticeType : "PUT",
            data : dataToSend,
            dataType : "json",
            cache : false,
            async : true
        });
    }
}

function companyShippingAutoUpdateCheckbox(compId, objId, objProperty) {
    $(objId).unbind();
    $(objId).change(function() {
        var dataToSend = "company.id=" + compId;
        dataToSend += "&" + objProperty + "=" + $(objId).is(":checked");
        dataToSend += "&format=json";
        $.ajax({
            url : shippingPolicyUpdateUrl,
            type : "POST",
            noticeType : "PUT",
            data : dataToSend,
            dataType : "json",
            cache : false,
            async : true
        });
    });
}

function companyShippingMultiSelectAutoUpdate(compId, objId, objProperty){
    $(objId).bind("multiselectclick", function(event, ui) {
        var dataToSend = "company.id=" + compId;
        dataToSend += "&" + objProperty + "=" + ui.value;
        dataToSend += "&format=json";
        $.ajax({
            url : shippingPolicyUpdateUrl,
            type : "POST",
            noticeType : "PUT",
            data : dataToSend,
            dataType : "json",
            cache : false,
            async : true
        });
    });
}

function companyGetShippingPolicy(compId) {
    var dataToSend = "company.id="+compId;
    dataToSend += "&format=json";

    $.ajax({
        url : shippingPolicyShowUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if (response.success) {
                var shipping = response.data;
                var shippingEncoded = $.toJSON(shipping);
                var shippingFormValues = shippingEncoded;
                shippingFormValues = shippingFormValues.replace(/(^\s+|\s+$)/, '');
                shippingFormValues = "(" + shippingFormValues + ");";
                try	{
                    var json = eval(shippingFormValues);
                    var newJson = new Object();
                    for(var key in json){
                        var newKey = "company."+key;
                        if (key=='shipFrom') {
                            var companyshipFromObj = json[key];
                            for(var key1 in companyshipFromObj){
                                var newKey1 = "company.shipFrom."+key1;
                                newJson[newKey1] = companyshipFromObj[key1];
                            }
                        }
                        else if (key == "weightUnit" && json[key]) {
                            var newKey1 = "company.weightUnit.name";
                            newJson[newKey1] = json[key].name;
                        }
                        else if (key == "refundPolicy" && json[key]) {
                            var newKey1 = "company.refundPolicy.name";
                            newJson[newKey1] = json[key].name;
                        }
                        else {
                            newJson[newKey] = json[key];
                        }
                    }
                }
                catch(err)	{
                    console.log('That appears to be invalid JSON!');
                    return false;
                }
                var shippingForm = document.forms['formShipping'];
                $(shippingForm).populate(newJson, {debug:1});

                // set multicheck combos values
                $("#shippingCountry").multiselect('uncheckAll');
                $('#shippingCountry').multiselect('refresh');

                if(newJson["company.shipFrom.countryCode"] && newJson["company.shipFrom.countryCode"] != ""){
                    $('#shippingCountry').find('option:contains(' + newJson["company.shipFrom.countryCode"] + ')').attr('selected','selected');
                    $('#formShipping .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_shippingCountry"]').each(function() {
                        if(this.value == newJson["company.shipFrom.countryCode"]) {
                            $("#shippingCountry").unbind("multiselectclick");
                            this.click();
                            companyShippingMultiSelectAutoUpdate(compId, "#shippingCountry", "company.shipFrom.countryCode");
                        }
                    });
                }

                // set value of Allow International Shipping
                if(response.data.shippingInternational){
                    $('#formShipping #shippingAllowInternational').attr("checked","checked");
                }
            }
            else {
                showErrors('#formShipping .errors', response.errors);
            }
        }
    });
}

function getStoreAddress(compId) {
    // Country
    if ($('#generalCountry').val() == null) {
        $("#shippingCountry").multiselect('uncheckAll');
        $('#shippingCountry').multiselect('refresh');
    }
    else {
        $("#shippingCountry").multiselect('uncheckAll');
        $('#shippingCountry').find('option:contains('+$('#generalCountry option:selected').text()+')').attr('selected','selected');
        $('#shippingCountry').multiselect('refresh');
        $('#formShipping .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_shippingCountry"]').each(function() {
            if(this.title == $('#generalCountry option:selected').text()) {
                $("#shippingCountry").unbind("multiselectclick");
                this.click();
                companyShippingMultiSelectAutoUpdate(compId, "#shippingCountry", "company.shipFrom.countryCode");
            }
        });
    }

    $('#formShipping #shippingCity').val($('#formGeneral #generalCity').val());
    $('#formShipping #shippingState').val($('#formGeneral #generalState').val());
    $('#formShipping #shippingPostalCode').val($('#formGeneral #generalPostalCode').val());
    $('#formShipping #shippingAddress1').val($('#formGeneral #generalAddress1').val());
    $('#formShipping #shippingAddress2').val($('#formGeneral #generalAddress2').val());

    var dataToSend = "company.id=" + compId;
    dataToSend += "&company.shipFrom.countryCode=" + $('#generalCountry').val();
    dataToSend += "&company.shipFrom.state=" + $('#shippingState').val();
    dataToSend += "&company.shipFrom.city=" + $('#shippingCity').val();
    dataToSend += "&company.shipFrom.postalCode=" + $('#shippingPostalCode').val();
    dataToSend += "&company.shipFrom.road1=" + $('#shippingAddress1').val();
    dataToSend += "&company.shipFrom.road2=" + $('#shippingAddress2').val();
    dataToSend += "&format=json";
    $.ajax( {
        url : shippingPolicyUpdateUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true
    });
}

// Shipping Rules Functions
var companyShippingRulesGrid = null;

function companyShippingRulesDrawAll(companyId){
    companyShippingRulesGrid = null;
    $.ajax({
        url : shippingRulesListUrl,
        type : "GET",
        data : "pageSize=" + companyGridPageSize + "&pageOffset=" + companyIBeaconPageOffset + "&format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var gridColumns = [{
                id : "countryCode",
                name : companyShippingRulesCountryCodeLabel,
                field : "countryCode",
                width : 25,
                formatter : companyShippingRulesCountryCodeFormatter,
                cssClass : "cell-title"
            },{
                id : "minAmount",
                name : companyShippingRulesMinAmountLabel,
                field : "minAmount",
                width : 25,
                cssClass : "cell-title"
            },{
                id : "maxAmount",
                name : companyShippingRulesMaxAmountLabel,
                field : "maxAmount",
                width : 25,
                cssClass : "cell-title"
            },{
                id : "price",
                name : companyShippingRulesPriceLabel,
                field : "price",
                width : 25,
                cssClass : "cell-title"
            }];

            var gridOptions = {
                editable : false,
                enableAddRow : false,
                asyncEditorLoading : false,
                forceFitColumns : true,
                enableCellNavigation : false,
                enableColumnReorder : false,
                rowHeight : 25
            };

            var gridData = [];
            var rules = response.list;
            if(rules){
                for ( var i = 0; i < rules.length; i++) {
                    var price = rules[i].price != null ? rules[i].price : "";
                    if(!isNaN(price) && price != ""){
                        var sign = "";
                        if(isNaN(price.substring(0, 1))){
                            sign = price.substring(0, 1);
                            price = price.substring(1);
                        }
                        price = (price / Math.pow(10, defaultCurrency.fractionDigits)).toFixed(defaultCurrency.fractionDigits);
                        price = sign + price;
                    }
                    gridData[gridData.length] = {
                        "id" : i,
                        "companyId": companyId,
                        "ruleId": rules[i].id,
                        "price": price,
                        "maxAmount": (rules[i].maxAmount / Math.pow(10, defaultCurrency.fractionDigits)).toFixed(defaultCurrency.fractionDigits),
                        "minAmount": (rules[i].minAmount / Math.pow(10, defaultCurrency.fractionDigits)).toFixed(defaultCurrency.fractionDigits),
                        "countryCode": rules[i].countryCode
                    }
                }
            }
            companyShippingRulesGrid = new Slick.Grid($("#shippingRulesGrid"), gridData, gridColumns, gridOptions);

            companyShippingRulesGrid.setSelectionModel(new Slick.RowSelectionModel());
            companyShippingRulesGrid.invalidate();
        }
    });
}

function companyShippingRulesCountryCodeFormatter(row, cell, value, columnDef, dataContext){
    for(var i = 0; i < countries.length; i++){
        if(countries[i].code == value){
            return '<a href="javascript:void(0);" onclick="companyShippingRulesGetEditPage(\'' + dataContext.companyId + '\',\'' + dataContext.ruleId + '\')">' + countries[i].name + '</a>';
        }
    }
}

function companyShippingRulesGetEditPage(companyId, ruleId){
    companyShippingRulesGetDetails(companyId, ruleId, false);
}

function companyShippingRulesGetDetails(companyId, ruleId, isCreate){
    $.get(
        companyShippingRulesCreatePageUrl,
        {},
        function(htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            companyShippingRulesPageSetup(htmlresponse, companyId, ruleId, isCreate);
        },
        "html"
    );
}

function companyShippingRulesPageSetup(htmlresponse, companyId, ruleId, isCreate){
    if ($("#shippingRuleDialog").dialog("isOpen") !== true) {
        $("#shippingRuleDialog").empty();
        $("#shippingRuleDialog").html(htmlresponse);
        $("#shippingRuleDialog").dialog({
            title : companyShippingRule_TitleLabel,
            modal : true,
            resizable : false,
            width : "auto",
            height : "auto",
            open : function(event) {
                companyShippingRulesInitControls(isCreate);
                companyShippingRulesInitFields(companyId, ruleId, isCreate);
            },
            buttons : {
                deleteLabel : function() {
                    companyShippingRulesDelete();
                },
                cancelLabel : function() {
                    $("#shippingRuleDialog").dialog("close");
                },
                updateLabel : function() {
                    if (companyShippingRulesValidateForm(isCreate))
                        companyShippingRulesUpdate();
                },
                createLabel : function() {
                    if (companyShippingRulesValidateForm(isCreate))
                        companyShippingRulesAddNew();
                }
            }
        });
    }
}

function companyShippingRulesInitControls(isCreate) {
    if (isCreate) {
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").addClass("ui-create-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").html("<span class='ui-button-text'>" + createLabel + "</span>");
    }
    else {
        $(".ui-dialog-buttonpane").find("button:contains('createLabel')").hide();
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").addClass("ui-delete-button");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").addClass("ui-cancel-button");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").addClass("ui-update-button");
        $(".ui-dialog-buttonpane").find("button:contains('deleteLabel')").html("<span class='ui-button-text'>" + deleteLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('cancelLabel')").html("<span class='ui-button-text'>" + cancelLabel + "</span>");
        $(".ui-dialog-buttonpane").find("button:contains('updateLabel')").html("<span class='ui-button-text'>" + updateLabel + "</span>");
    }
}

function companyShippingRulesInitFields(companyId, ruleId, isCreate){
    $("#shippingRuleCompanyId").val(companyId);
    $("#shippingRuleMinAmountCurrency, #shippingRuleMaxAmountCurrency, #shippingRulePriceCurrency").html(defaultCurrency.currencyCode);
    $("#shippingRuleMaxAmount, #shippingRuleMinAmount").attr("pattern", "\\d+\\.?\\d{0," + defaultCurrency.fractionDigits + "}");
    $("#shippingRuleMaxAmount, #shippingRuleMinAmount, #shippingRulePrice").val(0);
    $("#shippingRuleCountry").empty();

    if(isCreate){
        $("#shippingRuleCountry").empty();
        for(var i = 0; i < countries.length; i++){
            $("#shippingRuleCountry").append("<option value='" + countries[i].code + "'>" + countries[i].name + "</option>");
        }
        $("#shippingRuleCountry").multiselect("destroy");
        $("#shippingRuleCountry").multiselect({
            header : false,
            multiple : false,
            noneSelectedText : multiselectNoneSelectedTextLabel,
            minWidth : 229,
            height: 60,
            selectedList : 1
        });
    }
    else{
        var rule = null;
        var data = companyShippingRulesGrid.getData();
        for (var i = 0; i < data.length; i++) {
            if (data[i].ruleId == ruleId){
                rule =  data[i];
                break;
            }
        }
        if(rule){
            var html = "";
            for(var i = 0; i < countries.length; i++){
                if(rule.countryCode == countries[i].code){
                    html += "<option value='" + countries[i].code + "'>" + countries[i].name + "</option>";
                }
            }
            $("#shippingRuleCountry").html(html);
            $("#shippingRuleCountry").multiselect("destroy");
            $("#shippingRuleCountry").multiselect({header : false, multiple : false, selectedList : 1});
            $("#shippingRuleDialog .ui-multiselect-menu .ui-multiselect-checkboxes input[name='multiselect_shippingRuleCountry']")[0].click();
            $("#shippingRuleCountry").multiselect("refresh");
            $("#shippingRuleCountry").multiselect("disable");
            $("#shippingRuleCountry").val(rule.countryCode);

            $("#shippingRuleId").val(rule.ruleId);
            $("#shippingRulePrice").val(rule.price);
            $("#shippingRuleMinAmount").val(rule.minAmount);
            $("#shippingRuleMaxAmount").val(rule.maxAmount);
        }
    }
}

function companyShippingRulesValidateForm(isCreate){
    if($("#shippingRuleCountry").val() == null || $("#shippingRulePrice").val() == "" || $("#shippingRuleMinAmount").val() == "" || $("#shippingRuleMaxAmount").val() == "") {
        if ($("#shippingRulePrice").val() == "")
            $("#shippingRuleForm #shippingRulePrice").focus();
        else if ($("#shippingRuleMinAmount").val() == "")
            $("#shippingRuleForm #shippingRuleMinAmount").focus();
        else if ($("#shippingRuleMaxAmount").val() == "")
            $("#shippingRuleForm #shippingRuleMaxAmount").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsRequiredMessageLabel,
            stay : false,
            type : "error"
        });
        return false;
    }
    if (!$("input#shippingRulePrice")[0].checkValidity()) {
        $("#shippingRuleForm #shippingRulePrice").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyShippingRuleErrors_invalidPrice,
            stay : false,
            type : "error"
        });
        return false;
    }
    if (!$("input#shippingRuleMinAmount")[0].checkValidity()) {
        $("#shippingRuleForm #shippingRuleMinAmount").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyShippingRuleErrors_invalidMinAmount,
            stay : false,
            type : "error"
        });
        return false;
    }
    if (!$("input#shippingRuleMaxAmount")[0].checkValidity()) {
        $("#shippingRuleForm #shippingRuleMaxAmount").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyShippingRuleErrors_invalidMaxAmount,
            stay : false,
            type : "error"
        });
        return false;
    }
    if(parseInt(parseFloat($("#shippingRuleMaxAmount").val())) < parseInt(parseFloat($("#shippingRuleMinAmount").val()))){
        $("#shippingRuleForm #shippingRuleMinAmount").focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : companyShippingRuleErrors_invalidMinAmountMaxAmount,
            stay : false,
            type : "error"
        });
        return false;
    }
    return true;
}

function companyShippingRulesAddNew(){
    var price = $("#shippingRulePrice").val();
    if(!isNaN(price) && price != ""){
        var sign = "";
        if(isNaN(price.substring(0, 1))){
            sign = price.substring(0, 1);
            price = price.substring(1);
        }
        price = parseInt(parseFloat(price) *  Math.pow(10, defaultCurrency.fractionDigits));
        price = sign + price;
    }

    var dataToSend = "countryCode=" + $("#shippingRuleCountry").val();
    dataToSend += "&price=" + encodeURIComponent(price);
    dataToSend += "&minAmount=" + encodeURIComponent(parseInt(parseFloat($("#shippingRuleMinAmount").val()) * Math.pow(10, defaultCurrency.fractionDigits)));
    dataToSend += "&maxAmount=" + encodeURIComponent(parseInt(parseFloat($("#shippingRuleMaxAmount").val()) * Math.pow(10, defaultCurrency.fractionDigits)));
    dataToSend += "&format=json";
    $.ajax({
        url : shippingRulesSaveUrl,
        type : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if (response.success) {
                jQuery.noticeAdd({
                    stayTime: 1000,
                    text: 'Creating asset on the server',
                    stay: false,
                    type: 'success'
                });
                companyShippingRulesDrawAll($("#shippingRuleCompanyId").val());
                $("#shippingRuleDialog").dialog("close");
            }
            else{
                jQuery.noticeAdd({
                    stayTime: 1000,
                    text: response.errors.minAmount,
                    stay: false,
                    type: 'error'
                });
            }
        },
        error: function(response, status){}
    });
}

function companyShippingRulesUpdate(){
    var price = $("#shippingRulePrice").val();
    if(!isNaN(price) && price != ""){
        var sign = "";
        if(isNaN(price.substring(0, 1))){
            sign = price.substring(0, 1);
            price = price.substring(1);
        }
        price = parseInt(parseFloat(price) *  Math.pow(10, defaultCurrency.fractionDigits));
        price = sign + price;
    }

    var dataToSend = "id=" + $("#shippingRuleId").val();
    dataToSend += "&countryCode=" + $("#shippingRuleCountry").val();
    dataToSend += "&price=" + encodeURIComponent(price);
    dataToSend += "&minAmount=" + encodeURIComponent(parseInt(parseFloat($("#shippingRuleMinAmount").val()) * Math.pow(10, defaultCurrency.fractionDigits)));
    dataToSend += "&maxAmount=" + encodeURIComponent(parseInt(parseFloat($("#shippingRuleMaxAmount").val()) * Math.pow(10, defaultCurrency.fractionDigits)));
    dataToSend += "&format=json";
    $.ajax({
        url : shippingRulesSaveUrl,
        type : "POST",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            if (response.success) {
                jQuery.noticeAdd({
                    stayTime: 1000,
                    text: 'Updating asset on the server',
                    stay: false,
                    type: 'success'
                });
                companyShippingRulesDrawAll($("#shippingRuleCompanyId").val());
                $("#shippingRuleDialog").dialog("close");
            }
            else{
                jQuery.noticeAdd({
                    stayTime: 1000,
                    text: response.errors.minAmount,
                    stay: false,
                    type: 'error'
                });
            }
        },
        error: function(response, status){}
    });
}

function companyShippingRulesDelete(){
    var dataToSend = "id=" + $("#shippingRuleId").val() + "&format=json";
    $.ajax({
        url : shippingRulesDeleteUrl,
        type : "POST",
        noticeType : "DELETE",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            companyShippingRulesDrawAll($("#shippingRuleCompanyId").val());
            $("#shippingRuleDialog").dialog("close");
        },
        error: function(response, status){}
    });
}