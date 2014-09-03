<%@ page contentType="text/html;charset=UTF-8"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html, charset=utf-8" />
    <meta name="description" content="My Store" />
    <meta name="layout" content="main"/>

    <meta http-equiv="Content-Type" content="text/html, charset=UTF-8"/>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>My Store</title>
    <base href="."/>
    <meta name="description" content="My Store"/>
    <meta name="layout" content="main"/>
    <link href="http://serwer1382018.home.pl/sellya/image/data/cart.png" rel="icon"/>

    <r:require modules="store"/>

    <script type="text/javascript" charset="utf-8">
        var displayLogoUrl = "${createLink(controller: 'store', action:'displayLogo')}";
        var listCarouselImagesUrl = "${createLink(controller: 'store', action:'listCarouselImages')}";
        var displayCarouselUrl = "${createLink(controller: 'store', action:'displayCarousel')}";
        var listAllCategoriesUrl = "${createLink(controller: 'store', action:'listVisibleCategories')}";
        var listAllBrandsUrl = "${createLink(controller: 'store', action:'listVisibleBrands')}";
        var listAllCountriesUrl = "${createLink(controller: 'store', action:'countries')}";
        var listAlCurrenciesUrl = "${createLink(controller: 'store', action:'currencies')}";
        var listFeaturedProductsUrl = "${createLink(controller: 'store', action:'listFeaturedProducts')}";
        var listLastVisitedProductsUrl = "${createLink(controller: 'store', action:'getUserHistory')}";
        var getProductByIdUrl = "${createLink(controller: 'store', action:'getProduct')}";
        var listAllProductsUrl = "${createLink(controller: 'store', action:'listAllProducts')}";
        var listProductsByCategoryUrl = "${createLink(controller: 'store', action:'listProductsByCategory')}";//store
        var listLatestProductsUrl = "${createLink(controller: 'store', action:'listLatestProducts')}";
        var searchProductsUrl = "${createLink(controller: 'store', action:'searchProducts')}";
        var listAllCartUrl = "${createLink(controller: 'store', action:'listAllCart')}";
        var clearCartUrl = "${createLink(controller: 'store', action:'clearCart')}";
        var getPaymentTypesUrl = "${createLink(controller: 'store', action:'getPaymentTypes')}";
        var pathUrl = "${createLink(controller: 'store', absolute:'true')}";
        //--------------------------------------------Translations Labels ------------------------------------------------------

        var addToCart_label = "${message(code:'store.common.addToCart')}";





        var partailURL = "${resource(dir: 'store', file: 'partial.html')}";
    </script>
</head>

