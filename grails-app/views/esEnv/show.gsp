<%@ page import="com.mogobiz.utils.PermissionType"%>
<%@ page import="com.mogobiz.utils.ProfileUtils"%>
<g:each in="${envs}" var="env">
<shiro:hasPermission permission="${ProfileUtils.computePermission(PermissionType.PUBLISH_STORE_CATALOGS_TO_ENV, [env.company.id as String, env.id as String].toArray(new String[2]))}">
    <option value="${env.id}">${env.name}</option>
</shiro:hasPermission>
</g:each>