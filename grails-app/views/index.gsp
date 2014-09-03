<html>
    <head>
		<r:require modules="core"/>
        <title>Welcome to Iper2010</title>
        <meta name="layout" content="main" />
        <script type="text/javascript">
        $(document).ready(function() {
        	$("#inner-content").hide();
		});
        </script>
        <!-- agile carousel -->
   </head>
    <body>
<content tag="header">
<!-- header -->
<div id="logo" style="float:left;">
	<img src="${resource(dir:'images',file:'ebiznext_logo.png')}" />
</div>
<br/>
<div align="right">
	<a href="${createLink(controller: 'admin')}"><g:message code="navigation.companyManagement.label" /></a>
	&nbsp;|&nbsp;
	<a href="${createLink(controller: 'partner')}"><g:message code="navigation.myShop.label" /></a>
</div>
<br/>
</content>
<!-- inner-content -->
<content tag="footer">
<!-- footer -->
<g:render template="/layouts/footer" />
</content>
    </body>
</html>
