<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
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
					<g:message locale="${lang}" code="tabs.general.label" />
				</a>
			</li>
            <li id="downloadLi">
                <a id="tourismPricingDownloadTab">
                    <g:message locale="${lang}" code="tabs.download.label" />
                </a>
            </li>
			<li>
				<a id="tourismPricingTranslationTab">
					<g:message locale="${lang}" code="tabs.translation.label" />
				</a>
			</li>
		</ul>
        <hr style="margin-top: -1px;"/>
	</div>
	<div id="tourismPricingAddDiv" >
		<form id="tourismPricingAddForm" onsubmit="return false;">
			<input type="hidden" name="price.id" id="tourismPricingId"/>
            <div class="spacer"></div>
			<div class="newline">
				<div class="pricing-large">
					<label for="tourismPricingSKU"><g:message locale="${lang}" code="tourismPricing.SKU.label"/>&nbsp;<sup>*</sup></label>
				</div>
                <div class="pricing-large">
                    <label for="tourismPricingAvailabilityDate"><g:message locale="${lang}" code="tourismPricing.availabilityDate.label"/></label>
                </div>
			</div>
			<div class="spacer-small"></div>				
			<div class="newline">
				<div class="pricing-large">
					<input id="tourismPricingSKU" type="text" name="ticketType.sku" placeholder="<g:message locale="${lang}" code="tourismPricing.SKU.label"/>" required/>
				</div>
                <div class="pricing-large">
                    <input id="tourismPricingAvailabilityDate" type="text" name="ticketType.availabilityDate" pattern="\d{2}\/\d{2}/\d{4}" placeholder="<g:message locale="${lang}" code="calendar.datePlaceholder.label"/>" />
                </div>
			</div>
			<div class="spacer"></div>				
			<div class="newline">
				<div class="pricing-small">
					<label for="tourismPricingTicketType"><g:message locale="${lang}" code="tourismPricing.ticketType.label"/>&nbsp;<sup>*</sup></label>
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
					<input id="tourismPricingTicketType" autofocus type="text" required placeholder="(<g:message locale="${lang}" code="tourismPricing.ticketTypePlaceholder.label"/>)"  name="ticketType.name" pattern=".{1,50}"/>
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
					<label for="tourismPricingTicketPrice"><g:message locale="${lang}" code="tourismPricing.ticketPrice.label"/></label>
				</div>
				<div class="pricing-small">
					<label for="tourismPricingTicketStock"><g:message locale="${lang}" code="tourismPricing.ticketStock.label"/>&nbsp;<sup>*</sup></label>
				</div>
				<div class="pricing-small">
					<label for="tourismPricingMinOrder"><g:message locale="${lang}" code="tourismPricing.minOrder.label"/>&nbsp;<sup>*</sup></label>
				</div>
				<div class="pricing-small">
					<label for="tourismPricingMaxOrder"><g:message locale="${lang}" code="tourismPricing.maxOrder.label"/></label>
				</div>
			</div>
			<div class="spacer-small"></div>				
			<div class="newline">
				<div class="pricing-small">
					<input id="tourismPricingTicketPrice" type="text" pattern="\d{0,6}\.?\d{0,2}" required placeholder="<g:message locale="${lang}" code="tourismPricing.ticketPricePlaceholder.label"/>" name="ticketType.amount" />
				</div>
				<div class="pricing-small">
					<input id="tourismPricingTicketStock" type="number" min="0" max="999999999" required pattern="\d+"/>
				</div>
				<div class="pricing-small">
					<input id="tourismPricingMinOrder" type="number" min="0" name="ticketType.minOrder" max="999999999" pattern="\d+"/>
				</div>
				<div class="pricing-small">
					<input id="tourismPricingMaxOrder" type="number" min="0" name="ticketType.maxOrder" max="999999999" pattern="\d+"/>
				</div>
			</div>
			<div class="spacer"></div>				
			<div class="newline">
				<div class="pricing-large">
					<label for="tourismPricingStartDate"><g:message locale="${lang}" code="tourismPricing.startDate.label"/></label>
				</div>
				<div class="pricing-large">
					<label for="tourismPricingEndDate"><g:message locale="${lang}" code="tourismPricing.endDate.label"/></label>
				</div>
			</div>
			<div class="spacer-small"></div>				
			<div class="newline">
				<div class="pricing-large">
					<input id="tourismPricingStartDate" type="text" name="ticketType.startDate" placeholder="<g:message locale="${lang}" code="calendar.datePlaceholder.label"/>" pattern="\d{2}\/\d{2}/\d{4}"/>
				</div>
				<div class="pricing-large">
					<input id="tourismPricingEndDate" type="text" name="ticketType.stopDate" placeholder="<g:message locale="${lang}" code="calendar.datePlaceholder.label"/>" pattern="\d{2}\/\d{2}/\d{4}"/>
				</div>
			</div>
			<div class="spacer"></div>
            <div class="spacer-small"></div>
            <div class="newline">
                <input id="tourismPricingPrivate" type="checkbox" name="ticketType.xprivate" />
                <label for="tourismPricingPrivate"><g:message locale="${lang}" code="tourismPricing.private.label"/></label>&nbsp;&nbsp;
                <input id="tourismPricingStockUnlimited" type="checkbox" name="ticketType.stockunlimited">
                <label for="tourismPricingStockUnlimited"><g:message locale="${lang}" code="pricing.globalstockunlimited.label"/></label>&nbsp;&nbsp;
                <input id="tourismPricingStockOutSelling" type="checkbox" name="ticketType.stockoutselling">
                <label for="tourismPricingStockOutSelling"><g:message locale="${lang}" code="pricing.globalstockoutselling.label"/></label>
                <span style="float: right; font-weight: bold;" id="tourismPricingNumberOfSales">
                    <span id="tourismPricingSold"></span>&nbsp;<g:message locale="${lang}" code="pricing.numberOfSales.label"/>,&nbsp;
                    <span id="tourismPricingRemaining"></span>&nbsp;<g:message locale="${lang}" code="pricing.remaining.label"/>
                </span>
            </div>
		</form>
	</div>
    <div id="tourismPricingDownloadDiv">
        <div class="spacer"></div>
        <div id="tourismPricingDownloadForm" align="center">
            <img src="../images/download_file.png" width="128px" height="128px" style="cursor:pointer;"/>
            <br/>
            <a href="javascript:void(0);" id="tourismPricingDownloadResource"><g:message locale="${lang}" code="tourismPricing.download.label" /></a>
            &nbsp;<g:message locale="${lang}" code="tourismPricing.or.label" />
            &nbsp;<a href="javascript:void(0);" id="tourismPricingDeleteResource"><g:message locale="${lang}" code="tourismPricing.delete.label" /></a>
            &nbsp;<g:message locale="${lang}" code="tourismPricing.file.label" />
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
        <div align="center" id="tourismPricingUploading" style="display:none"><g:message locale="${lang}" code="tourismPricing.uploadingResource.label" /></div>
    </div>
	<div id="tourismPricingTranslationDiv" >
		<div style="padding: 10px;">
			<a id="tourismPricingTranslationAddLink"><g:message locale="${lang}" code="translation.add.label" /></a>
		</div>
		<div id="tourismPricingTranslationGridDiv">
			<div id="tourismPricingTranslationGrid" style="height: 185px;"></div>
		</div>
	</div>
</div>