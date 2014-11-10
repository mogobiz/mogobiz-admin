<select id="catalogDropDownList" autofocus multiple="multiple">
    %{--<option value="create"><g:message code="catalog.create.label" /></option>--}%
    <g:each in="${catalogs}">
        <option value="${it.id}" %{--editable="true" editFunction="catalogGetEditPage('${it.id}')"--}%>${it.name}</option>
    </g:each>
</select>