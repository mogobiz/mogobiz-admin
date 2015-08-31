<%@ page import="com.mogobiz.utils.PermissionType" %>

<ul class="subnav" style="display:none;">
    <store:hasPermission permission="${PermissionType.CREATE_STORE_CATALOGS.key}">
        <li onclick="hideCatalogMenuSubnav();"><a href="javascript:void(0);"
                                                  onclick="catalogGetCreatePage();"><g:message
                    code="catalog.create.label"/></a></li>
    </store:hasPermission>
    <store:hasPermission permission="${PermissionType.DELETE_STORE_CATALOGS.key}">
        <li onclick="hideCatalogMenuSubnav();"><a href="javascript:void(0);"
                                                  id="deleteCatalogLink"
                                                  class="disabled"><g:message
                    code="catalog.delete.label"/></a></li>
    </store:hasPermission>
    <store:hasPermission permission="${PermissionType.EXPORT_STORE_CATALOGS.key}">
        <li onclick="hideCatalogMenuSubnav();"><a href="javascript:void(0);"
                                                  id="exportCatalogLink"
                                                  class="disabled"><g:message
                    code="catalog.export.label"/></a></li>
    </store:hasPermission>
    <store:hasPermission permission="${PermissionType.IMPORT_STORE_CATALOGS.key}">
        <li onclick="hideCatalogMenuSubnav();"><a href="javascript:void(0);"
                                                  onclick="catalogGetImportPage();"><g:message
                    code="catalog.import.label"/></a></li>
    </store:hasPermission>
    <li onclick="hideCatalogMenuSubnav();"><a href="javascript:void(0);"
                                              id="searchProductCatalogLink"
                                              class="disabled"><g:message
                code="catalog.searchProduct.label"/></a></li>
</ul>