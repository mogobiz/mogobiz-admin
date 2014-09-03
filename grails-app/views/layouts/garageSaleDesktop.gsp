<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr" xml:lang="fr">
<head>
<title><g:layoutTitle default="IPER2010" /></title>
<link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
<g:javascript library="jquery" />
<jqui:resources themeCss="${resource(dir:'css/jquery-ui/themes/facebook-theme',file:'jquery-ui-1.8.10.custom.css')}" />
<p:javascript src="jquery/agile_carousel.a1" />
<p:javascript src="fancybox/jquery.fancybox-1.3.4" />
<p:css name="agile_carousel" />
<p:css name='fancybox/jquery.fancybox-1.3.4' />
<g:layoutHead />
</head>
<body>
	<div id="container" class="group">
		<div id="header" class="group">
			<g:pageProperty name="page.header" />
		</div>
		<div id="main" class="group">
			<div id="nav">
				<g:pageProperty name="page.nav" />
			</div>
			<div id="content">
				<div id="inner-content">
					<g:layoutBody />
				</div>
			</div>
		</div>
		<br class="clear" />
	</div>
	<div id="footer">
		<g:pageProperty name="page.footer" />
	</div>
</body>
</html>