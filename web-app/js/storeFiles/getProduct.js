function gotoProductDetails(productId){
    var dataToSend = "id=" + productId+"&addToHistory="+true;
    //window.location.href = "getProduct?id=" + productId;
    $.ajax({
        url : getProductByIdUrl,
        type : "GET",
        data : dataToSend,
        dataType : "html",
        cache : false,
        async : true,
        success : function(response, status) {
            hideAllPanels()
            $('#productDetails').html(response);
            var catId =  $('#catId').val();
            var parent = findInCatTable(catId);
            var id = $('#productId').val();
            var name = $('#productName').val();
            drawBreadCrumbProduct(parent,id,name)
            $('.i-d-quantity').incrementBox({minVal:0,maxVal:999999});
            $('#productDetails').show();
        },
        error: function(result) {
            alert("Error in calling ajax product details");
        }
    });
}
function drawBreadCrumbProduct(obj,prodId,prodName){
    $('.breadcrumb').empty();
    if(obj.type == "child"){
        $('.breadcrumb').append('<a href="javascript:void(0)" onclick="javascript:refreshPage()" >Home</a>'+
            '&raquo; <a  id="cat-'+obj.idParent+'" title="'+obj.parentName+'"  type="cat" onclick="javascript:drawListProduct(this)">'+obj.parentName+'</a>'+
            '&raquo;<a href="javascript:void(0)" id="'+obj.id+'"  title="'+obj.name+'"  type="subCat" parentId="'+obj.idParent+'"  parentTitle="'+obj.parentName+'" onclick="javascript:drawListProduct(this)">'+obj.name+'</a>'+
            '&raquo;<a href="javascript:void(0)"  onclick="javascript:gotoProductDetails('+prodId+')">'+prodName+'</a>'
        );
    }
    else {
        $('.breadcrumb').append('<a href="javascript:void(0)" onclick="javascript:refreshPage()" >Home</a>'+
            '&raquo;<a href="javascript:void(0)" id="'+obj.id+'"  title="'+obj.name+'" type="cat"  onclick="javascript:drawListProduct(this)">'+obj.name+'</a>'+
            '&raquo;<a href="javascript:void(0)"  onclick="javascript:gotoProductDetails('+prodId+')">'+prodName+'</a>'
        );
    }
}