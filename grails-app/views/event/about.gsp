<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>
	<title><g:message code="customer.event.about.label" /></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
	<g:javascript library="jquery" />
	
	<!-- #include theme files -->
	<p:css name='event/event.styles' />
	<p:css name='event/theme' />
	<p:javascript src="event/site" />
	
	<script type="text/javascript">
		jQuery(document).ready(function() {
			jQuery("div#header li#aboutPage").addClass('active');
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
				<h1><g:message code="customer.event.about.label" /></h1>
			</div>
			
			<div id="about" class="padding">
				
				<div class="wrap_image_left">
					<img src="${resource(dir:'images/event_images',file:'about_img.jpg')}" alt="" />
				</div>
				
				<p>Aenean diam massa, fringilla quis consectetur et, iaculis id mi. Curabitur turpis risus, pharetra eget pretium id, lobortis sit amet elit. Sed tincidunt lorem orci, vel ultrices libero. Vestibulum convallis pulvinar aliquet. Donec tincidunt adipiscing velit, in commodo leo porta in. Maecenas sollicitudin quam ut ipsum tristique vel sagittis lectus luctus. Cras semper malesuada faucibus. Fusce dapibus condimentum euismod. Etiam lacinia eros elit, vel convallis elit. Cras orci elit, viverra sit amet consequat at, porta id elit. Donec egestas, felis vitae iaculis accumsan, leo justo venenatis dui, eget lacinia arcu augue eget ante. Aenean diam massa, fringilla quis consectetur et, iaculis id mi. Curabitur turpis risus, pharetra eget pretium id, lobortis sit amet elit. Sed tincidunt lorem orci, vel ultrices libero. Vestibulum convallis pulvinar aliquet. Donec tincidunt adipiscing velit, in commodo leo porta in. Maecenas sollicitudin quam ut ipsum tristique vel sagittis lectus luctus. Cras semper malesuada faucibus. Fusce dapibus condimentum euismod. Etiam lacinia eros elit, vel convallis elit.</p>
				
				<br/>

				<div class="section_title">
					<h3>Meet The Team</h3>
				</div>
			
				<!-- Start Team Member -->
				<div class="team member_left">
					<h3>Some Guy <span>Lead Developer</span></h3>
					<img src="${resource(dir:'images/event_images',file:'ourteam.jpg')}" alt="" />
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					<ul>
						<li><a href="">Twitter</a></li>
						<li><a href="">Facebook</a></li>
					</ul>
				</div>
				<!-- End Team Member -->
				
				<!-- Start Team Member -->
				<div class="team member_right">
					<h3>Some Girl <span>Lead Designer</span></h3>
					<img src="${resource(dir:'images/event_images',file:'ourteam.jpg')}" alt="" />
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					<ul>
						<li><a href="">Twitter</a></li>
						<li><a href="">Facebook</a></li>
					</ul>
				</div>
				<!-- End Team Member -->
				
				<div class="clear"></div>
			</div>
			
		</div>
		<div class="bottom"></div>
	</div>
	
	<!---------------------------------------------------------------------------------------------------->
	
	<!-- footer -->
	<g:render template="footer" />
	
</body>
</html>