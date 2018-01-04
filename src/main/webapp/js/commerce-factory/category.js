var categoriesClickFromCategoriesLoad = false;
var categoriesNestedNodes = [];
var categoriesNestedNodesIndex = 0;
var categoriesRootNodes = [];

function categoriesLoad(product) {
    categoriesNestedNodes = [];
    categoriesNestedNodesIndex = 0;
    categoriesRootNodes = [];

	var categoryId = null;
	if (product) {
		var category = product.category;
		if (category) {
			categoryId = product.category.id;
		}
	}
	else if($('#productCategories').val())
		categoryId = $('#productCategories').val();

	var dataToSend = "catalog.id=" + catalogSelectedId + "&allCategories=false&format=html";
	$.ajax({
        url : showCategoryUrl,
        type : "GET",
        data : dataToSend,
        dataType : "html",
        cache : false,
        async : true,
        success : function(pageContent, status) {
            categoriesClickFromCategoriesLoad = true;
            categoriesRootNodes = pageContent.replaceAll("categoryTreeNode", "productCategoriesTreeNode");
            if(categoryId != null)
                categoriesGetNestedNodes(categoryId, product.id);
            else
                categoriesResolveTree(product.id);

            $('#productCategories').empty();
            $('#productCategories').multiselect('destroy');
            $('#productCategories').multiselect({
                header: false,
                multiple: false,
                noneSelectedText : categoryComboTitle,
                selectedList : 1
            });
            if (category)
                $($(".categoriesSelect button span")[1]).html(category.name);
        }
    });
}

function categoriesGetNestedNodes(categoryId, productId){
    var dataToSend = "category.id=" + categoryId + "&format=json";
    $.ajax({
        url : showCategoryUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            categoriesNestedNodes[categoriesNestedNodes.length] = response;
            if(response.parent){
                categoriesGetNestedNodes(response.parent.id, productId);
            }
            else{
                var tab = [];
                for(var i = categoriesNestedNodes.length - 1; i >= 0; i--){
                    tab[tab.length] = categoriesNestedNodes[i];
                }
                categoriesNestedNodes = tab;
                categoriesResolveTree(productId);
            }
        }
    });
}

function categoriesResolveTree(productId){
    var html = "<div class='productCategoriesComboTree'><div id='productCategoriesTreeList' value='-1'><ul><li id='productCategoriesTreeNode-0' value='0' class='loaded'>";
    html += "<a href='javascript:void(0)'>" + catalogSelectedName + "</a>";
    html += "<ul id='productCategoriesTreeNode-0-Childs'>" + categoriesRootNodes + "</ul></li></div></div>";
    $(".categoriesSelect .ui-multiselect-menu").empty().append(html);

    $("#productCategoriesTreeList").jstree({
        "themes" : {
            theme : "default",
            url : false,
            dots : true,
            icons : false
        },
        "plugins" : [ "themes", "html_data", "ui", "unique" ]
    })
    .bind("open_node.jstree", function (event, data) {
        if(! $("#" + data.rslt.obj[0].id).hasClass("loaded")){
            categoriesTreeDrawChilds(data.rslt.obj[0].value, false);
            setTimeout(function () { $.jstree._reference("#" + data.rslt.obj[0].id).close_node("#" + data.rslt.obj[0].id); }, 1);
        }
    })
    .bind("select_node.jstree", function (event, data) {
        if(data.rslt.obj[0].value == 0 || categoriesClickFromCategoriesLoad){
            return;
        }
        var dataToSend = "product.id=" + productId;
        dataToSend += "&product.category.id=" + data.rslt.obj[0].value;
        dataToSend += "&format=json";
        $.ajax({
            url : updateProductUrl,
            type : "POST",
            noticeType : "PUT",
            data : dataToSend,
            dataType : "json",
            cache : false,
            async : true,
            success : function(response, status) {}
        });
        $($(".categoriesSelect button span")[1]).html(data.args[0].text);
        $("#productCategories").multiselect("close");
    })
    .bind("before.jstree", function (e, data) {
        $("#productCategoriesTreeList ul > li > a > ins").remove();
    });
    setTimeout(function () {
        categoriesClickFromCategoriesLoad = true;
        $.jstree._reference("#productCategoriesTreeList").open_node("#productCategoriesTreeNode-0");
        if(categoriesNestedNodes.length == 0) {
            $.jstree._reference("#productCategoriesTreeList").select_node("#productCategoriesTreeNode-0");
            categoriesClickFromCategoriesLoad = false;
        }
        else if(categoriesNestedNodes.length == 1) {
            $.jstree._reference("#productCategoriesTreeList").select_node("#productCategoriesTreeNode-" + categoriesNestedNodes[0].id);
            categoriesClickFromCategoriesLoad = false;
        }
        else {
            categoriesNestedNodesIndex = 0;
            categoriesTreeDrawNestedChilds();
        }
    }, 1);
}

