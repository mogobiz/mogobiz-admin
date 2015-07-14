<%@ page contentType="text/html; charset=UTF-8" %>

<script>
    //initialise iphoneSwitch for Event Status
    $(".iphoneSwitchAroundStyle").iphoneSwitch("off",
            function(productId) {
                catalogProductsUpdateStatus(productId,"ACTIVE");
            },
            function(productId) {
                catalogProductsUpdateStatus(productId,"INACTIVE");
            },
            {
                switch_on_container_path: '../images/iphone-switch/iphone_switch_container_off.png'
            });
</script>
<g:if test="${products}">
    <ul>
        <g:each in="${products}">
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
                    <a onclick="categoryProductsGetEditPage(${it.id}, 'catalog');"><label>${it.name?.length() > 35 ?it.name?.substring(0, 35)+" ... ":it.name}</label></a>
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
</g:if>