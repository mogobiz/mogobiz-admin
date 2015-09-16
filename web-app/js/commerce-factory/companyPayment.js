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
                if (response.data["onlineValidation"]){
                    $("#paymentOnLineValidation").attr("checked", "checked");
                }
            }
        }
    });
}