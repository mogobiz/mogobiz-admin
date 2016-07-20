<%@ page import="com.mogobiz.utils.PermissionType"%>
<%@ page import="com.mogobiz.utils.ProfileUtils"%>
<select id="catalogDropDownList" autofocus multiple="multiple">
    %{--<option value="create"><g:message code="catalog.create.label" /></option>--}%
    <g:each in="${catalogs}" var="catalog">
<shiro:hasPermission permission="${ProfileUtils.computePermission(PermissionType.UPDATE_STORE_CATALOG, [catalog.company.id as String, catalog.id as String].toArray(new String[2]))}">
        <option value="${catalog.id}" fromMirakl="${catalog.readOnly}" catalogMiraklEnvId="${catalog.miraklEnv?.id}">${catalog.name}</option>
</shiro:hasPermission>
    </g:each>
</select>