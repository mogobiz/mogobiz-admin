<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.mogobiz.utils.PermissionType"%>
<%@ page import="com.mogobiz.utils.ProfileUtils"%>
<g:if test="${categories}">
	<g:each in="${categories}" var="category">
<shiro:hasPermission permission="${ProfileUtils.computePermission(PermissionType.UPDATE_STORE_CATEGORY_WITHIN_CATALOG, [category.company.id as String, category.catalog.id as String, category.id as String].toArray(new String[3]))}">
		<li id="categoryTreeNode-${category.id}" value="${category.id}" pos="${category.position }">
			<a href="javascript:void(0)">${category.name}</a>
			<ul id="categoryTreeNode-${category.id}-Childs">
				<li></li>
			</ul>
		</li>
</shiro:hasPermission>
<shiro:lacksPermission permission="${ProfileUtils.computePermission(PermissionType.UPDATE_STORE_CATEGORY_WITHIN_CATALOG, [category.company.id as String, category.catalog.id as String, category.id as String].toArray(new String[3]))}">
    <li id="categoryTreeNode-${category.id}" value="${category.id}" pos="${category.position }">
        <span>${category.name}</span>
        <ul id="categoryTreeNode-${category.id}-Childs">
            <li></li>
        </ul>
    </li>
</shiro:lacksPermission>
	</g:each>
</g:if>

<g:if test="${category}">
<shiro:hasPermission permission="${ProfileUtils.computePermission(PermissionType.UPDATE_STORE_CATEGORY_WITHIN_CATALOG, [category.company.id as String, category.catalog.id as String, category.id as String].toArray(new String[3]))}">
	<li id="categoryTreeNode-${category.id}" value="${category.id}">
		<a href="javascript:void(0)">${category.name}</a>
		<ul id="categoryTreeNode-${category.id}-Childs">
			<li></li>
		</ul>
	</li>
</shiro:hasPermission>
<shiro:lacksPermission permission="${ProfileUtils.computePermission(PermissionType.UPDATE_STORE_CATEGORY_WITHIN_CATALOG, [category.company.id as String, category.catalog.id as String, category.id as String].toArray(new String[3]))}">
    <li id="categoryTreeNode-${category.id}" value="${category.id}">
        <span>${category.name}</span>
        <ul id="categoryTreeNode-${category.id}-Childs">
            <li></li>
        </ul>
    </li>
</shiro:lacksPermission>
</g:if>