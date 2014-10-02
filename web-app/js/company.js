var compId;
var companyHashTable = [];
var companyGridPageSize = 12;

jQuery.expr[':'].Contains = function(a, i, m) {
	return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

// Filter
function compObj_listFilter(header, list) {
	var form = $("<form  onsubmit='return false;'>").attr({
		"class" : "filterform",
		"action" : "#"
	}),
	input = $("<input>").attr({
		"class" : "filterinput",
		"type" : "text",
		"placeHolder" : defaultSearchLabel + '...'
	});
	// add components of search form
	$(form).append(input).appendTo(header);
	$(input).change(function() {
		var filter = $(this).val();
		if (filter) {
			var objNotContain = $(list).find("li a.listTitle:not(:Contains(" + filter + "))").parent();
			var objContain = $(list).find("li a.listTitle:Contains(" + filter + ")").parent();
			objNotContain.slideUp();
			objContain.slideDown('fast');
		} else {
			$(list).find("li").slideDown();
		}
		return false;
	}).keyup(function() {
		$(this).change();
	});
}

function loadComboData(comboId, data) {
	$(comboId).empty();
	var auxArr = [];
	$.each(data, function(i, value) {
		$(comboId).append("<option value='" + value.code + "'>" + value.name + "</option>");
	});
}

/**
 * create a company
 */

function compObjGetCreateCompanyPage() {
	$.get(
		createCompanyPageUrl,
		{},
		function(responseText) {
			responseText = jQuery.trim(responseText);
			createCompanyPageSetup(responseText);
		},
		"html"
	);
}

function createCompanyPageSetup(responseText){
	if ($('#createCompanyDialog').dialog( "isOpen" ) !== true) {
		$('#createCompanyDialog').empty();
		$('#createCompanyDialog').html(responseText);
		$('#createCompanyDialog').dialog({
			width : 'auto',
			height : 'auto',
			title : createCompanyLabel,
			resizable: false,
			modal: true,
			open: function(event) {
				loadComboData('#createCompanyCountry', countries);
				drawSelectComboBox('#createCompanyCountry');
				$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
				$('.ui-dialog-buttonpane').find('button:contains("createLabel")').addClass("ui-create-button");
				$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">'+cancelLabel+'</span>');
				$('.ui-dialog-buttonpane').find('button:contains("createLabel")').html('<span class="ui-button-text">'+createLabel+'</span>');
			},
			buttons : {
				cancelLabel : function() {
					$('#createCompanyDialog').empty();
					$("#createCompanyDialog").dialog("close");
				},
				createLabel : function() {
					validateCreateCompanyForm();
				}
			}
		});
	}
}

function validateCreateCompanyForm(){
	if($('#createCompanyName').val() == ""){
		$('#createCompanyName').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companyGeneralErrors_requiredStoreNameLabel,
			stay : false,
			type : 'error'
		});
		return;
	}
	if(!$('input#createCompanyName')[0].checkValidity()){
		$('#createCompanyName').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companyGeneralErrors_invalidStoreNameLabel,
			stay : false,
			type : 'error'
		});
		return;
	}
	if($('#createCompanyCode').val() == ""){
		$('#createCompanyCode').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companyGeneralErrors_requiredStoreCodeLabel,
			stay : false,
			type : 'error'
		});
		return;
	}
	if(!$('input#createCompanyCode')[0].checkValidity()){
		$('#createCompanyCode').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companyGeneralErrors_invalidStoreCodeLabel,
			stay : false,
			type : 'error'
		});
		return;
	}
	if($('#createCompanyEmail').val() == ""){
		$('#createCompanyEmail').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companyGeneralErrors_requiredEmailLabel,
			stay : false,
			type : 'error'
		});
		return;
	}
	if(!$('input#createCompanyEmail')[0].checkValidity()){
		$('#createCompanyEmail').focus();
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companyGeneralErrors_invalidEmailLabel,
			stay : false,
			type : 'error'
		});
		return;
	}
	if($('#createCompanyCountry').val() == null) {
		jQuery.noticeAdd({
			stayTime : 2000,
			text : companyGeneralErrors_requiredCountryLabel,
			stay : false,
			type : 'error'
		});
		return;
	}
	checkUniqueCompanyName();
}

