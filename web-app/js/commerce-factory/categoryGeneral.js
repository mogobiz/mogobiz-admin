var categoryGeneralInfoLoaded = false;
function categoryGeneralGetInfo() {
    categoryGeneralInfoLoaded = false;
    var dataToSend = "format=json&category.id=" + categorySelectedId;
    $.ajax({
        url : showCategoryUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $("#categoryEditHide").prop("checked", false);
            var cleditor_description = $("#categoryEditDescription").cleditor({
                width: $(".category-general-full").width() * 0.99,
                height: 150,
                controls: "bold italic underline | font size " +
                    "style | color highlight removeformat | bullets numbering | outdent " +
                    "indent | alignleft center alignright justify | undo redo | " +
                    "cut copy paste pastetext"
            })[0];
            var json = response;
            var newJson = new Object();
            for ( var key in json) {
                var newKey;
                newKey = "category." + key;
                newJson[newKey] = json[key];
            }

            var infoForm = document.forms['categoryEditGeneralForm'];
            $(infoForm).populate(newJson, {debug: false});
            if(json["hide"]){
                $("#categoryEditHide").prop("checked", true);
            }
            cleditor_description.updateFrame();
            cleditor_description.change(function(){
                cleditor_description.updateTextArea();
                categoryGeneralUpdateInfo("category.description", $("#categoryEditDescription"), $("#categoryEditDescription").val(), true);
            });
            if(catalogSelectedReadOnly){
                $("#categoryEditName, #categoryEditExternalCode, #categoryEditHide").unbind().attr("disabled", "disabled");
            }
            else {
                $("#categoryEditName").removeAttr("disabled").unbind().change(function () {
                    if (!$(this)[0].checkValidity()) {
                        jQuery.noticeAdd({
                            stayTime: 2000,
                            text: $(this)[0].validationMessage,
                            stay: false,
                            type: "error"
                        });
                        return false;
                    }
                    categoryGeneralUpdateInfo("category.name", $(this), $(this).val(), false);
                }).keyup(function () {
                    if ((/\\/).test($(this).val()))
                        $(this)[0].setCustomValidity(fieldsInvalidMessageLabel);
                    else
                        $(this)[0].setCustomValidity("");
                });
                $("#categoryEditExternalCode").removeAttr("disabled").unbind().change(function () {
                    categoryGeneralUpdateInfo("category.externalCode", $(this), $(this).val(), true);
                });
                $("#categoryEditHide").removeAttr("disabled").unbind().click(function () {
                    categoryGeneralUpdateInfo("category.hide", $(this), $(this).is(':checked'), false);
                });
            }
            categoryGeneralLoadIBeacons(json.ibeacon);
        }
    });
}

function categoryGeneralLoadIBeacons(iBeacon){
    var iBeaconId = "";
    if(iBeacon){
        iBeaconId = iBeacon.id;
    }
    $.ajax({
        url : companyShowIBeaconUrl,
        type : "GET",
        data : "format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var options = "<option selected value='-1' style='color: #777; font-style: italic;'>None</option>";
            var iBeacons = response.list;
            if(iBeacons){
                for ( var i = 0; i < iBeacons.length; i++) {
                    var date = iBeacons[i].endDate.substring(0, 2);
                    var month = parseInt(parseFloat(iBeacons[i].endDate.substring(3, 5)) - 1);
                    var year = iBeacons[i].endDate.substring(6, 10);
                    var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).getTime();
                    var endDate = new Date(year, month, date, 0, 0, 0, 0).getTime();
                    var lastDate = new Date(2049, 11, 31, 0, 0, 0, 0).getTime();
                    var style = "color: black;";
                    if(!iBeacons[i].active || (lastDate != endDate && endDate < today)){
                        style = "color: red;";
                    }
                    options += "<option " + ((iBeaconId == iBeacons[i].id) ? "selected " : "") + "value='" + iBeacons[i].id + "' style='" + style + "'>" + iBeacons[i].name + "</option>";
                }
            }
            $("#categoryEditIBeacon").empty().html("" + options).unbind();
            if(catalogSelectedReadOnly){
                $("#categoryEditIBeacon").attr("disabled", "disabled")
            }
            else {
                $("#categoryEditIBeacon").removeAttr("disabled").change(function () {
                    $(this).attr("style", $(this).find("option:selected").attr("style"));
                    categoryGeneralUpdateInfo("category.ibeaconId", $(this), $(this).val(), true);
                });
            }
            $("#categoryEditIBeacon").attr("style", $("#categoryEditIBeacon").find("option:selected").attr("style"));

            categoryGeneralInfoLoaded = true;
            if(categoryVariationsListLoaded && categoryFeatureListLoaded && categoryProductListLoaded && categoryTranslationListLoaded){
                $("#categoriesMain").hideLoading();
            }
        }
    });
}

function categoryGeneralUpdateInfo(property, field, value, allowBlank){
    if (!allowBlank && value.length == 0) {
        field.focus();
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsInvalidMessageLabel,
            stay : false,
            type : 'error'
        });
    }
    else if (value.length > 1024) {
        jQuery.noticeAdd({
            stayTime : 2000,
            text : fieldsTooLongMessageLabel,
            stay : false,
            type : 'error'
        });
    }
    else {
        var dataToSend = "category.id=" + categorySelectedId + "&category.parentId=" + $("#categoryEditParentId").val() + "&" + property + "=" + encodeURIComponent(value) + "&format=json";
        $.ajax( {
            url : updateCategoryUrl,
            type : "POST",
            noticeType : "PUT",
            data : dataToSend,
            dataType : "json",
            cache : false,
            async : true,
            success : function(response, status) {
                if(property == "category.name"){
                    var selectedNode = $("#categoryTreeList").jstree("get_selected");
                    $.jstree._focused().rename_node(selectedNode , value);
                }
            }
        });
    }
}