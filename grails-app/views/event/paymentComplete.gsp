<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>
	<title><g:message code="customer.event.registrationComplete.label" /></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
	<g:javascript library="jquery" />
	
	<!-- #include theme files -->
	<p:css name='event/event.styles' />
	<p:css name='event/theme' />
	<p:javascript src="event/site" />

</head>
<body>
	<!-- header -->
	<g:render template="header" />
	
	<!---------------------------------------------------------------------------------------------------->
	
	<div id="page">
		<!-- The div "top" add the rounded corner look to the theme and contain no content. -->
		<div class="top"></div>
		
		<div class="content">
			
			<div class="header page">
				<h1><g:message code="customer.event.registrationComplete.label" /></h1>
			</div>
			
			<div id="register" class="padding">
				
				<div class="left">
					<p><g:message code="customer.event.emailSent.label" /><br/>
					<a href="getEvents"><g:message code="customer.event.backToEvents.label" /></a></p>		
				</div>

				<div class="right">			
					<div class="sidebar_box">
						<h4><g:message code="customer.event.contact.label" /></h4>
						<p><g:message code="customer.event.haveQuestions.label" />&nbsp;<a href="contact"><g:message code="customer.event.contact.label" /></a>.</p>
					</div>
				</div>
				<div class="clear"></div>

			</div>
			
		</div>
		<!-- The div "bottom" add the rounded corner look to the theme and contain no content. -->
		<div class="bottom"></div>
	</div>
	
	<!---------------------------------------------------------------------------------------------------->
	
	<!-- footer -->
	<g:render template="footer" />
	
</body>
</html>