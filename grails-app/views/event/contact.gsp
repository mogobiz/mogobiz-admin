<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>  
	<title><g:message code="customer.event.contact.label" /></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
	<g:javascript library="jquery" />
	
	<!-- #include theme files -->
	<p:css name='event/event.styles' />
	<p:css name='event/theme' />
	<p:javascript src="event/site" />
	
	<script type="text/javascript">
		jQuery(document).ready(function() {
			jQuery("div#header li#contactPage").addClass('active');
			// CSS3 rounded corners / shadows
			jQuery("div#header li.active a").css({ '-moz-border-radius': '6px', '-webkit-border-radius': '6px', 'border-radius': '6px' });
		});
	</script>
	
</head>
<body>
	<!-- header -->
	<g:render template="header" />
	
	<!---------------------------------------------------------------------------------------------------->
	
	<div id="page">	
		<div class="top"></div>
		<div class="content">
			
			<div class="header page">
				<h1><g:message code="customer.event.contact.label" /></h1>
			</div>
			
			<div id="contact" class="padding">
				
				<p>Aenean diam massa, fringilla quis consectetur et, iaculis id mi. Curabitur turpis risus, pharetra eget pretium id, lobortis sit amet elit. Sed tincidunt lorem orci, vel ultrices libero. Vestibulum convallis pulvinar aliquet. Donec tincidunt adipiscing velit, in commodo leo porta in. Maecenas sollicitudin quam ut ipsum tristique vel sagittis lectus luctus. Cras semper malesuada faucibus. Fusce dapibus condimentum euismod. Etiam lacinia eros elit, vel convallis elit. Cras orci elit, viverra sit amet consequat at, porta id elit. Donec egestas, felis vitae iaculis accumsan, leo justo venenatis dui, eget lacinia arcu augue eget ante. </p>
				
				<div class="section_title">
					<h3>Send Us An Email</h3>
				</div>
				
				<p class="validation"></p>
				
				<form action="scripts/send_email.php" method="post" id="contact_form">
					
					<p><label>Your Name</label>
					<input type="text" id="name" name="name" class="text_field" /></p>
					
					<p><label>Your Email</label>
					<input type="text" id="email" name="email" class="text_field" /></p>
					
					<p class="last"><label>Subject</label>
					<select name="subject" id="subject" class="text_field">
						<option value="General Support">General Support</option>
					</select></p>
					<div class="clear"></div>
					
					<p class="message"><label>Message</label>
					<textarea name="message" id="message" class="text_field" rows="" cols=""></textarea></p>
					
					<div class="send_form">
						<a href="javascript:;" class="button" id="send"><span>Send Email</span></a>
					</div>
					<div class="clear"></div>
					
				</form>
				
			</div>
			
		</div>
		<div class="bottom"></div>
	</div>
	<!---------------------------------------------------------------------------------------------------->
	
	<!-- footer -->
	<g:render template="footer" />
	
</body>
</html>