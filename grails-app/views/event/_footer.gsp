<div id="footer" class="page">
	<p><g:message code="customer.event.copyright.label" /></p>
	<ul>
		<li id="footer_homePage"><a href="javascript:void(0)"><g:message code="customer.event.home.label" /></a></li>
		<li id="footer_blogPage"><a href="javascript:void(0)"><g:message code="customer.event.blog.label" /></a></li>
		<li id="footer_aboutPage"><a href="about"><g:message code="customer.event.about.label" /></a></li>
		<li id="footer_contactPage"><a href="contact"><g:message code="customer.event.contact.label" /></a></li>
	</ul>
	<div class="clear"></div>
</div>
<g:if test="${session.companyVo?.gakey && session.companyVo.gakey != ''}">
<script type="text/javascript">
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	try {
		var pageTracker = _gat._getTracker("${session.companyVo.gakey}");
		pageTracker._trackPageview();
	}
	catch(err) {
	}
</script>
</g:if>
