<%@ page contentType="text/html; charset=UTF-8" %>

<script>
//initialise iphoneSwitch for Event Status
$('.iphoneSwitchAroundStyle').iphoneSwitch("off",    
		function(productId) {
			categoryProductsUpdateStatus(productId,"ACTIVE");
		},
		function(productId) {
			categoryProductsUpdateStatus(productId,"INACTIVE");
		},
		{
			switch_on_container_path: '../images/iphone-switch/iphone_switch_container_off.png'
		});
</script>

<g:if test="${prodList?.list}">
	<ul id="productList">
		<g:each in="${prodList?.list}">
			<li id='${it.id}' state="${it.state.toString().equals('ACTIVE')?'on':'off'}"><!-- it may consider reading state from here not from span for first time -->
				<div class="pic" align="left">
					<g:if test="${it.picture?.url}">
						<a href= '${it.picture?.url}' title= '${it.picture?.name}'><img src='${it.picture?.url}' /></a>
					</g:if>
					<g:else>
						<a href='${resource(dir:'images',file:'No_Image_Available.jpg')}'><img src="${resource(dir:'images',file:'No_Image_Available.jpg')}" /></a>
					</g:else>
				</div>
				<div style="margin-left: 150px">
					<a onclick="categoryProductsGetEditPage(${it.id}, '${it.xtype?.toString().toLowerCase()}');"><label>${URLDecoder.decode(it.name)?.length() > 35 ?URLDecoder.decode(it.name)?.substring(0, 35)+" ... ":URLDecoder.decode(it.name)}</label></a>
                    <g:if test="${it.brand && it.brand.name != ""}">
                        <strong>&nbsp;|&nbsp;</strong>${it.brand.name}
                    </g:if>

                    <span><strong>&nbsp;|&nbsp;</strong>${it.code?.length() > 30 ?it.code?.substring(0, 30)+" ... ":it.code}
					<g:if test="${it.price && it.price > 0}">
						<strong>&nbsp;|&nbsp;</strong>${it.price / 100}
					</g:if>
					</span>
					<span><strong>&nbsp;|&nbsp;</strong>${it.xtype?.toString().toLowerCase().capitalize()}</span>
					<g:if test="${it.state }">
						<span id="${it.id}" class="iphoneSwitchAroundStyle" state="${it.state.toString().equals('ACTIVE')?'on':'off'}">
						</span>
					</g:if>
					<br/>
					<g:if test="${it.dateCreated}">
						<span><g:message code="product.creationDate.label" />:&nbsp;${it.dateCreated}</span>
					</g:if>
					<g:if test="${it.descriptionAsText?.length() > 0}">
						<div id="details${it.id}" style="margin-top: 10px;">
							<span>
								<g:message code="product.description.label" />:&nbsp;
								<g:if test="${it.descriptionAsText?.length() > 250}">
								${it.descriptionAsText.substring(0, 250)}...
								</g:if>
								<g:else>
								${it.descriptionAsText}
								</g:else>
							</span>
							<br/>
						</div>
					</g:if>
				</div>
				<div class="spacer-small"></div>
				<hr/>
				<div class="spacer-small"></div>
			</li>
		</g:each>
	</ul>
	<!-- Pagination -->
	<div id="page_navigation_parent">
		<div id="page_navigation"></div>
		<input type="hidden" id="pageOffset" value="${prodList?.pageOffset + 1}"/>
	</div>
</g:if>

<script type="text/javascript">
$(function() {
	var totalCount = ${prodList?.totalCount};
	var maxItemsPerPage = ${prodList?.maxItemsPerPage};
	var pageOffset = ${prodList?.pageOffset} + 1;
	var pageCount = ${prodList?.pageCount};
	var hasNext = ${prodList?.hasNext};
	var hasPrevious = ${prodList?.hasPrevious};
	var pageSize = ${prodList?.pageSize};
	
	$("#page_navigation").paginate({
		count: pageCount,						//The total number of pages
		start: pageOffset,						//With which number the visible pages should start
		display: 24,							//How many page numbers should be visible
		border: true,							//If there should be a border (true/false)
		border_color: '#A6C9E2',				//Color of the border
		text_color: '#075899',					//Color of the text/numbers
		background_color: '#FFFFFF',			//Background color
		border_hover_color: '#A6C9E2',			//Border color when hovering
		text_hover_color: '#FFFFFF',			//Text color when hovering
		background_hover_color: '#6D84B4',		//Background color when hovering
		rotate: true,							//If the arrows should be visible or not (true/false)
		images: true,							//If the arrows should be images or not (true/false)
		mouse: 'press',							//With value “press” the user can keep the mouse button pressed and the page numbers will keep on sliding.
												//With value “slide” the page numbers will slide once with each click.
		onChange: function(page) {
			categoryProductsDrawAll(page - 1);
		}
	});
	
	var margin = ($('#page_navigation').parent().width() / 2) - (($('.jPag-control-back').width() + $('.jPag-control-center').width() + $('.jPag-control-front').width() + 8) / 2);
	$('#page_navigation_parent').css('margin-left', margin);
});
</script>
