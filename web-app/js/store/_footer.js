jQuery(document).ready(function() {	
	getPaymentTypes();
});

//will return back all payment types available to this company and place the logos in footer
function getPaymentTypes(){ 
	callServer(getPaymentTypesUrl, '', drawPaymentTypesLogos, errorCallingServer);
}

function drawPaymentTypesLogos(response){
	$('#footer #payments').empty();
	if(response.paymentProvider && response.paymentProvider != "NONE") {
		$('#footer #payments').append('<img src="'+masterCardLogo+'" alt="mastercard" />');
		$('#footer #payments').append('<img src="'+visaLogo+'" alt="visa" />');
	}
	if(response.paypal && response.paypal == "ok") {
		$('#footer #payments').append('<img src="'+paypalLogo+'" alt="paypal" />');
	}
	if(response.buyster && response.buyster == "ok") {
		$('#footer #payments').append('<img src="'+buysterLogo+'" alt="buyster" />');
	}
	if(response.kwixo && response.kwixo == "ok") {
		$('#footer #payments').append('<img src="'+kwixoLogo+'" alt="kwixo" />');
	}
//	if(response.cashOk) {
//		$('#footer #payments').append('<img src="" alt="" />');
//	}
//	if(response.checkOk) {
//		$('#footer #payments').append('<img src="" alt="" />');
//	}
}