function checkUniqueCompanyName(){
	$.ajax({
		url : existCompanyNameUrl,
		type : "GET",
		data : "name=" + $('#createCompanyName').val(),
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			var existCode  = response.result;
			if (existCode == "success"){
				checkUniqueCompanyCode()
			}
			else {
				jQuery.noticeAdd({
					stayTime : 2000,
					text : companyNameExistLabel,
					stay : false,
					type : 'error'
				});
				$('#createCompanyName').focus();
				$('#createCompanyName').css("background-image", 'url("../images/uncheck.png")');
				$("#createCompanyName").unbind();
				$("#createCompanyName").keyup(function() {
					$('#createCompanyName').removeAttr("style");
				});
			}
		}
	});
}

function checkUniqueCompanyCode(){
	$.ajax({
		url : existCompanyNameUrl,
		type : "GET",
		data : "name=" + $('#createCompanyCode').val(),
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			var existCode  = response.result;
			if (existCode == "success"){
				checkUniqueSellerMail()
			}
			else {
				jQuery.noticeAdd({
					stayTime : 2000,
					text : companyNameExistLabel,
					stay : false,
					type : 'error'
				});
				$('#createCompanyCode').focus();
				$('#createCompanyCode').css("background-image", 'url("../images/uncheck.png")');
				$("#createCompanyCode").unbind();
				$("#createCompanyCode").keyup(function() {
					$('#createCompanyCode').removeAttr("style");
				});
			}
		}
	});
}

function checkUniqueSellerMail(){
	$.ajax({
		url : existSellerEmailUrl,
		type : "GET",
		data : "email=" + $('#createCompanyEmail').val(),
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			var existCode  = response.result;
			if (existCode == "success"){
				createCompany()
			}
			else {
				jQuery.noticeAdd({
					stayTime : 2000,
					text : companySellersErrors_emailMustBeUniqueLabel,
					stay : false,
					type : 'error'
				});
				$('#createCompanyEmail').focus();
				$('#createCompanyEmail').css("background-image", 'url("../images/uncheck.png")');
				$("#createCompanyEmail").unbind();
				$("#createCompanyEmail").keyup(function() {
					$('#createCompanyEmail').removeAttr("style");
				});
			}
		}
	});
}

function createCompany(){
	var dataToSend = $('#companyAddForm').serialize();
	dataToSend += "&format=json";
	$.ajax({
		url : createCompanyUrl,
		type : "POST",
		noticeType : "POST",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if(response.success){
				getAllCompanies();
				$('#createCompanyDialog').empty();
				$('#createCompanyDialog').dialog("close");
			}
		}
	});
}

/**
 * Edit a company
 */

function compObjGetEditCompanyPage(compId, partnerId) {
	$.get(companyPageUrl, {}, function(responseText) {
		responseText = jQuery.trim(responseText);
		$(responseText).appendTo(document.body);
		if(!partnerId){
            $("#brandsLi").hide().remove();
            $("#brands").hide().remove();
            $("#couponsLi").hide().remove();
            $("#coupons").hide().remove();
            $("#publishingLi").hide().remove();
            $("#publishing").hide().remove();
            $("#iBeaconLi").hide().remove();
            $("#iBeacon").hide().remove();
            $("#tagsLi").hide().remove();
            $("#tags").hide().remove();
		}
		compObjAttachEditForm(compId, partnerId);
	}, "html");
}

