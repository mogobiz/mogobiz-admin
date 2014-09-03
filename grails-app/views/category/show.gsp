<%@ page contentType="text/html; charset=UTF-8" %>
<g:if test="${categories}">
	<g:each in="${categories}">
		<li id="categoryTreeNode-${it.id}" value="${it.id}" pos="${it.position }">
			<a href="javascript:void(0)">${it.name}</a>
			<ul id="categoryTreeNode-${it.id}-Childs">
				<li></li>
			</ul>
		</li>
	</g:each>
</g:if>

<g:if test="${category}">
	<g:each in="${category}">
		<li id="categoryTreeNode-${it.id}" value="${it.id}">
			<a href="javascript:void(0)">${it.name}</a>
			<ul id="categoryTreeNode-${it.id}-Childs">
				<li></li>
			</ul>
		</li>
	</g:each>
</g:if>