jQuery(document).ready(function() {
	//$('div#logoContainer a#site_logo').css('background-image','url("'+displayLogoUrl+'?store='+localStorage.getItem('store')+'&format=json")');

/*	$("#filter_category_id").change(function(){
		if($("#filter_category_id").val()!=-1)
			listProductsByCategoryGlobal({id:'category'+$("#filter_category_id").val(),title:$("#filter_category_id option:selected").text()});
	});*/
	
	$("#searchByText").click(function(){
		searchProducts($('#filter_keyword').val());
	});
	//search text input event listener
	$("#filter_keyword").keyup(function(e){
		if (e.which === 13) {
			if ($('#filter_keyword').val() == "") {
				listAllProducts("alpha","desc")
			}
			else {
				searchProducts($('#filter_keyword').val());
			}
		}
	});

	listAllCategories();
	listAllCart(fillCartMenu);
});