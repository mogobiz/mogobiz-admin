<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<%@ page import="com.mogobiz.utils.PermissionType" %>

<ul class="subnav" style="display:none;">
    <store:hasPermission permission="${PermissionType.CREATE_STORE_CATALOGS.key}">
        <li onclick="hideCatalogMenuSubnav();"><a href="javascript:void(0);"
                                                  onclick="catalogGetCreatePage();"><g:message
                    locale="${lang}" code="catalog.create.label"/></a></li>
    </store:hasPermission>
    <store:hasPermission permission="${PermissionType.DELETE_STORE_CATALOGS.key}">
        <li onclick="hideCatalogMenuSubnav();"><a href="javascript:void(0);"
                                                  id="deleteCatalogLink"
                                                  class="disabled"><g:message
                    locale="${lang}" code="catalog.delete.label"/></a></li>
    </store:hasPermission>
    <store:hasPermission permission="${PermissionType.EXPORT_STORE_CATALOGS.key}">
        <li onclick="hideCatalogMenuSubnav();"><a href="javascript:void(0);"
                                                  id="exportCatalogLink"
                                                  class="disabled"><g:message
                    locale="${lang}" code="catalog.export.label"/></a></li>
    </store:hasPermission>
    <store:hasPermission permission="${PermissionType.IMPORT_STORE_CATALOGS.key}">
        <li onclick="hideCatalogMenuSubnav();"><a href="javascript:void(0);"
                                                  onclick="catalogGetImportPage();"><g:message
                    locale="${lang}" code="catalog.import.label"/></a></li>
    </store:hasPermission>
    <li onclick="hideCatalogMenuSubnav();"><a href="javascript:void(0);"
                                              id="searchProductCatalogLink"
                                              class="disabled"><g:message
                    locale="${lang}" code="catalog.searchProduct.label"/></a></li>
</ul>