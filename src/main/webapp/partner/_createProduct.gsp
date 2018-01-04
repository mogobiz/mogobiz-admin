<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<style>
#productAddDiv{
	font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
	font-size: 11px;
	color: #888;
	text-align: left;
	direction: ltr;
}
#createProductDialog {
	color: #888;
	text-align: left;
	direction: ltr;
	background:#F2F2F2;
	border:1px solid #CCCCCC;
	padding: 10px;
	margin: 5px 0px 0px 0px;
    height: 117px !important;
}

</style>
<div id="productCreateDiv">
	<div id="productAddDiv">
		<form id="productAddForm" onsubmit="return false;">
			<div class="newline">
				<div class="createProduct-large">
					<label for="createProductNameField"><g:message locale="${lang}" code="product.name.label"/>&nbsp;<sup>*</sup></label><br />
				</div>
                <div class="createProduct-small">
                    <label for="createProductTypeField"><g:message locale="${lang}" code="product.xtype.label"/></label>&nbsp;<sup>*</sup><br />
                </div>
			</div>
			<div class="spacer-small"></div>
			<div class="newline">
				<div class="createProduct-large">
					<input id="createProductNameField" autofocus required placeholder="(Enter Product Name here)" type="text" name="product.name" class="textInput" /> <br />
				</div>
                <div class="createProduct-small">
                    <select id="createProductTypeField" multiple="multiple">
                        <option value="PRODUCT"><g:message locale="${lang}" code="product.xtype.physical.label" /></option>
                        <option value="DOWNLOADABLE"><g:message locale="${lang}" code="product.xtype.downloadable.label" /></option>
                        <option value="SERVICE"><g:message locale="${lang}" code="product.xtype.service.label" /></option>
                    </select>
                </div>
			</div>
			<div class="spacer"></div>
            <div class="newline">
                <div class="createProduct-large">
                    <label for="createProductCodeField"><g:message locale="${lang}" code="product.unitCode.label"/></label>&nbsp;<sup>*</sup><br />
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="createProduct-large">
                    <input id="createProductCodeField" required placeholder="(Enter Product code here)" type="text" name="product.code" class="textInput" /> <br />
                </div>
            </div>
		</form>
	</div>
</div>		
	