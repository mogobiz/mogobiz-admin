var menu;

$(document).ready(function() {
	$("#user_name_div").click(function() {
		$(this).parent().find("ul.subnav").css('width', $("#user_name_div").width()+28+'px');
		$(this).parent().find("ul.subnav li").css('width', $("#user_name_div").width()+28+'px');
		$(this).parent().find("ul.subnav li a").css('width', $("#user_name_div").width()+3+'px');
		var subnav = $(this).parent().find("ul.subnav");
		if(subnav.is(':visible'))
			subnav.slideUp('slow');
		else
			subnav.slideDown('fast').show();

		$(this).parent().hover(function() {
		}, function(){
			$(this).parent().find("ul.subnav").slideUp('slow'); //When the mouse hovers out of the subnav, move it back up
		});
	});
	$("#createCompanyLnk").hide();
	
	$('#items').empty();
	$("#searchForm").empty();
	$("#searchForm").show();
	$('#createCompanyLnk').prependTo('#searchForm');
	$('#createCompanyLnk').show();
	compObj_listFilter($("#searchForm"), $("#items"));
	getAllCompanies();
	$("#createCompanyLnk").unbind();
	$("#createCompanyLnk").click(function() {
		compObjGetCreateCompanyPage();
	});
	$('#items').show();
	countriesLoad();
});