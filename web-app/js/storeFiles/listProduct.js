function drawListProduct(obj){
    var id = obj.id.substring(obj.id.lastIndexOf('-') + 1);
    hideAllPanels();
    var dataToSend = "format=json"
        if(obj.type=="brand")
            dataToSend +="&brandId="+id;
        else
            dataToSend+="&categoryId="+id;
    $.ajax({
        url : searchProductsUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            drawBreadCrumb(obj);
            drawAccordionMenu(id);
            drawFeaturedTab();
            drawLastVisetedTab();
            drawProductListSection(response);
            $('#productListSection').show();
            display('grid');

        },
        error: function(result) {
            alert("Error in calling ajax list Product");
        }
    });

}
function drawFeaturedTab(){
    $('#featuredBoxProductId').empty();
    $.each(featuredTab, function(i, value) {
        var picture='images/No_Image_Available.jpg';//should add no image available
        if(this.picture)
            picture=this.picture.url;
        $('#featuredBoxProductId').append('<div class="l_column">'+
            '<div class="image hidden-tablet">'+
            '<a href="javascript:void(0)"  onclick="gotoProductDetails('+this.id+')">'+
            '<img style="width:46px;" src="'+picture+'" >'+
            '</a>'+
            '</div>'+
            '<div class="name">'+
            '<a href="javascript:void(0)"  onclick="gotoProductDetails('+this.id+')">'+this.name+'</a>'+
            '</div>'+
            '<div class="price">'+this.price.price+'</div>'+
            '</div>');
    });


}
function drawLastVisetedTab(){
    $('#lastBoxProductId').empty();
    $.each(lastVisetedTab, function(i, value) {
        var picture='images/No_Image_Available.jpg';//should add no image available
        if(this.picture)
            picture=this.picture.url;
        $('#lastBoxProductId').append('<div class="l_column">'+
            '<div class="image hidden-tablet">'+
            '<a href="javascript:void(0)"  onclick="gotoProductDetails('+this.id+')">'+
            '<img style="width: 46px;" src="'+picture+'" >'+
            '</a>'+
            '</div>'+
            '<div class="name">'+
            '<a href="javascript:void(0)"  onclick="gotoProductDetails('+this.id+')">'+this.name+'</a>'+
            '</div>'+
            '<div class="price">'+this.price.price+'</div>'+
            '</div>');
    });

}
function display(view) {
    if (view == 'list') {
        $('.product-grid').attr('class', 'product-list');
        $('.product-list > div').each(function(index, element) {
            html = '<div class="left">';
            var image = $(element).find('.image').html();
            if (image != null) {
                html += '<div class="image span2">' + image + '</div>';
            }
            html += '<div class="span4">';
            html += '<div class="name">' + $(element).find('.name').html() + '</div>';

            html += '<div class="description">' + $(element).find('.description').html() + '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="span2">';
            var price = $(element).find('.price').html();
            if (price != null) {
                html += '<div class="price span2">' + price + '</div>';
            }
            html += '<div class="cart">' + $(element).find('.cart').html() + '</div>';
            $(element).html(html);
        });
        $('.display').html('Display:&nbsp;<img src="images/store/images/icon_list.png" alt="List" title="List"/><a onclick="display(\'grid\');">&nbsp;' +
            '<img src="images/store/images/icon_grid.png" alt="Grid" title="Grid"/></a>');
    }
    else {
        $('.product-list').attr('class', 'product-grid');
        $('.product-grid > div').each(function(index, element) {
            html = '';
            html += '<div class="pbox">';
            var image = $(element).find('.image').html();
            if (image != null) {
                html += '<div class="image">' + image + '</div>';
            }
            html += '<div class="description hidden-phone hidden-tablet">' + $(element).find('.description').html() + '</div>';
            html += '<div class="name">' + $(element).find('.name').html() + '</div>';
            var price = $(element).find('.price').html();
            if (price != null) {
                html += '<div class="price">' + price + '</div>';
            }
            html += '<div class="cart">' + $(element).find('.cart').html() + '</div>';
            html += '</div>';
            $(element).html(html);
        });
        $('.display').html('Display:&nbsp;<img src="images/store/images/icon_list.png" alt="List" title="List" onclick="display(\'list\');"/>&nbsp;' +
            '<img src="images/store/images/icon_grid.png" alt="Grid" title="Grid"/><a onclick="display(\'list\');">');
    }
}
function drawAccordionMenu(id){
    $('#accordion-1').empty();
    $.each(catTree, function() {
        var str = '' ;
        var subcatTab = this.subcat;
        var active = '' ;
        if(this.id == id  ){
            active = "active";
        }
        for(var i = 0; i < subcatTab.length; i ++){
            var activeChild = '' ;
            if(subcatTab[i].id == id ){
                activeChild = "active";
            }
            str+='<li><a  href="javascript:void(0)"   id="cat-'+subcatTab[i].id+'" title="'+subcatTab[i].name+'"  type="subCat"  parentId="'+subcatTab[i].idParent+'" parentTitle="'+subcatTab[i].parentName+'"   onclick="javascript:drawListProduct(this)" class="'+activeChild+'" >'+subcatTab[i].name+'</a></li>'
        }
        $('#accordion-1').append('<li>'+
            '<a  href="javascript:void(0)"  id="cat-'+this.id+'" title="'+this.name+'"  type="cat" onclick="javascript:drawListProduct(this)" class="'+active+'"  >'+this.name+'</a>'+
            '<div  class="dcjq-icon">&nbsp;&nbsp;&nbsp; </div>'+
            '<ul>'+str+'</ul>'+
            '</li>');
    });
    $('#accordion-1').dcAccordion({
        disableLink: false,
        menuClose: false,
        autoClose: true,
        autoExpand: true,
        saveState: false
    });

}
function drawProductListSection(data){
    var counter=0;
    $('#productListDivId').empty();
    $.each(data.list, function() {

        var picture='images/No_Image_Available.jpg';//should add no image available
        if(this.picture)
            picture=this.picture.url;

        var description = 'no description available';
        if(this.description!=null){
            if(this.description.length > 100)
                description = this.description.substring(0,100) +'...';
            else
                description = this.description;
        }
        if(counter%3==0)
            $('#productListDivId').append('<div class="span span-first-child">'+
                +'<div class="pbox">'+
                    '<div class="image">'+
                        '<a href="javascript:void(0)"  onclick="gotoProductDetails('+this.id+')">'+
                            '<img style="width:190px;height:150px" src="'+picture+'" >'+
                        '</a>'+
                    '</div>'+
                    ' <div class="description">'+ description +'</div>'+
                    '<div class="name">'+
                        '<a href="javascript:void(0)"  onclick="gotoProductDetails('+this.id+')">'+this.name+'</a>' +
                    '</div>'+
                    '<div class="price">'+this.price.price+'</div>'+
                    '<div class="cart">'+
                        '<input type="button" value="Add to Cart" onclick="gotoProductDetails('+this.id+')"  class="button"/>'+
                    '</div>'+
                '</div>'+
            '</div>' );
        else
            $('#productListDivId').append('<div class="span">'+
                +'<div class="pbox">'+
                    '<div class="image">'+
                        '<a href="javascript:void(0)"  onclick="gotoProductDetails('+this.id+')">'+
                            '<img  style="width:190px;height:150px" src="'+picture+'" >'+
                        '</a>'+
                    '</div>'+
                    ' <div class="description">'+ description +'</div>'+
                    '<div class="name">'+
                        '<a href="javascript:void(0)"  onclick="gotoProductDetails('+this.id+')">'+this.name+'</a>' +
                    '</div>'+
                    '<div class="price">'+this.price.price+'</div>'+
                    '<div class="cart">'+
                        '<input type="button" value="Add to Cart" onclick="gotoProductDetails('+this.id+')"  class="button"/>'+
                    '</div>'+
                '</div>'+
            '</div>');
        counter++;
    });
}
function drawBreadCrumb(obj){
    $('.breadcrumb').empty();
    $('.category-name').empty();
    $('.category-name').append('<h1>'+obj.title+'</h1>');
    if(obj.type == "subCat"){
        var parentId = obj.getAttribute('parentId');
        var parentTitle =  obj.getAttribute('parentTitle');
        $('.breadcrumb').append('<a href="javascript:void(0)" onclick="javascript:refreshPage()" >Home</a>'+
            '&raquo; <a  id="cat-'+parentId+'" title="'+parentTitle+'"  type="cat" onclick="javascript:drawListProduct(this)">'+parentTitle+'</a>'+
            '&raquo;<a href="javascript:void(0)" id="'+obj.id+'"  title="'+obj.title+'"  type="subCat" parentId="'+parentId+'"  parentTitle="'+parentTitle+'" onclick="javascript:drawListProduct(this)">'+obj.title+'</a>'
        );
    }
   else if(obj.type == "cat"){
        $('.breadcrumb').append('<a href="javascript:void(0)" onclick="javascript:refreshPage()" >Home</a>'+
            '&raquo;<a href="javascript:void(0)" id="'+obj.id+'"  title="'+obj.title+'" type="cat"  onclick="javascript:drawListProduct(this)">'+obj.title+'</a>'
        );
    }
    else if(obj.type == "brand"){
        $('.breadcrumb').append('<a href="javascript:void(0)" onclick="javascript:refreshPage()" >Home</a>'+
            '&raquo;<a href="javascript:void(0)" id="'+obj.id+'"  title="'+obj.title+'" type="brand"  onclick="javascript:drawListProduct(this)">'+obj.title+'</a>'
        );
    }
}