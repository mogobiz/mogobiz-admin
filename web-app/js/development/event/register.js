var paymentTypes;

$(document).ready(function() {
	loadCountries();
	$('#completeRegistration').click(function() {
		if($("#register_form").valid()) {
			$("#register_form").submit();
		}
	});
	
	$('#copyTicketInfo').click(function() {
		$('.l_name_input').val($('.l_name_input').first().val());
		$('.email_input').val($('.email_input').val());	});
	
	if ($('#nbTickets').val() <= 1) {
		$('#copyTicketInfo').parent().hide();
	}
});

/**
 * load countries
 * @return the countries list from db
 */
function loadCountries() {
	var regions = [];
	var countries = [];
	var countryReg = [];
	
	var dataToSend = [{ name : "format", value : "json"}]
	$.ajax({
		url : countriesUrl,
		type : "GET",
		data : dataToSend,
		dataType : "json",
		cache : false,
		async : true,
		success : function(data, status) {
			countries = []
			$.each(data, function(i, value) {
				var country = {
					id : value.id,
					label : value.name,
					value : value.name
				}

				$.each(value.regions, function(j, reg) {
					var region = {
						label : reg.name,
						value : reg.name
					}
					regions[j] = region;
				});
				countryReg[value.name] = regions;
				countries[i] = country;
			});
			
			// add countries to select combos
			$.each(countries, function(i, value) {
				if (value.label == countryName)
					$('.registration_Countries').append("<option selected value='" + value.id + "'>" + value.label + "</option>");
				else
					$('.registration_Countries').append("<option value='" + value.id + "'>" + value.label + "</option>");
			});
		}
	});
}

