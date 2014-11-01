var companyTagsGrid = null;
var companyTagsPageOffset = 0;
var companyTagsIBeaconsOptions;

function companyTagsGetIBeacons(){
    $.ajax({
        url : companyShowIBeaconUrl,
        type : "GET",
        data : "format=json",
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            companyTagsIBeaconsOptions = [];
            var iBeacons = response.list;
            if(iBeacons){
                for ( var i = 0; i < iBeacons.length; i++) {
                    var len = companyTagsIBeaconsOptions.length;
                    companyTagsIBeaconsOptions[len] = {
                        "value": iBeacons[i].id,
                        "text": iBeacons[i].name,
                        "style": "color: black;"
                    }
                    var date = iBeacons[i].endDate.substring(0, 2);
                    var month = parseInt(parseFloat(iBeacons[i].endDate.substring(3, 5)) - 1);
                    var year = iBeacons[i].endDate.substring(6, 10);
                    var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).getTime();
                    var endDate = new Date(year, month, date, 0, 0, 0, 0).getTime();
                    var lastDate = new Date(2049, 11, 31, 0, 0, 0, 0).getTime();
                    if(!iBeacons[i].active || (lastDate != endDate && endDate < today)){
                        companyTagsIBeaconsOptions[len].style = "color: red;";
                    }
                }
            }
            companyTagsDrawAll();
        }
    });
}

function companyTagsDrawAll(){
    companyTagsGrid = null;
    $.ajax({
        url : companyShowTagUrl,
        type : "GET",
        data : "pageSize=" + companyGridPageSize + "&pageOffset=" + companyTagsPageOffset + "&format=json",
        dataType : "json",
        async : true,
        success : function(response, status) {
            $("#tagsPagination").empty();
            if(response.totalCount > 0){
                $("#tagsPagination").paginate({
                    count: response.pageCount,
                    start: response.pageOffset + 1,
                    display: 24,
                    border: true,
                    border_color: "#A6C9E2",
                    text_color: "#075899",
                    background_color: "#FFFFFF",
                    border_hover_color: "#A6C9E2",
                    text_hover_color: "#FFFFFF",
                    background_hover_color: "#6D84B4",
                    rotate: true,
                    images: true,
                    mouse: "press",
                    onChange: function(page) {
                        if(companyTagsPageOffset == (page - 1)){
                            return;
                        }
                        companyTagsPageOffset = page - 1;
                        companyTagsDrawAll();
                    }
                });
                var margin = $("#tagsPagination").parent().parent().width() - $("#tagsPagination .jPag-control-back").width() - $("#tagsPagination .jPag-control-center").width() - $("#tagsPagination .jPag-control-front").width() - 7;
                $("#tagsPagination").css("margin-left", margin);
            }
            var gridColumns = [{
                id : "name",
                name : companyTagNameLabel,
                field : "name",
                width : 50,
                cssClass : ""
            },{
                id : "iBeaconName",
                name : companyTagIBeaconLabel,
                field : "iBeaconName",
                relatedField : "iBeaconId",
                width : 50,
                editor: Slick.Editors.Select,
                options: companyTagsIBeaconsOptions,
                editorEvents: {"change": companyTagsUpdateIBeacon},
                cssClass : ""
            }];

            var gridOptions = {
                editable : true,
                enableAddRow : false,
                asyncEditorLoading : false,
                forceFitColumns : true,
                enableCellNavigation : true,
                enableColumnReorder : false,
                rowHeight : 25,
                autoEdit: false
            };

            var gridData = [];
            var tags = response.list;
            if(tags){
                for ( var i = 0; i < tags.length; i++) {
                    gridData[gridData.length] = {
                        "id" : i,
                        "tagId": tags[i].id,
                        "name": tags[i].name,
                        "iBeaconId": tags[i].ibeacon ? tags[i].ibeacon.id : "",
                        "iBeaconName": tags[i].ibeacon ? tags[i].ibeacon.name : ""
                    }
                }
            }
            companyTagsGrid = new Slick.Grid($("#tagsGrid"), gridData, gridColumns, gridOptions);

            companyTagsGrid.setSelectionModel(new Slick.CellSelectionModel());
            companyTagsGrid.invalidate();
        }
    });
}

function companyTagsUpdateIBeacon(){
    companyTagsGrid.getEditorLock().commitCurrentEdit();
    companyTagsGrid.invalidate();
    var data = companyTagsGrid.getDataItem(companyTagsGrid.getSelectedRows()[0]);
    var dataToSend = "tagId=" + data.tagId + "&ibeaconId=" + data.iBeaconId + "&format=json";
    $.ajax({
        url : companySaveTagUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            companyTagsDrawAll();
        }
    });
}