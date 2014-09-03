$(document).ready(function () {
	$('#paymentsContainer').showLoading({'addClass': 'store-loading-96'});
	//$('div#logoContainer a#site_logo').css('background-image','url("'+displayLogoUrl+'?store='+localStorage.getItem('store')+'&format=json")');

	
	callServer(listAllCategoriesUrl, '', function(response){
		getListAllCategories(response)
		$('#paymentsContainer').hideLoading();
	}, errorCallingServer);
	
	
/*	$("#filter_category_id").change(function(){
		if($("#filter_category_id").val()!=-1)
			listProductsByCategory({id:'category'+$("#filter_category_id").val(),title:$("#filter_category_id option:selected").text()});
	});*/
	
	$('#productPageLink').attr('href','getProduct?id=' + localStorage.getItem('productId') + '&store=' + localStorage.getItem('store'));
	
});

function addOptionToCombo(optionValue) {

	var combo= document.getElementById('paymentType');//should be translated to jquery
    var option = document.createElement("option");
    option.text = optionValue;
    option.value = optionValue;
    try {
        combo.add(option, null); //Standard
    }catch(error) {
        combo.add(option); // IE only
    }
    //when we like to submit//document.getElementById("formPayPal").submit(); 
}
