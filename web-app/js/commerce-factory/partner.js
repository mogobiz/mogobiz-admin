var menu;
var partnerActiveCompanyChanged = false;

$(document).ready(function() {
    $("#user_name_div").click(function() {
        $(this).parent().find("ul.subnav").css("width", $("#user_name_div").width() + 28 + "px");
        $(this).parent().find("ul.subnav li").css("width", $("#user_name_div").width() + 28 + "px");
        $(this).parent().find("ul.subnav li a").css("width", $("#user_name_div").width() + 3 + "px");
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
        $(this).parent().find("ul.subnav").css("width", $("#active_company_div").width() + 28 + "px");
        $(this).parent().find("ul.subnav li").css("width", $("#active_company_div").width() + 28 + "px");
        $(this).parent().find("ul.subnav li a").css("width", $("#active_company_div").width() + 3 + "px");
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

    $("#catalogMenuDiv").click(function() {
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

    partnerGetAllUserCompanies();
    catalogueLoadList();
    loadTranslateLanguages();
    countriesLoad();
    companiesLoad();
    addUserMenuList();
    addCatalogMenuList();
});

var StateType = {
    ACTIF : 'actif',
    INACTIF : 'inactif',
    DELETED : 'deleted'
};

function partnerGetProfilePage() {
    $("#editCompanyTabs, #editUserProfile").remove();
    $.get(
        profilePageUrl,
        function(responseText) {
            responseText = jQuery.trim(responseText);
            $(responseText).appendTo(document.body);
            userProfileGetDetails(partnerUserId);
        }, "html"
    );
}

function partnerGetAdminPage() {
    $("#editCompanyTabs, #editUserProfile").remove();
    companyHashTable = [];
    companyTagsPageOffset = 0;
    companyIBeaconPageOffset = 0;
    compGetUserPermission(sellerCompanyId, sellerCompanyCode, partnerUserId);
}

function partnerGetAllUserCompanies(){
    $.ajax({
        url : getAllCompaniesUrl,
        type : "GET",
        data : "id=" + partnerSellerId,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            var userCompanies = response.companies;
            var html = "";
            for(var i = 0; i < userCompanies.length; i++){
                html += "<li onclick='hideCompanySubnav();'><a href='javascript:void(0);' onclick='partnerChangeActiveCompany(\"" + userCompanies[i] + "\")'>" + userCompanies[i] + "</a></li>";
            }
            $("#active_company_div").html(response.company.code);
            $("#userCompanies ul.subnav").html(html);
        }
    });
}

function partnerChangeActiveCompany(companyCode){
    if(sellerCompanyCode == companyCode)
        return;
    $.ajax({
        url : setActiveCompanyUrl,
        type : "POST",
        data : "company.code=" + companyCode,
        dataType : "json",
        cache : false,
        async : true,
        success : function(response, status) {
            addUserMenuList();
            addCatalogMenuList();
            sellerCompanyId = response.company.id;
            sellerCompanyCode = response.company.code;
            sellerCompanyMapProvider = response.company.mapProvider;
            categorySelectedId = null;
            catalogSelectedId = null;
            partnerActiveCompanyChanged = false;
            $("#active_company_div").html(sellerCompanyCode);
            if($("#editCompanyTabs").is(":visible")) {
                partnerGetAdminPage();
                partnerActiveCompanyChanged = true;
            }
            else{
                $("#createProductMenu").detach().prependTo(document.body).hide();
                $("#items").empty().hide();
                $("#categoryTree").empty();
                $("#categoryDetails").empty();
                catalogueLoadList();
            }
        }
    });
}

function addUserMenuList(){
    $.get(
        userMenuListPageUrl,
        function (htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            $("#userMenuList").empty().html(htmlresponse);
        },
        "html"
    );
}

function addCatalogMenuList(){
    $.get(
        catalogMenuListPageUrl,
        {},
        function (htmlresponse) {
            htmlresponse = jQuery.trim(htmlresponse);
            $("#catalogMenuList").empty().html(htmlresponse);
        },
        "html"
    );
}