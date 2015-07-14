var catalogProductsSearchTimeout = null;

function catalogProductsGetSearchPage(){
    $.get(
        catalogProductsSearchPageUrl,
        {},
        function (htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            catalogProductsInitSearchPage(htmlresponse);
        },
        "html"
    );
}

function catalogProductsInitSearchPage(htmlresponse){
    $("#categoriesMain").hide();
    $("#items").empty().html(htmlresponse).show();
    $("#catalogProductsCloseBtn").unbind().click(function() {
        $("#items").empty().hide(); // show catalog tree
        $("#categoriesMain").show();
        if($("#catalogGeneralDiv").is(":visible")){
            catalogResetRunningInterval();
        }
    });
    $("#catalogProductsSearchInput").keyup(function(){
        if(catalogProductsSearchTimeout)
            clearTimeout(catalogProductsSearchTimeout);
        if($(this).val().trim() == ""){
            $("#catalogProductsSearchResults").empty();
            return;
        }
        catalogProductsSearchTimeout = setTimeout(function(){
            $("#catalogProductsSearchResults").showLoading({"addClass": "loading-indicator-FacebookBig"});
            catalogProductsSearchProducts();
        }, 500);
    });
    $("#catalogProductsActiveOnly").click(function(){
        if($(this).val().trim() == ""){
            $("#catalogProductsSearchResults").empty();
            return;
        }
        $("#catalogProductsSearchResults").showLoading({"addClass": "loading-indicator-FacebookBig"});
        catalogProductsSearchProducts();
    });
}

function catalogProductsSearchProducts(){
    catalogProductsSearchTimeout = null;
    var dataToSend = "idCatalog=" + catalogSelectedId + "&query=" + $("#catalogProductsSearchInput").val() + "&activeOnly=" + $("#catalogProductsActiveOnly").is(":checked") + "&format=html";
    $.ajax({
        url : catalogProductsSearchUrl,
        type : "GET",
        data : dataToSend,
        dataType : "html",
        cache : false,
        async : true,
        success : function(htmlresponse, status) {
            $("#catalogProductsSearchResults").hideLoading();
            $("#items").hideLoading();
            $("#catalogProductsSearchResults").empty().html(htmlresponse);
        }
    });
}

function catalogProductsUpdateStatus(productId, status){
    var dataToSend = "product.id=" + productId;
    dataToSend += "&product.state.name=" + status;
    if (status == "ACTIVE") {
        dataToSend += "&social=true";
    }
    dataToSend += "&format=json";
    $.ajax( {
        url : updateProductUrl,
        type : "POST",
        noticeType : "PUT",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {}
    });
}