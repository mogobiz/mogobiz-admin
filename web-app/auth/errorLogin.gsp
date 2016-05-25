<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr" xml:lang="fr">
<head>
    <meta name="layout" content="empty" />
    <link rel="shortcut icon"
          href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
</head>
<body>
<%
    String env = grails.util.Environment.current.name
%>

<!-- stylesheet -->
<link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery-ui/themes/facebook-theme/jquery-ui-1.8.10.custom.css")}' />
<link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/main.css")}' />

<!-- javascript -->
<g:javascript src="${env}/jquery/jquery-1.9.1.js"/>
<g:javascript src="${env}/jquery/jquery-ui.js"/>


<div id="signInDiv" align="center">
    <div id="main" class="page" style="width: 460px;">
        <table width="100%">
            <tr>
                <td>
                    <div id="signinSection" class="extraPadded">
                        <div class="sIHeader">
                            <h1>
                                <g:message locale="${lang}" code="logIn.title" />
                            </h1>
                        </div>
                        <div class="sIBody">
                            <div style="color: #FF0000">${flash.message}</div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>
</body>
</html>