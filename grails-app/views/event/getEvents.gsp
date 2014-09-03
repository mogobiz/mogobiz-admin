<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>
	<r:require modules="getEvents"/>
	<title><g:message code="customer.event.events.label" /></title>
	<meta name="layout" content="empty" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
	
	<!-- Twitter -->
	<r:script>
		!function(d,s,id){
			var js,fjs=d.getElementsByTagName(s)[0];
			if(!d.getElementById(id)){
				js=d.createElement(s);
				js.id=id;
				js.src="https://platform.twitter.com/widgets.js";
				fjs.parentNode.insertBefore(js,fjs);
			}
		}(document,"script","twitter-wjs");
	</r:script>
	
	<!-- LinkedIn -->
	<script src="http://platform.linkedin.com/in.js" type="text/javascript"></script>
	<!-- Google + -->
	<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>

	<r:script>
		$(document).ready(function() {
			$("div#header li#homePage").addClass('active');
			// CSS3 rounded corners / shadows
			$("div#header li.active a").css({ '-moz-border-radius': '6px', '-webkit-border-radius': '6px', 'border-radius': '6px' });
		});
	</r:script>
</head>
<body>
	<!-- Facebook -->
	<div id="fb-root"></div>
	<r:script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</r:script>

	<!-- header -->
	<g:render template="header" />
	
	<!-- hidden div used to remove description html tags -->
	<div id="hiddenDescription" style="display: none;"></div>

	<!---------------------------------------------------------------------------------------------------->

	<div id="page">
		<!-- The div "top" add the rounded corner look to the theme and contain no content. -->
		<div class="top"></div>

		<div class="content">

			<div class="header header_home page">
				<!-- Carousel -->
				<div id="carouselViewDiv" align="center" class="newline">
					<div class="flavor_2" id="designCarouselDiv"></div>
				</div>
			</div>

			<div id="events" class="padding">

				<!-- Start Events -->
				<div class="left">
					<div class="section_title">
						<h3><g:message code="customer.event.popular.label" /></h3>
					</div>

					<div id="eventsList">
						<g:if test="${result?.eventsList.liste}">
							<g:each in="${result?.eventsList.liste}">
								<!-- Start Event Post -->
								<div class="post">
									<h1>
										<a href="getEvent?event.idEvent=${it.idEvent}"><span>${it.eventName}</span></a>
									</h1>
									<span class="meta"><g:message code="customer.event.host.label" />&nbsp;${it.host}&nbsp;on&nbsp;${it.startDate}</span>
									<div class="description">
										<p>
										<g:if test="${it.descriptionAsText?.length() > 250}">
										${it.descriptionAsText.substring(0, 250)}...
										</g:if>
										<g:else>
										${it.descriptionAsText}
										</g:else>
										</p>
									</div>
									<table width="100%" border="0">
										<tr>
											<td width="25%">
												<!-- Facebook -->
												<div class="fb-like" data-href="http://www.codechic.org:9999/iper2010/event/getEvent?event.idEvent=${it.idEvent}" data-send="false" data-layout="button_count" data-width="450" data-show-faces="true"></div>
											</td>
											<td width="25%">
												<!-- Twitter -->
												<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.codechic.org:9999/iper2010/event/getEvent?event.idEvent=${it.idEvent}" data-text="${it.eventName}">Tweet</a>
											</td>
											<td width="25%">
												<!-- LinkedIn -->
												<script type="IN/Share" data-url="http://www.codechic.org:9999/iper2010/event/getEvent?event.idEvent=${it.idEvent}" data-counter="right"></script>
											</td>
											<td width="25%">
												<!-- Google + -->
												<div class="g-plusone" data-href="http://www.codechic.org:9999/iper2010/event/getEvent?event.idEvent=${it.idEvent}" data-size="medium"></div>
											</td>
										</tr>
									</table>
								</div>
								<!-- End Event Post -->
							</g:each>
						</g:if>
						<g:else><g:message code="customer.event.error.notFound.label" /></g:else>
					</div>
				</div>
				<!-- End Events -->

				<!-- Start Sidebar -->
				<div class="right">
					<div class="sidebar_box">
						<h4><g:message code="customer.event.search.label" /></h4>
						<form id="searchForm">
							<input type="text" name="event.fullSearch" class="text_field" title="<g:message code="customer.event.searchInput.label" />" />
						</form>
					</div>

					<div class="sidebar_box">
						<a href="" class="rss"><g:message code="customer.event.subscribeToRSSFeeds.label" /></a>
					</div>

					<div class="sidebar_box">
						<h4><g:message code="customer.event.categories.label" /></h4>
						<ul>
							<li><a href="getEvents"><g:message code="customer.event.allCategories.label" /></a></li>
							<g:each in="${result?.categories}">
								<li><a href="getEvents?event.idCategory=${it.id}"> ${it.name}</a></li>
							</g:each>
						</ul>
					</div>
				</div>
				<div class="clear"></div>
				<!-- End Sidebar -->
			</div>
			
			<g:if test="${result?.eventsList.liste}">
				<!-- Pagination -->
				<div id="page_navigation_parent" class="padding">
					<div id="page_navigation"></div>
				</div>
			</g:if>
			
		</div>

		<!-- The div "bottom" add the rounded corner look to the theme and contain no content. -->
		<div class="bottom"></div>
	</div>

	<!---------------------------------------------------------------------------------------------------->
	
	<!-- footer -->
	<g:render template="footer" />
	
	<script type="text/javascript">
	$(function() {
		var totalCount = ${result?.eventsList.totalCount};
		var maxItemsPerPage = ${result?.eventsList.maxItemsPerPage};
		var pageOffset = ${result?.eventsList.pageOffset} + 1;
		var pageCount = ${result?.eventsList.pageCount};
		var hasNext = ${result?.eventsList.hasNext};
		var hasPrevious = ${result?.eventsList.hasPrevious};
		var pageSize = ${result?.eventsList.pageSize};
		
		$("#page_navigation").paginate({
			count: pageCount,						//The total number of pages
			start: pageOffset,						//With which number the visible pages should start
			display: 10,							//How many page numbers should be visible
			border: true,							//If there should be a border (true/false)
			border_color: '#D3D3D3',				//Color of the border
			text_color: '#555555',					//Color of the text/numbers
			background_color: '#E9EAE9',			//Background color
			border_hover_color: '#982B2F',			//Border color when hovering
			text_hover_color: '#FFFFFF',			//Text color when hovering
			background_hover_color: '#982B2F',		//Background color when hovering
			rotate: true,							//If the arrows should be visible or not (true/false)
			images: true,							//If the arrows should be images or not (true/false)
			mouse: 'press',							//With value “press” the user can keep the mouse button pressed and the page numbers will keep on sliding.
													//With value “slide” the page numbers will slide once with each click.
			onChange: function(page) {
				var URL = "getEvents?pageOffset="+(page - 1);
				if(getHTTPParameter("event.fullSearch") != null) {
					URL += "&event.fullSearch="+getHTTPParameter("event.fullSearch");
				}
				if(getHTTPParameter("event.idCategory") != null) {
					URL += "&event.idCategory="+getHTTPParameter("event.idCategory");
				}
				window.location.href = URL;
			}
		});

		var margin = ($('#page_navigation').parent().width() / 2) - (($('.jPag-control-back').width() + $('.jPag-control-center').width() + $('.jPag-control-front').width() + 8) / 2);
		$('#page_navigation_parent').css('margin-left', margin);
	});
	</script>

</body>
</html>