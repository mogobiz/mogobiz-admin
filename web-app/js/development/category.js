var categoriesClickFromCategoriesLoad = false;

function categoriesLoad(product) {
	var categoryId;
	if (product) {
		var category = product.category;
		if (category) {
			categoryId = product.category.id;
		}
	}
	else if($('#productCategories').val())
		categoryId = $('#productCategories').val();

	var dataToSend = "catalog.id=" + catalogSelectedId + "&allCategories=true&format=json";
	$.ajax({
        url : showCategoryUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(data, status) {
            categoriesClickFromCategoriesLoad = true;
            var output = "";
            $.each(data, function(i, value) {
                var selected = (categoryId && categoryId == value.id);;
                output += '<option ' + (selected ? "selected " : "") + 'value="' + value.id + '">' + value.name + '</option>';
            });
            $('#productCategories').empty().html('' + output);
            $('#productCategories').multiselect('destroy');
            $('#productCategories').multiselect({
                header: false,
                multiple: false,
                noneSelectedText : categoryComboTitle,
                selectedList : 1
            });

            if(categoryId) {
                $('#productCategories').multiselect('uncheckAll');
                $('#productCategories').multiselect('refresh');
                $('#generalInfo .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_productCategories"]').each(function() {
                    if(this.value == categoryId) {
                        this.click();
                    }
                });
            }
            categoriesClickFromCategoriesLoad = false;
        }
    });
}