function compObjAttachEditForm(compId, partnerId) {
	var dataToSend = "format=json";
	dataToSend+= '&id='+compId;
	if(partnerId){
		$("#categoriesMain").hide();
		$("#items").empty().show();
	}
	$('#items').showLoading({'addClass': 'loading-indicator-FacebookBig'});
	
	$.ajax({
		url : showCompanyUrl+'?'+dataToSend,
		type : "GET",
		data : '',
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			companyTaxFirstVisit = true;
			$('#items').hideLoading();
			companyHashTable = [];
			var loc = false;
			var company = response;
			var location = company.location;
			var country = location ? location.country : {};
			var region = location ? location.region : {};
			var idSpanDesc = '#description' + compId;
			var idDivDetails = '#details' + compId;
			var locationHtmlId = "<input type='hidden' name='company.location.id' id='locId'/>";
			if (location) {
				var loc = true;
				$(idDivDetails).append(locationHtmlId);
			}
			$(idSpanDesc).show();
			
			//////////////////
			$('#items').empty();
			$("#searchForm").hide();
			$('#editCompanyTabs').detach().prependTo('#items');
			$('#editCompanyTabs').show();
			$('#companyTitle').show();
			$('#companyTitle').empty();
			$('#companyTitle').append(company.code.toString());

			$('#editTabs').attr('style', 'display:block;');
			$('#generalTab').addClass('selected');
			
			// Tabs click action
			$('#editCompanyTabs .tabs a').click(function() {
				$('#editCompanyTabs .tabs .selected').removeClass('selected');
				$(this).addClass('selected');
				var selectedTabId = $(this).attr('id');
				if (selectedTabId == 'generalTab') {
					$('#description').hide();
					$('#design').hide();
					$('#shipping').hide();
					$('#tax').hide();
					$('#payment').hide();
                    $('#sellers').hide();
                    $('#brands').hide();
                    $('#coupons').hide();
                    $('#publishing').hide();
                    $('#apiKeys').hide();
                    $('#iBeacon').hide();
                    $('#tags').hide();
					$('#generalInfo').show();
					$('#generalForm .errors').hide();
					
					if (!companyHashTable['generalInfo']) {
						companyHashTable['generalInfo'] = new Object();
					}
					// Check if tab is visited before
					if (!companyHashTable['generalInfo'].visited) {
						companyHashTable['generalInfo'].visited = true;
						loadComboData('#generalCountry', countries);
						
						// draw select combo boxes
						drawSelectComboBox('#generalCountry');

						//Fill General Tab
						companyGetGeneralInfo(response);

                        //Set auto update control
                        companyGeneralAutoUpdateField(compId, "#generalCity", "company.location.city", true, false);
                        companyGeneralAutoUpdateField(compId, "#generalPostalCode", "company.location.postalCode", true, false);
                        companyGeneralAutoUpdateField(compId, "#generalPhoneNumber", "company.phone", true, true);
                        companyGeneralAutoUpdateField(compId, "#generalAddress1", "company.location.road1", true, false);
                        companyGeneralAutoUpdateField(compId, "#generalAddress2", "company.location.road2", true, false);
                        companyGeneralAutoUpdateField(compId, "#generalWebsite", "company.website", true, true);
                        companyGeneralAutoUpdateField(compId, "#generalEmail", "company.email", true, true);
                        companyGeneralMultiSelectAutoUpdate(compId, "#generalCountry", "company.location.countryCode");
					}
				}
				else if (selectedTabId == 'shippingTab') {
					$('#generalInfo').hide();
					$('#description').hide();
					$('#design').hide();
					$('#tax').hide();
					$('#payment').hide();
					$('#sellers').hide();
                    $('#brands').hide();
                    $('#coupons').hide();
                    $('#publishing').hide();
                    $('#apiKeys').hide();
                    $('#iBeacon').hide();
                    $('#tags').hide();
					$('#shipping').show();
					$('#shippingForm .errors').hide();
										
					if (!companyHashTable['shipping']) {
						companyHashTable['shipping'] = new Object();
					}
					// Check if tab is visited before
					if (!companyHashTable['shipping'].visited) {
						companyHashTable['shipping'].visited = true;
						loadComboData('#shippingCountry', countries);
						
						// draw Shipping Carriers MultiSelectList
						drawShippingCarriersMultiSelectList();
						
						// draw select combo boxes
						drawSelectComboBox('#shippingCountry');
						drawSelectComboBox('#shippingRefundPolicy');
						drawSelectComboBox('#shippingWeightUnit');
						
						//Fill Shipping Tab
						companyGetShippingPolicy(compId);

                        //Set auto update control
                        companyShippingAutoUpdateField(compId, "#shippingCity", "company.shipFrom.city", true, false);
                        companyShippingAutoUpdateField(compId, "#shippingPostalCode", "company.shipFrom.postalCode", true, false);
                        companyShippingAutoUpdateField(compId, "#shippingAddress1", "company.shipFrom.road1", true, false);
                        companyShippingAutoUpdateField(compId, "#shippingAddress2", "company.shipFrom.road2", true, false);
                        companyShippingAutoUpdateField(compId, "#shippingHandlingTime", "company.handlingTime", true, true);
                        companyShippingAutoUpdateField(compId, "#shippingReturnPolicy", "company.returnPolicy", true, true);

                        companyShippingAutoUpdateCheckbox(compId, "#shippingAllowInternational", "company.shippingInternational");

                        companyShippingMultiSelectAutoUpdate(compId, "#shippingCountry", "company.shipFrom.countryCode");
                        companyShippingMultiSelectAutoUpdate(compId, "#shippingWeightUnit", "company.weightUnit");
                        companyShippingMultiSelectAutoUpdate(compId, "#shippingRefundPolicy", "company.refundPolicy");

                        companyShippingAutoUpdateCarriers(compId);
					}
					
					$('#useStoreAddress').unbind();
					$('#useStoreAddress').click(function() {
						getStoreAddress(compId);
					});
                    companyShippingRulesDrawAll(compId);
                    $('#addNewShippingRule').unbind();
                    $('#addNewShippingRule').click(function() {
                        companyShippingRulesGetDetails(compId, null, true);
                    });
				}
				else if (selectedTabId == 'taxTab') {
					$('#generalInfo').hide();
					$('#description').hide();
					$('#design').hide();
					$('#shipping').hide();
					$('#payment').hide();
					$('#sellers').hide();
                    $('#brands').hide();
                    $('#coupons').hide();
                    $('#publishing').hide();
                    $('#apiKeys').hide();
                    $('#iBeacon').hide();
                    $('#tags').hide();
					$('#tax').show();
					$('#taxForm .errors').hide();

					$('#addNewTaxRate').unbind();
					$('#addNewTaxRate').click(function() {
						companyTaxLocalGetDetails(compId, null, true);
					});
					if(companyTaxFirstVisit){
						$('#taxForm').hide();
						companyTaxFirstVisit = false;
						companyTaxLoadList(compId);
					}
				}
				else if (selectedTabId == 'paymentTab') {
					$('#generalInfo').hide();
					$('#description').hide();
					$('#design').hide();
					$('#shipping').hide();
					$('#tax').hide();
					$('#sellers').hide();
                    $('#brands').hide();
                    $('#coupons').hide();
                    $('#publishing').hide();
                    $('#apiKeys').hide();
                    $('#payment').show();
					$('#paymentForm .errors').hide();
					
					if (!companyHashTable['payment']) {
						companyHashTable['payment'] = new Object();
					}
					// Check if tab is visited before
					if (!companyHashTable['payment'].visited) {
						companyHashTable['payment'].visited = true;
						
						// draw currency ComboBox
						drawSelectComboBox('#paymentCurrencyCombo');

						//Fill Payment Tab
						companyGetPaymentPolicy(compId);

                        //Set auto update control
                        companyPaymentMultiSelectAutoUpdate(compId, "#paymentCurrencyCombo", "company.currencyCode");
					}
				}
				else if (selectedTabId == 'sellersTab'){
					$('#generalInfo').hide();
					$('#description').hide();
					$('#design').hide();
					$('#shipping').hide();
					$('#payment').hide();
					$('#tax').hide();
                    $('#brands').hide();
                    $('#coupons').hide();
                    $('#publishing').hide();
                    $('#apiKeys').hide();
                    $('#iBeacon').hide();
                    $('#tags').hide();
					$('#sellers').show();
					$('#sellersForm .errors').hide();

                    if (!companyHashTable['seller']) {
                        companyHashTable['seller'] = new Object();
                    }
                    // Check if tab is visited before
                    if (!companyHashTable['seller'].visited) {
                        companyHashTable['seller'].visited = true;
                    }
					
					$('#addNewSeller').unbind();
					$('#addNewSeller').click(function() {
						getSellerDialogPage(compId,"-1");
					});
					sellersGridSetup(partnerId);
                    companyGetSellerOnLineValidation(compId);
					sellersShowAll(compId);
                    companySellerAutoUpdateCheckbox(compId, "#paymentOnLineValidation", "company.onlineValidation");
				}
                else if (selectedTabId == 'brandsTab'){
                    $('#generalInfo').hide();
                    $('#description').hide();
                    $('#design').hide();
                    $('#shipping').hide();
                    $('#payment').hide();
                    $('#tax').hide();
                    $('#sellers').hide();
                    $('#coupons').hide();
                    $('#publishing').hide();
                    $('#apiKeys').hide();
                    $('#iBeacon').hide();
                    $('#tags').hide();
                    $('#brands').show();
                    $('#brandsForm .errors').hide();

                    $('#addNewBrand').unbind();
                    $('#addNewBrand').click(function() {
                        companyBrandsGetDetails(null, true);
                    });
                    companyBrandsDrawAll();
                }
                else if (selectedTabId == 'couponsTab'){
                    $('#generalInfo').hide();
                    $('#description').hide();
                    $('#design').hide();
                    $('#shipping').hide();
                    $('#payment').hide();
                    $('#tax').hide();
                    $('#sellers').hide();
                    $('#brands').hide();
                    $('#publishing').hide();
                    $('#apiKeys').hide();
                    $('#iBeacon').hide();
                    $('#tags').hide();
                    $('#coupons').show();
                    $('#couponsForm .errors').hide();

                    $('#addNewCoupon').unbind();
                    $('#addNewCoupon').click(function() {
                        companyCouponsGetDetails(null, true);
                    });
                    companyCouponsDrawAll();
                }
                else if (selectedTabId == 'publishingTab'){
                    $('#generalInfo').hide();
                    $('#description').hide();
                    $('#design').hide();
                    $('#shipping').hide();
                    $('#payment').hide();
                    $('#tax').hide();
                    $('#sellers').hide();
                    $('#brands').hide();
                    $('#coupons').hide();
                    $('#apiKeys').hide();
                    $('#iBeacon').hide();
                    $('#tags').hide();
                    $('#publishing').show();
                    $('#publishingForm .errors').hide();

                    $('#addNewPublishing').unbind();
                    $('#addNewPublishing').click(function() {
                        companyPublishingGetDetails(null, true);
                    });
                    companyPublishingDrawAll();
                }
                else if (selectedTabId == 'apiKeysTab'){
                    $('#generalInfo').hide();
                    $('#description').hide();
                    $('#design').hide();
                    $('#shipping').hide();
                    $('#payment').hide();
                    $('#tax').hide();
                    $('#sellers').hide();
                    $('#brands').hide();
                    $('#coupons').hide();
                    $('#publishing').hide();
                    $('#iBeacon').hide();
                    $('#tags').hide();
                    $('#apiKeys').show();
                    $('#formApiKeys .errors').hide();

                    if (!companyHashTable['apiKeys']) {
                        companyHashTable['apiKeys'] = new Object();
                    }
                    // Check if tab is visited before
                    if (!companyHashTable['apiKeys'].visited) {
                        companyHashTable['apiKeys'].visited = true;

                        // draw select combo boxes
                        drawSelectComboBox('#apiKeysMapProvider');

                        $("#apiKeysMapProvider").unbind().bind("multiselectclick", function(event, ui) {
                            if(ui.value == "GOOGLE_MAP") {
                                $("#apiKeysGoogleAnalyticsKey").removeAttr("disabled");
                            }
                            else{
                                $("#apiKeysGoogleAnalyticsKey").attr("disabled", "disabled").val("");
                            }
                        });

                        //Fill ApiKeys Tab
                        companyGetApiKeysInfo(response)

                        //Generate API Key
                        $('#getNewKeyBtn').unbind();
                        $('#getNewKeyBtn').click(function() {
                            companyGenerateApiKey(compId);
                        });

                        //Set auto update control
                        companyApiKeysAutoUpdateField(compId, "#apiKeysGoogleAnalyticsKey", "company.gakey", true, false);

                        companyApiKeysMultiSelectAutoUpdate(compId, "#apiKeysMapProvider", "company.mapProvider");
                    }
                }
                else if (selectedTabId == 'iBeaconTab'){
                    $('#generalInfo').hide();
                    $('#description').hide();
                    $('#design').hide();
                    $('#shipping').hide();
                    $('#payment').hide();
                    $('#tax').hide();
                    $('#sellers').hide();
                    $('#brands').hide();
                    $('#coupons').hide();
                    $('#publishing').hide();
                    $('#apiKeys').hide();
                    $('#tags').hide();
                    $('#iBeacon').show();
                    $('#iBeaconForm .errors').hide();

                    $('#addNewIBeacon').unbind();
                    $('#addNewIBeacon').click(function() {
                        companyIBeaconGetDetails(null, true);
                    });
                    companyIBeaconDrawAll();
                }
                else if (selectedTabId == 'tagsTab'){
                    $('#generalInfo').hide();
                    $('#description').hide();
                    $('#design').hide();
                    $('#shipping').hide();
                    $('#payment').hide();
                    $('#tax').hide();
                    $('#sellers').hide();
                    $('#brands').hide();
                    $('#coupons').hide();
                    $('#publishing').hide();
                    $('#apiKeys').hide();
                    $('#iBeacon').hide();
                    $('#tags').show();
                    $('#tagsForm .errors').hide();

                    companyTagsGetIBeacons();
                }
			});
			
			$('#generalTab').click();
			
			// Update action from admin
			if(!partnerId){
				$('#cancelEditCompBtn').unbind();
				$('#cancelEditCompBtn').click(function() {
					compObjCancelEdit();
				});
			}
			// Update action from partner
			else {
				$('#cancelEditCompBtn').unbind();
				$('#cancelEditCompBtn').click(function() {
                    if(categorySelectedId){
                        categoryGeneralGetInfo();
                    }
					$("#items").empty().hide(); // show catalog tree
					$("#categoriesMain").show();
				});
			}
		}
	});
}

function compObjCancelEdit() {
	$('#editCompanyTabs').remove();
	$('#searchForm').show();
	getAllCompanies();
	companyHashTable = [];
}

// Get All Companies
function getAllCompanies() {
	var dataToSend = "format=html";
	$('#items').showLoading({'addClass': 'loading-indicator-FacebookBig'});
	$.ajax({
		url : showCompanyUrl+'?'+dataToSend,
		type : "GET",
		data : '',
		dataType : "html",
		cache : false,
		async : true,
		success : function(pageContent, status) {
			$('#items').hideLoading();
			$('#items').empty();
			$('#items').append(pageContent);
		}
	});
}

// Function which apply multiselect combo style to <input type="select">
function drawSelectComboBox(inputSelectID) {
	$(inputSelectID).multiselect({
		header: false,
		multiple: false,
		noneSelectedText: multiselectNoneSelectedTextLabel,
		minWidth: 100,
		selectedList: 1
	});
}