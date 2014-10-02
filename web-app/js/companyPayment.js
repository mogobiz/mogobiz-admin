function companyPaymentMultiSelectAutoUpdate(compId, objId, objProperty){
    $(objId).bind("multiselectclick", function(event, ui) {
        var dataToSend = "company.id=" + compId;
        dataToSend += "&" + objProperty + "=" + ui.value;
        dataToSend += "&format=json";
        $.ajax({
            url : paymentPolicyUpdateUrl,
            type : "POST",
            noticeType : "PUT",
            data : dataToSend,
            dataType : "json",
            cache : false,
            async : true
        });
    });
}

/**
 * Get Payment information and fill the form
 */
function companyGetPaymentPolicy(compId) {
	var dataToSend = "company.id="+compId;
	dataToSend += "&format=json";
	$.ajax({
        url : paymentPolicyShowUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(response, status) {
			if (response.success) {
				var payment = response.data;
				var paymentEncoded = $.toJSON(payment);
				var paymentFormValues = paymentEncoded;
				paymentFormValues = paymentFormValues.replace(/(^\s+|\s+$)/, '');
				paymentFormValues = "(" + paymentFormValues + ");";

				try	{
					var json = eval(paymentFormValues);
					var newJson = new Object();
					
					for(var key in json) {
						var newKey = "company."+key;
						newJson[newKey] = json[key];

						if (key == "currencyCode" && response.data[key] != "") {
							$("#paymentCurrencyCombo").multiselect('uncheckAll');
							$('#paymentCurrencyCombo').find('option:contains('+response.data[key]+')').attr('selected','selected');
							$("#paymentCurrencyCombo").multiselect('refresh');
							$('#formPayment .ui-multiselect-menu .ui-multiselect-checkboxes input[name="multiselect_paymentCurrencyCombo"]').each(function() {
								if(this.value == response.data[key]) {
                                    $("#paymentCurrencyCombo").unbind("multiselectclick");
									this.click();
                                    companyShippingMultiSelectAutoUpdate(compId, "#paymentCurrencyCombo", "company.currencyCode");
								}
							});
						}
						else if (key == "onlineValidation" && response.data[key]){
							$("#paymentOnLineValidation").attr("checked", "checked");
						}
					}
				}
				catch(err)	{
					('That appears to be invalid JSON!')
					return false;
				}
				var paymentForm = document.forms['formPayment'];
				$(paymentForm).populate(newJson, {debug:1});
			}
			else {
				showErrors('#formPayment .errors', response.errors);
			}
		}
	});
}