<style type="text/css">
#tourismPropertiesAddDiv, #tourismPropertiesTranslationDiv{
    font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
    font-size: 11px;
    color: #888;
    text-align: left;
    direction: ltr;
    width: 500px;
}
#tourismPropertiesCreateDialog {
    color: #888;
    text-align: left;
    direction: ltr;
    background:#F2F2F2;
    border:1px solid #CCCCCC;
    padding: 10px;
    margin: 5px 0px 0px 0px;
}
#tourismPropertiesTabs ul.tabs{
    padding-top: 5px;
    padding-left: 0px;
}
</style>

<div id="tourismPropertiesTabs">
    <div id="ulTabs">
        <ul class="tabs">
            <li>
                <a id="tourismPropertiesGeneralTab">
                    <g:message code="tabs.general.label" />
                </a>
            </li>
            <li>
                <a id="tourismPropertiesTranslationTab">
                    <g:message code="tabs.translation.label" />
                </a>
            </li>
        </ul>
        <hr style="margin-top: 5px;" />
    </div>
    <div id="tourismPropertiesAddDiv" >
        <form id="tourismPropertiesAddForm" onsubmit="return false;">
            <input type="hidden" id="tourismPropertyId"/>
            <div class="newline">
                <div class="properties-large">
                    <label for="tourismPropertyName"><g:message code="properties.name.label"/>&nbsp;<sup>*</sup></label>
                </div>
                <div class="properties-large">
                    <label for="tourismPropertyValue"><g:message code="properties.value.label"/></label>
                </div>
            </div>
            <div class="spacer-small"></div>
            <div class="newline">
                <div class="properties-large">
                    <input id="tourismPropertyName" autofocus type="text" required name="property.name"/>
                </div>
                <div class="properties-large">
                    <input type="text" id="tourismPropertyValue" name="property.value"/>
                </div>
            </div>
            <div class="spacer"></div>
        </form>
    </div>
    <div id="tourismPropertiesTranslationDiv" >
        <div style="padding: 10px;">
            <a id="tourismPropertiesTranslationAddLink"><g:message code="translation.add.label" /></a>
        </div>
        <div id="tourismPropertiesTranslationGridDiv">
            <div id="tourismPropertiesTranslationGrid" style="height: 144px;"></div>
        </div>
    </div>
</div>