<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr" xml:lang="fr">
<head>
    <title>Social Networks</title>
    <link rel="shortcut icon" href="${resource(dir: 'images', file: 'favicon.ico')}" type="image/x-icon"/>
    %{--<r:require modules="social"/>--}%
    <r:layoutResources/>
    <%
        String env = grails.util.Environment.current.name
    %>

    <!-- stylesheet -->
    <link rel="stylesheet" type="text/css"
          href='${resource(dir: "css", file: "${env}/jquery-ui/themes/facebook-theme/jquery-ui-1.8.10.custom.css")}'/>
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/main.css")}'/>
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/social.css")}'/>

    <!-- javascript -->
    <g:javascript src="${env}/jquery/jquery-1.9.1.js"/>
    <g:javascript src="${env}/jquery/jquery-ui.js"/>

</head>

<body>
<div id="container" class="group">
    <div id="header" class="group">
        <!-- header -->
        <div id="logo" style="float:left;">
            <img src="${resource(dir: 'images', file: 'ebiznext_logo.png')}"/>
        </div>

        <div id="backBtnDiv" style="float: right;">
            <a href="${createLink(controller: 'partner')}"><button type="submit" id="" class="fk_ok_btn">Back</button>
            </a>
        </div>
    </div>

    <div id="main" class="group">
        <div id="content" style="width: 100%;max-width: 100%;display: block;">
            <div id="inner-content" class="socialNetwork">
                <div class="newline social_div">
                    <!-- <h1>FACEBOOK</h1> -->
                    <a class="social_href" href="${createLink(controller: 'social', action: 'facebook')}"><img
                            src="${resource(dir: 'images/social_icons', file: 'facebook.png')}" title="Facebook"
                            alt="Facebook"/><span>&nbsp;Facebook</span></a>
                    <span class="social_span">
                        <g:if test="${result.FACEBOOK}">
                            ${result.FACEBOOK}
                            <button type="button" class="fk_ko_btn" style="float: none;"
                                    onclick="javascript:document.getElementById('facebook-unsubscribe').submit()">Unsubscribe</button>

                            <form id="facebook-unsubscribe"
                                  action="${createLink(uri: '/social/socialOff?social=FACEBOOK')}" method="post"></form>
                        </g:if>
                        <g:else>
                            No Facebook account
                            <button type="button" class="fk_ok_btn" style="float: none;"
                                    onclick="javascript:document.getElementById('facebook-subscribe').submit()">Subscribe</button>

                            <form id="facebook-subscribe"
                                  action="${createLink(controller: 'social', action: 'facebook')}" method="post"></form>
                        </g:else>
                    </span>
                </div>

                <hr/>

                <div class="newline social_div">
                    <!-- <h1>TWITTER</h1> -->
                    <a class="social_href" href="${createLink(controller: 'social', action: 'twitter')}"><img
                            src="${resource(dir: 'images/social_icons', file: 'twitter.png')}" title="Twitter"
                            alt="Twitter"/><span>&nbsp;Twitter</span></a>
                    <span class="social_span">
                        <g:if test="${result.TWITTER}">
                            ${result.TWITTER}
                            <button type="button" class="fk_ko_btn" style="float: none;"
                                    onclick="javascript:document.getElementById('twitter-unsubscribe').submit()">Unsubscribe</button>

                            <form id="twitter-unsubscribe"
                                  action="${createLink(uri: '/social/socialOff?social=TWITTER')}" method="post"></form>
                        </g:if>
                        <g:else>
                            No Twitter account
                            <button type="button" class="fk_ok_btn" style="float: none;"
                                    onclick="javascript:document.getElementById('twitter-subscribe').submit()">Subscribe</button>

                            <form id="twitter-subscribe" action="${createLink(controller: 'social', action: 'twitter')}"
                                  method="post"></form>
                        </g:else>
                    </span>
                </div>

                <hr/>

                <div class="newline social_div">
                    <!-- <h1>YouTube / Picasa</h1> -->
                    <a class="social_href" href="${createLink(controller: 'social', action: 'google')}"><img
                            src="${resource(dir: 'images/social_icons', file: 'google.gif')}" title="YouTube / Picasa"
                            alt="YouTube / Picasa"/><span>&nbsp;YouTube / Picasa</span></a>
                    <span class="social_span">
                        <g:if test="${result.GOOGLE}">
                            ${result.GOOGLE}
                            <button type="button" class="fk_ko_btn" style="float: none;"
                                    onclick="javascript:document.getElementById('youtube-unsubscribe').submit()">Unsubscribe</button>

                            <form id="youtube-unsubscribe"
                                  action="${createLink(uri: '/social/socialOff?social=GOOGLE')}" method="post"></form>
                        </g:if>
                        <g:else>
                            No Google account
                            <button type="button" class="fk_ok_btn" style="float: none;"
                                    onclick="javascript:document.getElementById('youtube-subscribe').submit()">Subscribe</button>

                            <form id="youtube-subscribe" action="${createLink(controller: 'social', action: 'google')}"
                                  method="post"></form>
                        </g:else>
                    </span>
                </div>

                <hr/>

                <%--<div class="newline social_div">
                    <!-- <h1>YouTube / Picasa</h1> -->
                    <a class="social_href" href="${createLink(controller:'social', action:'google') }"><img src="${resource(dir:'images/social_icons',file:'picasa.png')}" title="Picasa" alt="Picasa"/><span>&nbsp;Picasa</span></a>
                    <span class="social_span" >
                        <g:if test="${result.GOOGLE}">
                            ${result.GOOGLE}
                            <button type="button" class="fk_ko_btn" style="float: none;" onclick="javascript:document.getElementById('picasa-unsubscribe').submit()">Unsubscribe</button>
                            <form id="picasa-unsubscribe" action="${createLink(uri:'/social/socialOff?social=GOOGLE') }" method="post"></form>
                        </g:if>
                        <g:else>
                             No Picasa account
                            <button type="button" class="fk_ok_btn" style="float: none;" onclick="javascript:document.getElementById('picasa-subscribe').submit()">Subscribe</button>
                            <form id="picasa-subscribe" action="${createLink(controller:'social', action:'google')}" method="post"></form>
                        </g:else>
                    </span>
                </div>

                <hr/>--%>

                <div class="newline social_div">
                    <!-- <h1>YouTube / Picasa</h1> -->
                    <a class="social_href" href="${createLink(controller: 'social', action: 'addExternalAccount')}"><img
                            src="${resource(dir: 'images/social_icons', file: 'vimeo.png')}" title="Vimeo"
                            alt="Vimeo"/><span>&nbsp;Vimeo</span></a>
                    <span class="social_span">
                        <g:if test="${result.VIMEO}">
                            ${result.VIMEO}
                            <button type="button" class="fk_ko_btn" style="float: none;"
                                    onclick="javascript:document.getElementById('vimeo-unsubscribe').submit()">Unsubscribe</button>

                            <form id="vimeo-unsubscribe"
                                  action="${createLink(uri: '/social/socialOff?social=externalAccount')}"
                                  method="post"></form>
                        </g:if>
                        <g:else>
                            No Vimeo account
                            <button type="button" class="fk_ok_btn" style="float: none;"
                                    onclick="javascript:document.getElementById('vimeo-subscribe').submit()">Subscribe</button>

                            <form id="vimeo-subscribe" action="" method="post"></form>
                        </g:else>
                    </span>
                </div>

                <hr/>

                <div class="newline social_div">
                    <!-- <h1>YouTube / Picasa</h1> -->
                    <a class="social_href" href="${createLink(controller: 'social', action: 'addExternalAccount')}"><img
                            src="${resource(dir: 'images/social_icons', file: 'dailymotion.png')}" title="Dailymotion"
                            alt="Dailymotion"/><span>&nbsp;Dailymotion</span></a>
                    <span class="social_span">
                        <g:if test="${result.DAILYMOTION}">
                            ${result.DAILYMOTION}
                            <button type="button" class="fk_ko_btn" style="float: none;"
                                    onclick="javascript:document.getElementById('dailymotion-unsubscribe').submit()">Unsubscribe</button>

                            <form id="dailymotion-unsubscribe"
                                  action="${createLink(uri: '/social/socialOff?social=externalAccount')}"
                                  method="post"></form>
                        </g:if>
                        <g:else>
                            No Dailymotion account
                            <button type="button" class="fk_ok_btn" style="float: none;"
                                    onclick="javascript:document.getElementById('dailymotion-subscribe').submit()">Subscribe</button>

                            <form id="dailymotion-subscribe" action="" method="post"></form>
                        </g:else>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <br class="clear"/>
</div>

<div id="footer">
&copy; ebiznext
</div>
</body>
</html>