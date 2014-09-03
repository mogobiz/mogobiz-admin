<p:javascript src="store/_header" />
<div id="header" class="container_12">
	<div id="logoContainer" class="grid_12">
		<a id="site_logo" href="javascript:void(0)"></a> 
		<div id="system_navigation" class="s_nav">
			<ul class="s_list_1 clearfix">
				<li id="homePage"><a href="javascript:void(0)"><g:message code="store.common.home"/></a></li>
				<li><a href="javascript:void(0)"><g:message code="store.common.menu.logIn"/></a></li>
				<li><a href="javascript:void(0)"><g:message code="store.common.menu.shoppingCart"/></a></li>
				<li id="aboutPage"><a href="${createLink(controller: 'store', action:'about')}"><g:message code="store.common.menu.aboutUs"/></a></li>
				<li id="contactPage"><a href="${createLink(controller: 'store', action:'contact')}"><g:message code="store.common.menu.contact"/></a></li>
			</ul>
		</div>
		<div id="site_search">
			<a id="show_search" href="javascript:;" title="Search"></a>
			<div id="search_bar" class="clearfix">
				<input type="text" id="filter_keyword" />
				<select id="filter_category_id">
					<option value="-1"><g:message code="store.header.search.allCategories"/></option>
				</select>
				<a class="s_button_1 s_secondary_color_bgr"><span id="searchByText" class="s_text"><g:message code="store.header.search.go"/></span></a> <a class="s_advanced s_main_color" href=""><g:message code="store.header.search.advancedSearch"/></a>
			</div>
		</div>
		<div id="language_switcher" class="s_switcher">
			<span class="s_selected">
				<img src="${resource(dir:'images/shoppica/flags',file:'gb.png')}" alt=<g:message code="store.header.language.english"/> />
				<g:message code="store.header.language.english"/>
			</span>
			<ul class="s_options">
				<li><a href="#"  onclick=""><img src="${resource(dir:'images/shoppica/flags',file:'gb.png')}" alt=<g:message code="store.header.language.english"/> /> <g:message code="store.header.language.english"/></a></li>
				<li><a href="#"  onclick=""><img src="${resource(dir:'images/shoppica/flags',file:'fr.png')}" alt=<g:message code="store.header.language.french"/> /> <g:message code="store.header.language.french"/></a></li>
			</ul>
		</div>
		<div id="categories" class="s_nav">
			<ul id="listOfCategories">
				<li id="menu_home"> <a href="index"><g:message code="store.common.home"/></a> </li>
				<!--li><a href="listing_1.html">Electronics</a></li-->
			</ul>
		</div>
		<div id="cart_menu" class="s_nav">
			<a href="javascript:void(0)"><span class="s_icon"></span> <small class="s_text"><g:message code="store.common.cart"/></small><span class="s_grand_total s_main_color"></span></a>
			<div class="s_submenu s_cart_holder"></div>
		</div>
	</div>
</div>