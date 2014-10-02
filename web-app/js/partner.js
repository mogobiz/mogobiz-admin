var translateLanguage = [];
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
			subnav.slideDown('fast');

		$(this).parent().hover(function() {
		}, function(){
			$(this).parent().find("ul.subnav").slideUp('slow');
		});
	});

    $("#active_company_div").click(function() {
        $(this).parent().find("ul.subnav").css('width', $("#user_name_div").width()+28+'px');
        $(this).parent().find("ul.subnav li").css('width', $("#user_name_div").width()+28+'px');
        $(this).parent().find("ul.subnav li a").css('width', $("#user_name_div").width()+3+'px');
        var subnav = $(this).parent().find("ul.subnav");
        if(subnav.is(':visible'))
            subnav.slideUp('slow');
        else
            subnav.slideDown('fast');

        $(this).parent().hover(function() {
        }, function(){
            $(this).parent().find("ul.subnav").slideUp('slow');
        });
    });
	
	if(sellerAdmin){
		$('#sellerAdmin').show();
	}
    partnerGetAllUserCompanies();
	catalogueLoadList();
	loadTranslateLanguages();
    countriesLoad();
});

var StateType = {
	ACTIF : 'actif',
	INACTIF : 'inactif',
	DELETED : 'deleted'
}

function loadTranslateLanguages(){
	$.ajax({
		url : languagesTranslationUrl,
		type : "GET",
		data : "",
		dataType : "json",
		cache : false,
		async : true,
		success : function(data, status) {
			translateLanguage = data;
		}
	});
}

function partnerGetAdminPage(partnerId) {
    $('#editCompanyTabs').remove();
    companyHashTable = [];
    companyTagsPageOffset = 0;
    companyIBeaconPageOffset = 0;
    compObjGetEditCompanyPage(sellerCompanyId, partnerId);
}

function partnerGetAllUserCompanies(){
    $.ajax({
        url : getAllCompaniesUrl,
        type : "GET",
        data : "id=" + partnerSellerId,
        dataType : "json",
        cache : false,
        async : true,
        success : function(data, status) {

        }
    });
}