<div id="catalogProductsDiv">
    <form onsubmit="return false;" class="filterform" action="#">
        <input id="catalogProductsSearchInput" type="text" placeholder="<g:message code="default.search.label"/>...">
        &nbsp;
        <input type="checkbox" id="catalogProductsActiveOnly" checked="checked">
        <label for="catalogProductsActiveOnly"><g:message code="catalog.products.active.only"/></label>
    </form>
    <div id="catalogProductsSearchResults" style="margin-top: 20px;"></div>

    <!-- buttons  -->
    <br style="clear:both;"/>
    <div align="right" class="fk_button_area">
        <button id="catalogProductsCloseBtn" class="fk_ok_btn"><g:message code="default.button.close.label" /></button>
    </div>
</div>