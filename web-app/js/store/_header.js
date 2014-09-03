var listProductsByCategoryCriteria = null;

jQuery(document).ready(function() {
	if (getHTTPParameter("store") != null) {
		localStorage.setItem('store', getHTTPParameter("store"));
	}
	$("#filter_category_id").change(function(){
		if($("#filter_category_id").val()!=-1){
			listProductsByCategoryCriteria = {id:'category'+$("#filter_category_id").val(),title:$("#filter_category_id option:selected").text()};
			//{id:'category'+$("#filter_category_id").val(),title:$("#filter_category_id option:selected").text()}
			listProductsByCategory();

		}
	});
	$('div#logoContainer a#site_logo').css('background-image','url("'+displayLogoUrl+'?store='+localStorage.getItem('store')+'&format=json")');
	
	// Set pages urls
	$('div#header #logoContainer a#site_logo').attr('href',pathUrl+'?store='+localStorage.getItem('store'));
	$('#system_navigation ul li#homePage a').attr('href',pathUrl+'?store='+localStorage.getItem('store'));
	$('li#menu_home a').attr('href',pathUrl+'?store='+localStorage.getItem('store'));
	$('#breadcrumbs a#breadcrumb_homePage').attr('href',pathUrl+'?store='+localStorage.getItem('store'));
	
});