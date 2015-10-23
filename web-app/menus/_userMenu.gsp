<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<%@ page import="com.mogobiz.utils.PermissionType" %>

<ul class="subnav" style="display:none;">
    <store:hasPermission permission="${PermissionType.ADMIN_COMPANY.key}">
        <li onclick="hideUsernameSubnav();"><a href="javascript:void(0)"
                                               onclick="partnerGetAdminPage(${params?.partnerId});"><g:message
                    locale="${lang}" code="seller.admin.link"/></a></li>
    </store:hasPermission>
    %{--
    <store:hasPermission permission="${PermissionType.ACCESS_STORE_BO.key}">
        <li onclick="hideUsernameSubnav();"><a href="javascript:void(0)"
                                               onclick="getBackOfficePage();"><g:message
                    locale="${lang}" code="sale.label"/></a></li>
    </store:hasPermission>
    <store:hasPermission permission="${PermissionType.ADMIN_STORE_SOCIAL_NETWORKS.key}">
        <li onclick="hideUsernameSubnav();"><a href="${createLink(controller: 'social')}"><g:message
                locale="${lang}" code="seller.social.link"/></a></li>
    </store:hasPermission>
    <li onclick="hideUsernameSubnav();"><a href="javascript:void(0);"><g:message
            locale="${lang}" code="default.support.label"/></a></li>
    --}%
    <li onclick="hideUsernameSubnav();"><a
            href="${createLink(controller: 'auth', action: 'signOut')}" id="logout"><g:message
                locale="${lang}" code="default.logout.label"/></a></li>
</ul>