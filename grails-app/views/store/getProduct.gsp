<%----%> ${map}
<input type="hidden" id="catId" value="${map.category.id}">
<input type="hidden" id="productName" value="${map.name}">
<input type="hidden" id="productId" value="${map.id}">
<div id="content" class="span12">
	<div class="row-fluid">
		<div class="breadcrumb">
		</div>
		<div class="product-info">
			<div class="left">
				<div class="image">
					<a href="" title="Sample Shirt" class="cloud-zoom" id='zoom1' rel="adjustX: -1, adjustY:-1, tint:'#ffffff',tintOpacity:0.1, zoomWidth:364">
						 <g:if test="${map.pictures}">
							<img src="${map.pictures[0].url}"  title="${map.name}"  title="${map.name}"  id="image"/>
							<div class="zoom-b hidden-phone">
								<a id="zoom-cb" class="colorbox" href="http://serwer1382018.home.pl/sellya/image/cache/data/22-500x500.jpg">Zoom</a>
							</div>
						</g:if>
						<g:else>
							<img src="${resource(dir:'images',file:'No_Image_Available.jpg')}"  title="${map.name}"  title="${map.name}"  id="image"/>
						</g:else>
					</a>
				</div>
                <g:if test="${map.pictures}">
                    <div class="image-additional">
                        <g:each in="${map.pictures}">
                            <a href="${it.url}" title='Sample Shirt' class='cloud-zoom-gallery' rel="useZoom: 'zoom1', smallImage: 'http://serwer1382018.home.pl/sellya/image/cache/data/22-308x308.jpg' ">
                                <img src="${it.url}"  title="${map.name}"  title="${map.name}" />
                            </a>
                        </g:each>
                    </div>
                </g:if>
            </div>
			<div class="right">
				<div class="buy">
					<header class="product-name">
						<h1>${map.name}</h1>
					</header>
					<div class="price">${map.price.endPrice}<br /></div>
					<div class="description">
						<span>Availability:</span>
						<span class="stock">In Stock</span><br/>
						 <g:if test="${map.brand}">
							<span>Brand:</span>
							<a href="">${map.brand.name}</a><br />
						</g:if>	
						<span>Product Code:</span>${map.code}<br />
					</div>
					<div class="options">
						<h4>Available Options</h4>
						<div id="option-261" class="option">
							<div class="option-l">
								<span class="required">*</span>
								<b>Select:</b>
							</div>
							<div class="option-r">
								<select >
									<option value=""> --- Please Select --- </option>
                                    <g:each in="${map.ticketTypes}">
                                        <option value="${it.id}" editable="true" >${it.name}</option>
                                    </g:each>
								</select>
							</div>
						</div>
					</div>
					<div class="cart">
						<div class="add-to-cart">Qty:
							<input type="button" class="dec" value=" "/>
							<input type="text" name="quantity" size="2" class="i-d-quantity input-mini" value="1"/>
							<input type="button" class="inc" value=" "/>
							<input type="hidden" name="product_id" size="2" value="82"/>
							&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="Add to Cart" id="button-cart" class="button-exclusive"/>
						</div>
					</div>
				</div>
			</div> 
			<div id="right-sm">

                <g:if test="${map.brand}">
                    <div class="right-sm-manufacturer-logo visible-desktop">
                         <div class="product-manufacturer-logo-block">
                            <a href="">${map.brand.name}</a>
                         </div>
                    </div>
                </g:if>
				<g:if test="${map.tags}">
					<div class="right-sm-tags visible-desktop">
						<div class="product-tags">
							<div style="margin-right:3px"><h5>Tags:</h5></div><br/><br/>
							<g:each in="${map.tags}">
								<div><a href="">${it.name}</a></div>
							</g:each>
						</div>
					</div>		
				</g:if>
			</div>
		</div>
		<section id="product-information">
				<h1 >Description</h1>
				<article id="Sample Shirt">
					<p>${map.description}</p>
				</article>
		</section>
		<g:if test="${map.tags}">
			<div class="tags hidden-desktop">
					<div style="float:left; margin-right:3px"><h5>Tags:</h5></div>
					<g:each in="${map.tags}">
						<div><a href="">${it.name}</a></div>
					</g:each>
				</div>
			</div>		
		</g:if>
</div>