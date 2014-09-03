<style type="text/css">
#productBrand {
    font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
    font-size: 11px;
    color: #888;
    text-align: left;
    direction: ltr;
}

#productBrandsTabs ul.tabs{
    padding-top: 5px;
    padding-left: 0px;
}

#productBrandGridDiv {
	width:500px;
}

#productBrandGrid {
	border: 1px solid silver;
	border-top: 0px;
	height:250px;
	width: 100%;
	background:#FFFFFF;
	margin-bottom: 25px;
}

#productBrandsTranslationDiv{
    font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
    font-size: 11px;
    color: #888;
    text-align: left;
    direction: ltr;
    width: 500px;
}

#brandDialog {
	color: #888;
	text-align: left;
	direction: ltr;
	background:#F2F2F2;
	border:1px solid #CCCCCC;
	padding: 10px;
	margin: 5px 0px 0px 0px;
}
</style>



<div id="productBrand">
    <p style="font-weight: bold;" id="productAddNewBrand"><g:message code="brand.textLabelBrand.label" /> <a href="javascript:void(0)" id="productAddNewBrandLink"><g:message code="brand.BrandAdd.label" /></a></p>
    <div id="productBrandGridDiv">
        <div id="productBrandGrid"></div>
    </div>
    <div id="productBrandsTabs">
        <div id="ulTabs">
            <ul class="tabs">
                <li>
                    <a id="productBrandsGeneralTab">
                        <g:message code="tabs.general.label" />
                    </a>
                </li>
                <li>
                    <a id="productBrandsTranslationTab">
                        <g:message code="tabs.translation.label" />
                    </a>
                </li>
            </ul>
            <hr style="margin-top: 5px;" />
        </div>
        <div id="productBrandsCreateDiv">
            <form id="productBrandsForm" onsubmit="return false;" method="POST" enctype="multipart/form-data">
                <input id="productBrandsId" type="hidden" name="brand.id"/>


                <div class="newline">
                    <div class="companyBrandsDialog-large">
                        <div class="newline">
                            <div class="companyBrandsDialog-large">
                                <label for="productBrandsName"><g:message code="brand.BrandNameLabel.label"></g:message>&nbsp;<sup>*</sup></label><br />
                                <div class="spacer-small"></div>
                                <input type="text" id="productBrandsName" />
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="newline">
                            <div class="companyBrandsDialog-large">
                                <label for="productBrandsWebsite"><g:message code="brand.BrandURLLabel.label"></g:message></label><br />
                                <div class="spacer-small"></div>
                                <input type="text" id="productBrandsWebsite" pattern="https?://([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}((\/[^\/~,]+)+)?/?"/>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="newline">
                            <div class="companyBrandsDialog-large">
                                <label for="productBrandsIBeacon"><g:message code="brand.BrandIBeaconLabel.label" /></label>
                                <div class="spacer-small"></div>
                                <select id="productBrandsIBeacon"></select>
                            </div>
                        </div>
                    </div>
                    <div class="companyBrandsDialog-small">
                        <div class="imgDiv">
                            <img id="productBrandsLogoImage" src=""/>
                        </div>
                        <input type="file" id="productBrandsLogo" name="file"/>
                        <a href="javascript:void(0)" id="productBrandsRemoveLogoLink"><g:message code="brand.BrandDeleteLogoLabel.label"/></a>
                    </div>
                </div>
                <div class="spacer"></div>
                <div class="newline">
                    <div class="companyBrandsDialog-full">
                        <label for="productBrandsDescription"><g:message code="brand.BrandDescriptionLabel.label" /></label>
                    </div>
                </div>
                <div class="spacer-small"></div>
                <div class="newline">
                    <div class="companyBrandsDialog-full">
                        <textarea id="productBrandsDescription" rows="5"></textarea>
                    </div>
                </div>
                <div class="spacer"></div>
                <div>
                    <input type="checkbox" id="productBrandsHide" value="true"/>&nbsp;
                    <label for="productBrandsHide"><g:message code="brand.BrandHideLabel.label" /></label>
                </div>
                <div class="spacer"></div>
            </form>
        </div>
        <div id="productBrandsTranslationDiv" >
            <div style="padding: 10px;">
                <a id="productBrandsTranslationAddLink"><g:message code="translation.add.label" /></a>
            </div>
            <div id="productBrandsTranslationGridDiv">
                <div id="productBrandsTranslationGrid" style="height: 144px;"></div>
            </div>
        </div>
    </div>
    <iframe id="productBrandsHiddenFrame" name="productBrandsHiddenFrame" style="display: none"></iframe>
</div>