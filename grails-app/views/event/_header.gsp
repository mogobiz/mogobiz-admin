<script type="text/javascript">
var displayLogoUrl = "${createLink(controller: 'event', action:'displayLogo', absolute:'true')}";
var listCarouselImagesUrl = "${createLink(controller: 'event', action:'listCarouselImages', absolute:'true')}";
var displayCarouselUrl = "${createLink(controller: 'event', action:'displayCarousel', absolute:'true')}";
var homePage = "${createLink(controller: 'event', action:'getEvents', absolute:'true')}";
</script>

<div id="header">
	<div class="page">
		<a href="getEvents" class="logo"></a>
		<ul>
			<li id="homePage"><a href="javascript:void(0)"><g:message code="customer.event.home.label" /></a></li>
			<li id="blogPage"><a href="javascript:void(0)"><g:message code="customer.event.blog.label" /></a></li>
			<li id="aboutPage"><a href="about"><g:message code="customer.event.about.label" /></a></li>
			<li id="contactPage"><a href="contact"><g:message code="customer.event.contact.label" /></a></li>
		</ul>
		<div class="clear"></div>
	</div>
</div>
