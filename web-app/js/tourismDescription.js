function tourismDescriptionPageDisplay(productId, description){
	$.get(productDescriptionPageUrl, {}, function(responseText) {
		responseText = jQuery.trim(responseText);
		tourismDescriptionDialogSetup(responseText, productId, description);
	}, "html");
}

function tourismDescriptionDialogSetup(responseText, productId, description){
	if ($('#tourismProductDescriptionDialog').dialog( "isOpen" ) !== true) {
		$('#tourismProductDescriptionDialog').empty();
		$('#tourismProductDescriptionDialog').html(responseText);
		
		$('#tourismProductDescriptionDialog').dialog({
			title : descriptionTitleLabel,
			modal : true,
			resizable : false,
			width : '745px',
			height : '500',
			open: function(event) {
				tourismDescriptionInitFields(productId, description);
				$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').addClass("ui-cancel-button");
				$('.ui-dialog-buttonpane').find('button:contains("updateLabel")').addClass("ui-update-button");
				$('.ui-dialog-buttonpane').find('button:contains("cancelLabel")').html('<span class="ui-button-text">'+cancelLabel+'</span>');
				$('.ui-dialog-buttonpane').find('button:contains("updateLabel")').html('<span class="ui-button-text">'+updateLabel+'</span>');
			},
			buttons : {
				cancelLabel : function() {
					$('#tourismProductDescriptionDialog').dialog("close");
				},
				updateLabel : function() {
					tourismDescriptionUpdateValue(productId);
				}
			}
		});
	}
}

function tourismDescriptionInitFields(productId, description) {
	$('#productDescriptionRichText').val(description).blur();
	$('#productDescriptionRichText').cleditor({
		width : "715px",
		height : "410px",
		controls : "bold italic underline | font size "
				+ "style | color highlight removeformat | bullets numbering | outdent "
				+ "indent | alignleft center alignright justify | undo redo | "
				+ "rule image link unlink | cut copy paste pastetext"
	});
}

function tourismDescriptionUpdateValue(productId){
	productDoUpdateField(productId, '#productDescriptionRichText', 'product.description',true);
	$('#productDescription').val('');
	$('#productDescriptionTextDiv').empty();
	$('#productDescription').val($('#productDescriptionRichText').val());
	$('#productDescriptionTextDiv').html($('#productDescriptionRichText').val());
	$('#tourismProductDescriptionDialog').dialog("close");
}