function categoriesTreeDrawNestedChilds(){
    var dataToSend = "category.parentId=" + categoriesNestedNodes[categoriesNestedNodesIndex].id + "&format=html";
    $.ajax({
        url : showCategoryUrl,
        type : "GET",
        data : dataToSend,
        dataType : "html",
        cache : false,
        async : true,
        success : function(pageContent, status) {
            var html = pageContent.replaceAll("categoryTreeNode", "productCategoriesTreeNode");
            if(html.indexOf("<li") >= 0){
                $("#productCategoriesTreeNode-" + categoriesNestedNodes[categoriesNestedNodesIndex].id + "-Childs").html(html);
            }
            else{
                $("#productCategoriesTreeNode-" + categoriesNestedNodes[categoriesNestedNodesIndex].id ).addClass("jstree-leaf");
                $("#productCategoriesTreeNode-" + categoriesNestedNodes[categoriesNestedNodesIndex].id + "-Childs").remove();
            }
            $("#productCategoriesTreeNode-" + categoriesNestedNodes[categoriesNestedNodesIndex].id ).addClass("loaded");
            $("#productCategoriesTreeList").jstree("refresh");

            setTimeout(function () {
                $("#productCategoriesTreeList").jstree("set_focus");
                $.jstree._reference("#productCategoriesTreeList").open_node("#productCategoriesTreeNode-" + categoriesNestedNodes[categoriesNestedNodesIndex].id);
                categoriesNestedNodesIndex++;
                if(categoriesNestedNodesIndex < categoriesNestedNodes.length - 1){
                    categoriesTreeDrawNestedChilds();
                }
                else{
                    $.jstree._reference("#productCategoriesTreeList").select_node("#productCategoriesTreeNode-" + categoriesNestedNodes[categoriesNestedNodesIndex].id);
                    categoriesClickFromCategoriesLoad = false;
                }
            }, 1);
        }
    });
}

function categoriesTreeDrawChilds(id){
    var dataToSend = "category.parentId=" + id + "&format=html";
    $.ajax({
        url : showCategoryUrl,
        type : "GET",
        data : dataToSend,
        dataType : "html",
        cache : false,
        async : true,
        success : function(pageContent, status) {
            var html = pageContent.replaceAll("categoryTreeNode", "productCategoriesTreeNode");;
            if(html.indexOf("<li") >= 0){
                $("#productCategoriesTreeNode-" + id + "-Childs").html(html);
            }
            else{
                $("#productCategoriesTreeNode-" + id ).addClass("jstree-leaf");
                $("#productCategoriesTreeNode-" + id + "-Childs").remove();
            }
            $("#productCategoriesTreeNode-" + id ).addClass("loaded");
            $("#productCategoriesTreeList").jstree("refresh");

            setTimeout(function () { $("#productCategoriesTreeList").jstree("set_focus"); }, 1);
            setTimeout(function () { $.jstree._reference("#productCategoriesTreeList").open_node("#productCategoriesTreeNode-" + id); }, 1);
        }
    });
}