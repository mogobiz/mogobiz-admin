var fbApiInit = false;

$(document).ready(function() {
	window.fbAsyncInit = function() {
		// initialize the FB JavaScript SDK
		if(!fbApiInit) {
			FBInit();
			fbApiInit = true;
		}
		FB.Canvas.setSize({ width: 760, height: 500 });
		
		// categories combo event listener
		$("#selectCategoriesCombo").change(function(){
			var dataToSend='searchTextInput=' + $('#searchTextInput').val() +'&comboValue='+$("#selectCategoriesCombo").val();
			goHome(dataToSend);
		});
		// search button event listener
		$("#searchButton").click(function(){
			var dataToSend='searchTextInput=' + $('#searchTextInput').val() +'&comboValue='+$("#selectCategoriesCombo").val();
			goHome(dataToSend);
		});
		//search text input event listener
		$("#searchTextInput").keyup(function(e){
			if (e.which === 13) {
				var dataToSend='searchTextInput=' + $('#searchTextInput').val() +'&comboValue='+$("#selectCategoriesCombo").val();
				goHome(dataToSend);
			}
		});
		
		listAllCategories();
	
		if($('#breadCrumb ul li').length <= 1 ) {
			$('#breadCrumb ul').append('<li><a href="javascript:void(0)" onclick="javascript:goToProductPage('+getHTTPParameter("productId")+')">'+getHTTPParameter("productName")+'</a></li>');
		}
	}
});