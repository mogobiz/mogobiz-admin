var currency = '';
var catTree = [];
var featuredTab = [] ;
var lastVisetedTab = [] ;
$(document).ready(function () {
    /*$('#carousel-featured-0, #carousel-latest-0').elastislide({
     speed       : 450,	// animation speed
     easing      : '',	// animation easing effect
     minItems	: 1		// the minimum number of items to show. When we resize the window, this will make sure minItems are always shown (unless of course minItems is higher than the total number of elements)
     });*/
    //Fix to adjust on windows resize
    $(window).triggerHandler('resize.elastislide');
    storeGetAllCategories();
    storeGetAllBrands();
    storeGetAllCountries();
    storeGetAllCurrencies();
    storeGetFeaturedProducts();
    storeGetLastVistedProducts();
});

function storeGetAllCategories(){
    var dataToSend = "format=json";
    $.ajax({
        url : listAllCategoriesUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var l = 0;
            catTree = [];
            var getSubCategories = function(){
                catTree[l] = response[l] ;
                var idParent = catTree[l].id;
                var parentName = catTree[l].name;
                var dataToSend = "format=json&parentId="+idParent;
                $.ajax({
                    url : listAllCategoriesUrl,
                    type : "GET",
                    data : dataToSend,
                    dataType : "json",
                    cache : false,
                    async : true,
                    success : function(res, status) {
                        catTree[l].subcat = res;
                        $.each(catTree[l].subcat, function() {
                                this.idParent = idParent;
                                this.type = 'child';
                                this.parentName = parentName;
                            }
                        )
                        l++
                        if(l == response.length){
                            console.log(catTree)
                            drawMenuCat();
                            drawMenuCatForPhone();
                        }

                        else
                            getSubCategories();
                    },
                    error: function(result) {
                        alert("Error in calling ajax list categories");
                    }
                });
            }
            getSubCategories();

        },
        error: function(result) {
            alert("Error in calling ajax list categories");
        }
    });
}
function storeGetAllBrands(){
    var dataToSend = "format=json";
    $.ajax({
        url : listAllBrandsUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $('#BrandsMenu').empty();
            var counter=0;
            $('#BrandsMenu').attr('class',(response.length < 8)?'span'+((response.length)+1):'span8');
            $.each(response, function() {
                if(counter%8==0)
                    $('#BrandsMenu').append('<div class="span1 span-first-child">'+
                        '<div  class="image">'+
                        '<a  href="javascript:void(0)"  id="brand-'+this.id+'" title="'+this.name+'"  type="brand"  onclick="javascript:drawListProduct(this)">'+this.name+'</a>'+
                        '</div>'+
                        '</div>');
                else
                    $('#BrandsMenu').append('<div class="span1">'+
                        '<div class="image">'+
                        '<a  href="javascript:void(0)"    id="brand-'+this.id+'" title="'+this.name+'"  type="brand"  onclick="javascript:drawListProduct(this)" >'+this.name+'</a>'+
                        '</div>'+
                        '</div>');
                counter++;
            });
        },
        error: function(result) {
            alert("Error in calling ajax list categories");
        }
    });

}
function storeGetAllCountries(){
    var dataToSend = "format=json";
    $.ajax({
        url : listAllCountriesUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            console.log(response)
            $('#countriesId').empty();
            $.each(response, function(i, value) {

                $('#countriesId').append('<li>'+
                    '<a  href="javascript:void(0)" id="country-'+value.code+'"   title="'+value.name+'" >'+this.name+'</a>'+
                    '</li>');
            });
        },
        error: function(result) {
            alert("Error in calling ajax list Countries");
        }
    });
}
function storeGetAllCurrencies(){
    var dataToSend = "format=json";
    $.ajax({
        url : listAlCurrenciesUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            console.log(response)
            $('#currenciesId').empty();
            $.each(response, function(i, value) {
                $('#currenciesId').append('<li>'+
                    '<a  href="javascript:void(0)" id="currency-'+value.code+'"   title="'+value.name+'" >'+this.name+'</a>'+
                    '</li>');
            });
        },
        error: function(result) {

            alert("Error in calling ajax list currencies");
        }
    });
}
function storeGetFeaturedProducts(){
    $('#featuredList').showLoading({'addClass': 'loading-indicator'});
    var dataToSend = "format=json&currency=EUR";
    $.ajax({
        url : listFeaturedProductsUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $('#featuredList').empty();
            featuredTab = response.list;
            $.each(response.list, function() {
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
                $('#featuredList').append('<li style="margin-right: 15px;">'+
                    '<div class="pbox">'+
                    '<div class="image">'+
                    '<a href="javascript:void(0)">'+
                    '<img src="'+picture+'"  onclick="gotoProductDetails('+this.id+')" >'+
                    '</a>'+
                    '</div>'+
                    '<div class="description hidden-phone hidden-tablet">'+
                    description +
                    '</div>'+
                    '<div class="name">'+
                    '<a href="javascript:void(0)"  onclick="gotoProductDetails('+this.id+')" >'+this.name+'</a>'+
                    '</div>'+
                    '<div class="price">'+this.price.price+'</div>'+
                    '<div class="cart">'+
                    '<input type="button" value="Add to Cart" onclick="gotoProductDetails('+this.id+')"  class="button">'+
                    '</div>'+
                    '</div>'+
                    '</li>');
            });
            $('#carousel-featured-0').elastislide({
                speed       : 450,	// animation speed
                easing      : '',	// animation easing effect
                minItems	: 1		// the minimum number of items to show. When we resize the window, this will make sure minItems are always shown (unless of course minItems is higher than the total number of elements)
            });
            $('#tabs a').tabs();
            $('#featuredList').hideLoading();

        },
        error: function(result) {
            $('#featuredList').hideLoading();
            alert("Error in calling ajax list categories");
        }
    });

}
function storeGetLastVistedProducts(){
    $('#LastVisetedList').showLoading({'addClass': 'loading-indicator'});
    var dataToSend = "format=json";
    $.ajax({
        url : listLastVisitedProductsUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            $('#LastVisetedList').empty();
            lastVisetedTab = response;
            $.each(response, function() {
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
                $('#LastVisetedList').append('<li style="margin-right: 15px;">'+
                    '<div class="pbox">'+
                    '<div class="image">'+
                    '<a href="javascript:void(0)">'+
                    '<img src="'+picture+'"  onclick="gotoProductDetails('+this.id+')" >'+
                    '</a>'+
                    '</div>'+
                    '<div class="description hidden-phone hidden-tablet">'+
                    description +
                    '</div>'+
                    '<div class="name">'+
                    '<a href="javascript:void(0)"  onclick="gotoProductDetails('+this.id+')" >'+this.name+'</a>'+
                    '</div>'+
                    '<div class="price">'+this.price.price+'</div>'+
                    '<div class="cart">'+
                    '<input type="button" value="Add to Cart" onclick="gotoProductDetails('+this.id+')"  class="button">'+
                    '</div>'+
                    '</div>'+
                    '</li>');
            });
            $('#carousel-latest-0').elastislide({
                speed       : 450,	// animation speed
                easing      : '',	// animation easing effect
                minItems	: 1		// the minimum number of items to show. When we resize the window, this will make sure minItems are always shown (unless of course minItems is higher than the total number of elements)
            });
            $('#LastVisetedList').hideLoading();

        },
        error: function(result) {
            $('#LastVisetedList').hideLoading();
            alert("Error in calling ajax list last visited");
        }
    });

}
function drawMenuCat(){
    $('#CategoriesMenu').empty();
    var counter=0;
    $.each(catTree, function(i, value) {
        var str = '' ;
        var subcatTab = this.subcat;
        $.each(subcatTab, function(i, val) {
            str+='<li><a  href="javascript:void(0)"  id="cat-'+val.id+'" title="'+val.name+'"  type="subCat"  parentId="'+val.idParent+'" parentTitle="'+val.parentName+'" onclick="javascript:drawListProduct(this)">'+val.name+'</a></li>'
        })
        $('#CategoriesMenu').attr('class',(catTree.length < 5)?'span'+((catTree.length*2)+1):'span10');
        if(counter%5==0)
            $('#CategoriesMenu').append('<div class="span2 span-first-child">'+
                '<div class="menu-category-wall-sub-name">'+
                '<a  href="javascript:void(0)"  id="cat-'+value.id+'"  title="'+value.name+'"  type="cat" onclick="javascript:drawListProduct(this)" >'+this.name+'</a>'+
                '</div>'+
                '<div>'+
                '<ul>'+str+'</ul>'+
                '</div>'+
                '</div>');
        else
            $('#CategoriesMenu').append('<div class="span2">'+
                '<div class="menu-category-wall-sub-name">'+
                '<a  href="javascript:void(0)" id="cat-'+value.id+'"  title="'+value.name+'"  type="cat" onclick="javascript:drawListProduct(this)">'+this.name+'</a>'+
                '</div>'+
                '<div>'+
                '<ul>'+str+'</ul>'+
                '</div>'+
                '</div>');
        counter++;
    });

}
function drawMenuCatForPhone(){
    $('#CategoriesMenuPhone').empty();
    var counter=0;
    $.each(catTree, function(i, value) {
        var str = '' ;
        var subcatTab = this.subcat;
        $.each(subcatTab, function(i, val) {
            str+='<li><a  href="javascript:void(0)" id="cat-'+val.id+'" title="'+val.name+'"  type="subCat"  parentId="'+val.idParent+'" parentTitle="'+val.parentName+'" onclick="javascript:drawListProduct(this)">'+val.name+'</a></li>'
        })
        $('#CategoriesMenuPhone').append('<li>'+
            '<a  href="javascript:void(0)" id="cat-'+value.id+'"   title="'+value.name+'"  type="cat" onclick="javascript:drawListProduct(this)" >'+this.name+'</a>'+
            '<div>'+
            '<ul>'+str+'</ul>'+
            '</div>'+
            '</li>');
    });

}
function hideAllPanels(){
    $('#midsection').hide();
    $('#productDetails').hide();
    $('#productListSection').hide();
}
function refreshPage(){
    location.reload();
}
function getHTTPParameter(paramName) {
    var parameters = document.location.search;
    if (parameters != null && parameters.length > 0) {
        parameters = parameters.substring(1);
        var parametersArray = parameters.split("&");
        for (var i = 0; i < parametersArray.length; i++) {
            var param = parametersArray[i].split("=");
            if (param[0] == paramName) {
                return decodeURI(param[1]);
            }
        }
    }
    return null;
}
function findInCatTable(id){
    for (var i = 0;i < catTree.length ; i++){
        var item = catTree[i];
      if( catTree[i].id==id ){
          return item;
      }
      else if(catTree[i].subcat.length > 0  ) {
          var sabCat = catTree[i].subcat;
          for (var j = 0;j < sabCat.length ; j++){
              var itemSub = sabCat[j];
              if(sabCat[j].id==id){
                return itemSub;
              }
          }
       }
    }
}