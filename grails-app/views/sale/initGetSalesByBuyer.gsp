<style type="text/css">
#mainSalesDiv {
	font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
	font-size: 11px;
	color: #888;
	text-align: left;
	direction: ltr;
}
.searchCriterias {
	background: #F2F2F2;
	border: 1px solid #CCC;
	padding: 5px;
}

/*---------- sales ----------*/
#salesGridHeader, #salesGrid, #salesGridPager {
	width: 100%;
}
#salesGrid {
	border: 1px solid #A6C9E2;
	border-top: 0px;
	height:340px;
}
#salesGrid .slick-header {
	text-align: left;
}
/*---------- salesDetails ----------*/
#salesDetailsGridHeader, #salesDetailsGrid, #salesDetailsGridPager {
	width: 100%;
}
#salesDetailsGrid {
	border: 1px solid #A6C9E2;
	border-top: 0px;
	height:340px;
}
#salesDetailsGrid .slick-header {
	text-align: left;
}
/*---------- products ----------*/
#productsGridHeader, #productsGrid, #productsGridPager {
	width: 100%;
}
#productsGrid {
	border: 1px solid #A6C9E2;
	border-top: 0px;
	height:340px;
}
#productsGrid .slick-header {
	text-align: left;
}

</style>

<div id="mainSalesDiv" style="display: none">
	<div style="font-weight: bold;">
		<g:message code="sale.search.by" />
		<a href="javascript:void(0)" id="searchByBuyer"><g:message code="sale.buyer" /></a>
	 	<g:message code="sale.search.orBy" />
	 	<a href="javascript:void(0)" id="searchByProduct"><g:message code="sale.product" /></a>
	 	<g:message code="sale.download.by" />
	 	<a href="${createLink(controller:'suiviVentesActivite')}" id="downloadActivity"><g:message code="sale.activity" /></a>
	</div>
	<br style="clear:both;"/>
 	<div id="searchSalesByBuyerCriterias" class="searchCriterias" style="display: none">
	 	<form onsubmit="return false;">
	 		<div class="newline">
	 			<div style="float: left; width: 200px;">
	 				<label><g:message code="sale.buyer.login" /></label>
	 			</div>
	 			<div style="float: left; width: 150px;">
	 				<label><g:message code="sale.buyer.code" /></label>
	 			</div>
	 			<div style="float: left; width: 150px;">
	 				<label><g:message code="sale.buyer.date" /></label>
	 			</div>
	 			<div style="float: left; width: 136px;"></div>
	 		</div>
	 		<div class="spacer-small"></div>
	 		<div class="newline">
		    	<div style="float: left; width: 200px;">
		    		<input type="text" name="buyerLogin" id="buyerLogin" value="buyer@iper2010.com" size="25"/>
		    	</div>
		    	<div style="float: left; width: 170px;">
		    		<input type="text" name="saleCode" id="saleCode" value="sale1"/>
	 			</div>
	 			<div style="float: left; width: 170px;">
	 				<input type="text" name="saleDate" id="saleDate"/>
	 			</div>
	 			<div style="float: left; width: 120px;">
	 				<button type="submit" id="searchByBuyerBtn" class="fk_ok_btn"><g:message code="sale.searchByBuyer" /></button>
	 			</div>
		    </div>
		    <div class="spacer"></div>
		</form>
	</div>
	<div id="searchSalesByProductCriterias" class="searchCriterias" style="display: none">
	 	<form onsubmit="return false;">
	 		<div class="newline">
	 			<div style="float: left; width: 150px;">
	 				<label><g:message code="sale.productName" /></label>
	 			</div>
	 			<div style="float: left; width: 150px;">
	 				<label><g:message code="sale.productCode" /></label>
	 			</div>
	 			<div style="float: left; width: 150px;">
	 				<label><g:message code="sale.startDate" /> <sup>*</sup></label>
	 			</div>
	 			<div style="float: left; width: 150px;">
	 				<label><g:message code="sale.endDate" /> <sup>*</sup></label>
	 			</div>
	 			<div style="float: left; width: 136px;"></div>
	 		</div>
	 		<div class="spacer-small"></div>
	 		<div class="newline">
		    	<div style="float: left; width: 150px;">
		    		<input type="text" name="productName" id="productName" value="Coupe du monde 2014"/>
		    	</div>
		    	<div style="float: left; width: 150px;">
		    		<input type="text" name="productCode" id="productCode" value=""/>
		    	</div>
		    	<div style="float: left; width: 150px;">
		    		<input type="text" name="startDate" id="startDate"/>
		    	</div>
		    	<div style="float: left; width: 150px;">
		    		<input type="text" name="endDate" id="endDate"/>
		    	</div>
		    	<div style="float: left; width: 136px;">
		    		<button type="submit" id="searchByProductBtn" class="fk_ok_btn"><g:message code="sale.searchByProduct" /></button>
		    	</div>
		    </div>
		    <div class="spacer"></div>
	 	</form>
	</div>
	<br style="clear:both;"/>
	
	<div id="backofficeGrids" class="fk_content_area" style="display: none;">
	  <div id="salesGridDiv" style="display:none;">
	  	<div class="grid-header" id="salesGridHeader">
	  		<label><g:message code="sale.sales" /></label>
	  	</div>
    	<div id="salesGrid"></div>
    	<div id="salesGridPager" style="width:100%;height:20px;"></div>
	  </div>
		
	  <div id="salesDetailsGridDiv" style="display:none;">
	  	<div class="grid-header" id="salesDetailsGridHeader">
	  		<span id="salesDetails-to-sales" class="grid-back-arrow"><img class="grid-back-arrow" src="${resource(dir:'images',file:'grid-back-arrow.png')}"/></span>
	  		<label><g:message code="sale.salesDetails" /></label>
	  	</div>
    	<div id="salesDetailsGrid"></div>
    	<div id="salesDetailsGridPager" style="width:100%;height:20px;"></div>
	  </div>
		
	  <div id="productsGridDiv" style="display:none;">
	  	<div class="grid-header" id="productsGridHeader">
	  		<label><g:message code="sale.products" /></label>
	  	</div>
    	<div id="productsGrid"></div>
    	<div id="productsGridPager" style="width:100%;height:20px;"></div>
	  </div>
	</div>
	
	<!-- Close Button  -->
	<br style="clear:both;"/>
	<div align="right">
	  <div class="fk_button_area">
	    <a href="${createLink(controller:'partner')}"><button type="submit" class="fk_ok_btn"><g:message code="default.button.close.label" /></button></a>
	  </div>
	</div>
</div>