<body class="Sellya - Premium OpenCart Theme" style="float: none; margin: 0px;" data-twttr-rendered="true">
<div class="wrapper">
    <div class="container">
        <div id="t-header" class="row">
            <div id="lc_dropdown">
                    <div id="language" class="dropdown_l">
                        <div class="arrow" >&nbsp;</div><div class="selected_l" id="countrySelectedId">English</div>
                        <ul class="options_l" id="countriesId">

                        </ul>
                    </div>
                    <div id="currency" class="dropdown_l"><div class="arrow">&nbsp;</div><div class="selected_l" id="currencySelectedId">Currency: Euro</div>
                        <ul class="options_l" id="currenciesId">

                        </ul>
                    </div>
            </div>
            <div id="cart">
                <div class="heading">
                    <!-- <h5>Shopping Cart</h5> -->
                    <a><span id="cart-total">0 item(s) - $0.00</span></a></div>
                <div class="content">
                    <div class="empty">Your shopping cart is empty!</div>
                </div>
            </div>
        <header >
            <div class="navbar visible-phone">
                <div class="navbar-inner">
                    <div class="container">
                            <div id="search" class="span4">
                                <div class="button-search"></div>
                                <input type="text" name="search" placeholder="Search" value=""/>
                            </div>
                        </div>
                        <a class="btn btn-navbar brand" data-toggle="collapse" data-target=".nav-collapse">
                            MENU <img src="images/store/images/dropdown.png" title="MENU" alt="MENU">
                        </a>
                        <div class="nav-collapse">
                            <ul class="nav">
                                <li class="dropdown">
                                    <div id="homepage">
                                        <a href="javascript:void(0);" >
                                            <img src="images/store/images/homepage.png" title="Sellya" alt="Sellya">
                                        </a>
                                    </div>
                                    <ul class="dropdown-menu" id="CategoriesMenuPhone">

                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <nav id="menu" class="row hidden-phone">
                <div id="homepage"><a href="javascript:void(0);" onclick="javascript:refreshPage()" >Home</a></div>
                <div id="menu-category-wall">
                    <ul>
                        <li>
                            <a>Categories</a>
                            <div class="span10"  id ="CategoriesMenu">

                            </div>
                        </li>
                    </ul>
                </div>

                <div id="menu_brands">
                    <ul>
                        <li>
                            <a>Brands</a>
                            <div class="span8" id="BrandsMenu">

                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <section id="midsection" class="container">
            <div class="row">
                <div id="content-home" class="span12">
                    <section id="banner-slider" class="fluid_container">
                        <div class="camera_wrap camera_azure_skin" id="camera_wrap_0">
                            <div data-link="http://www.google.com" data-thumb="images/store/images/unlimited_colors_9-940x350.png" data-src="images/store/images/unlimited_colors_9-940x350.png"></div>
                            <div data-link="http://www.google.com" data-thumb="images/store/images/admin_9-940x350.png" data-src="images/store/images/admin_9-940x350.png"></div>
                            <div data-link="http://www.google.com" data-thumb="images/store/images/responsive_7-940x350.png" data-src="images/store/images/responsive_7-940x350.png"></div>
                        </div>
                    </section>
                    <script>
                        jQuery(function(){
                            jQuery('#camera_wrap_0').camera({
                                thumbnails: true,
                                loader: true,
                                hover: true
                            });
                        });
                    </script>

                    <section id="featured" class="featured span">
                        <h2>Featured</h2>
                        <div id="carousel-featured-0" class="es-carousel-wrapper">
                            <div class="es-carousel">
                                <ul style="width: 1155px; display: block; margin-left: 0px;" id="featuredList">

                                </ul>
                            </div>

                        </div>
                    </section>
                    <section id="latest" class="latest span">
                        <h2>last visited</h2>
                        <div id="carousel-latest-0" class="es-carousel-wrapper">
                            <div class="es-carousel">
                                <ul style="width: 2758px; display: block; margin-left: 0px;" id="LastVisetedList">

                                </ul>
                            </div>
                            <div class="es-nav">
                                <span class="es-nav-prev" style="display: none;">Previous</span>
                                <span class="es-nav-next" style="display: block;">Next</span>
                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </section>

        <section id="productListSection" class="container" style="display:none;margin: 20px auto 10px;">
            <div class="row">
                <div id="lrc" class="hidden-phone">
                    <aside id="column-left" class="span3">
                        <div class="box">
                            <div class="box-heading"><h2>Categories</h2></div>
                            <div class="box-content">
                                <div class="box-category">
                                    <ul class="accordion" id="accordion-1">
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="box-heading"><h2>Featured</h2></div>
                            <div class="box-content">
                                <div class="box-product" id="featuredBoxProductId">
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="box-heading"><h2>last visited</h2></div>
                            <div class="box-content">
                                <div class="box-product" id="lastBoxProductId">
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
                <section id="content" class="span9">
                    <div class="row-fluid">
                        <div class="breadcrumb">
                        </div>
                        <header class="category-name"></header>
                        <div class="product-filter">
                            <div class="display">
                                Display:&nbsp;<img src="images/store/images/icon_list.png" alt="List" title="List"/>&nbsp;
                                <a onclick="display('grid');"><img src="images/store/images/icon_grid.png" alt="Grid" title="Grid"/></a>
                            </div>
                            <div class="limit">
                                Show:
                                <select onchange="location = this.value;">
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;limit=15" selected="selected">15</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;limit=25">25</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;limit=50">50</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;limit=75">75</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;limit=100">100</option>
                                </select>
                            </div>
                            <div class="sort">
                                Sort By:
                                <select onchange="location = this.value;">
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;sort=p.sort_order&amp;order=ASC" selected="selected">Default</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;sort=pd.name&amp;order=ASC">Name (A - Z)</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;sort=pd.name&amp;order=DESC">Name (Z - A)</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;sort=p.price&amp;order=ASC">Price (Low &gt; High)</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;sort=p.price&amp;order=DESC">Price (High &gt; Low)</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;sort=rating&amp;order=DESC">Rating (Highest)</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;sort=rating&amp;order=ASC">Rating (Lowest)</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;sort=p.model&amp;order=ASC">Model (A - Z)</option>
                                    <option value="http://serwer1382018.home.pl/sellya/index.php?route=product/category&amp;path=59_60&amp;sort=p.model&amp;order=DESC">Model (Z - A)</option>
                                </select>
                            </div>
                        </div>
                        <div class="product-list" id="productListDivId">
                        </div>
                        <div class="pagination"><div class="results">Showing 1 to 8 of 8 (1 Pages)</div></div>
                    </div>
                </section>
            </div>
        </section>
        <section id="productDetails" style="display:none;margin: 20px auto 10px;" ></section>
    </div>
</div>
</body>
</html>