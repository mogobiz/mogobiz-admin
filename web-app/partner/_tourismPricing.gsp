<style type="text/css">
	#tourismPricingAddDiv, #tourismPricingTranslationDiv, #tourismPricingDownloadDiv{
		font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
		font-size: 11px;
		color: #888;
		text-align: left;
		direction: ltr;
		width: 680px;
	}
	#tourismPricingCreateDialog {
		color: #888;
		text-align: left;
		direction: ltr;
		background:#F2F2F2;
		border:1px solid #CCCCCC;
		padding: 10px;
		margin: 5px 0px 0px 0px;
	}
	#tourismPricingTabs ul.tabs{
		padding-top: 5px;
		padding-left: 0px;
	}
</style>

<div id="tourismPricingTabs">
	<div id="ulTabs">
		<ul class="tabs">
			<li>
				<a id="tourismPricingGeneralTab">
					<g:message code="tabs.general.label" />
				</a>
			</li>
            <li id="downloadLi">
                <a id="tourismPricingDownloadTab">
                    <g:message code="tabs.download.label" />
                </a>
            </li>
			<li>
				<a id="tourismPricingTranslationTab">
					<g:message code="tabs.translation.label" />
				</a>
			</li>
		</ul>
		<hr style="margin-top: 5px;" />
	</div>
	<div id="tourismPricingAddDiv" >
		<form id="tourismPricingAddForm" onsubmit="return false;">
			<input type="hidden" name="price.id" id="tourismPricingId"/>
			<div class="newline">
				<div class="pricing-large">
					<label for="tourismPricingSKU"><g:message code="tourismPricing.SKU.label"/>&nbsp;<sup>*</sup></label>
				</div>
                <div class="pricing-large">
                    <label for="tourismPricingAvailabilityDate"><g:message code="tourismPricing.availabilityDate.label"/></label>
                </div>
			</div>
			<div class="spacer-small"></div>				
			<div class="newline">
				<div class="pricing-large">
					<input id="tourismPricingSKU" type="text" name="ticketType.sku" placeholder="<g:message code="tourismPricing.SKU.label"/>" required/>
				</div>
                <div class="pricing-large">
                    <input id="tourismPricingAvailabilityDate" type="text" name="ticketType.availabilityDate" pattern="\d{2}\/\d{2}/\d{4}" placeholder="<g:message code="calendar.datePlaceholder.label"/>" />
                </div>
			</div>
			<div class="spacer"></div>				
			<div class="newline">
				<div class="pricing-small">
					<label for="tourismPricingTicketType"><g:message code="tourismPricing.ticketType.label"/>&nbsp;<sup>*</sup></label>
				</div>
				<div class="pricing-small">
					<label for="tourismPricingVariation1" id="tourismPricingVariation1Label">&nbsp;</label>
				</div>
				<div class="pricing-small">
					<label for="tourismPricingVariation2" id="tourismPricingVariation2Label">&nbsp;</label>
				</div>
				<div class="pricing-small">
					<label for="tourismPricingVariation3" id="tourismPricingVariation3Label">&nbsp;</label>
				</div>
			</div>
			<div class="spacer-small"></div>				
			<div class="newline">
				<div class="pricing-small">
					<input id="tourismPricingTicketType" autofocus type="text" required placeholder="(<g:message code="tourismPricing.ticketTypePlaceholder.label"/>)"  name="ticketType.name" pattern=".{1,50}"/>
				</div>
				<div class="pricing-small">
					<select id="tourismPricingVariation1" autofocus disabled multiple="multiple"></select>
				</div>
				<div class="pricing-small">
					<select id="tourismPricingVariation2" disabled multiple="multiple"></select>
				</div>
				<div class="pricing-small">
					<select id="tourismPricingVariation3" disabled multiple="multiple"></select>
				</div>
			</div>
			<div class="spacer"></div>
			<div class="newline">
				<div class="pricing-small">
					<label for="tourismPricingTicketPrice"><g:message code="tourismPricing.ticketPrice.label"/></label>
				</div>
				<div class="pricing-small">
					<label for="tourismPricingTicketStock"><g:message code="tourismPricing.ticketStock.label"/>&nbsp;<sup>*</sup></label>
				</div>
				<div class="pricing-small">
					<label for="tourismPricingMinOrder"><g:message code="tourismPricing.minOrder.label"/>&nbsp;<sup>*</sup></label>
				</div>
				<div class="pricing-small">
					<label for="tourismPricingMaxOrder"><g:message code="tourismPricing.maxOrder.label"/></label>
				</div>
			</div>
			<div class="spacer-small"></div>				
			<div class="newline">
				<div class="pricing-small">
					<input id="tourismPricingTicketPrice" type="text" pattern="\d{0,6}\.?\d{0,2}" placeholder="<g:message code="tourismPricing.ticketPricePlaceholder.label"/>" name="ticketType.amount" />
				</div>
				<div class="pricing-small">
					<input id="tourismPricingTicketStock" type="number" min="0" max="999999999" required pattern="\d+"/>
				</div>
				<div class="pricing-small">
					<input id="tourismPricingMinOrder" type="number" min="0" name="ticketType.minOrder" max="999999999" pattern="\d+"/>
				</div>
				<div class="pricing-small">
					<input id="tourismPricingMaxOrder" type="number" min="1" name="ticketType.maxOrder" max="999999999" pattern="\d+"/>
				</div>
			</div>
			<div class="spacer"></div>				
			<div class="newline">
				<div class="pricing-large">
					<label for="tourismPricingStartDate"><g:message code="tourismPricing.startDate.label"/></label>
				</div>
				<div class="pricing-large">
					<label for="tourismPricingEndDate"><g:message code="tourismPricing.endDate.label"/></label>
				</div>
			</div>
			<div class="spacer-small"></div>				
			<div class="newline">
				<div class="pricing-large">
					<input id="tourismPricingStartDate" type="text" name="ticketType.startDate" placeholder="<g:message code="calendar.datePlaceholder.label"/>" pattern="\d{2}\/\d{2}/\d{4}"/>
				</div>
				<div class="pricing-large">
					<input id="tourismPricingEndDate" type="text" name="ticketType.stopDate" placeholder="<g:message code="calendar.datePlaceholder.label"/>" pattern="\d{2}\/\d{2}/\d{4}"/>
				</div>
			</div>
			<div class="spacer"></div>
			<div class="newline">
                <input id="tourismPricingPrivate" type="checkbox" name="ticketType.xprivate" />
                <label for="tourismPricingPrivate"><g:message code="tourismPricing.private.label"/></label>&nbsp;&nbsp;
                <input id="tourismPricingStockUnlimited" type="checkbox" name="ticketType.stockunlimited">
                <label for="tourismPricingStockUnlimited"><g:message code="pricing.globalstockunlimited.label"/></label>&nbsp;&nbsp;
                <input id="tourismPricingStockOutSelling" type="checkbox" name="ticketType.stockoutselling">
                <label for="tourismPricingStockOutSelling"><g:message code="pricing.globalstockoutselling.label"/></label>
			</div>
		</form>
	</div>
    <div id="tourismPricingDownloadDiv">
        <div class="spacer"></div>
        <div id="tourismPricingDownloadForm" align="center">
            <img src="../images/download_file.png" width="128px" height="128px" style="cursor:pointer;"/>
            <br/>
            <a href="javascript:void(0);" id="tourismPricingDownloadResource"><g:message code="tourismPricing.download.label" /></a>
            &nbsp;<g:message code="tourismPricing.or.label" />
            &nbsp;<a href="javascript:void(0);" id="tourismPricingDeleteResource"><g:message code="tourismPricing.delete.label" /></a>
            &nbsp;<g:message code="tourismPricing.file.label" />
            <div class="spacer"></div>
        </div>
        <div id="tourismPricingUpload">
            <div class="pricing-full">
                <form id="tourismPricingUploadForm" onsubmit="return false;" method="POST" enctype="multipart/form-data">
                    <input id="tourismPricingDownloadFile" type="file" name="file"/>
                </form>
            </div>
            <div class="spacer"></div>
            <iframe id="tourismPricingDownloadHiddenFrame" name="tourismPricingDownloadHiddenFrame" style="display: none"></iframe>
        </div>
        <div align="center" id="tourismPricingUploading" style="display:none"><g:message code="tourismPricing.uploadingResource.label" /></div>
    </div>
	<div id="tourismPricingTranslationDiv" >
		<div style="padding: 10px;">
			<a id="tourismPricingTranslationAddLink"><g:message code="translation.add.label" /></a>
		</div>
		<div id="tourismPricingTranslationGridDiv">
			<div id="tourismPricingTranslationGrid" style="height: 185px;"></div>
		</div>
	</div>
</div>