<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr" xml:lang="fr">
<head>
<title><g:layoutTitle default="IPER2010 PayPal" /></title>
<link rel="shortcut icon"
	href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
<p:css name='main' />
<g:javascript library="jquery" />
<g:layoutHead />
</head>
<body>
<div id="signInDiv" align="center">
    <div id="main" class="page">
        <table>
            <tr>
                <td width="55%">
                    <div id="signinSection" class="extraPadded">
                        <div class="sIBody">
                            <br/>
                            <div class="sIHeader">
                                <h1><g:pageProperty name="page.header" /></h1>
                            </div>
                            <div>
	                            <g:layoutBody />
                            </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </div>
</div>
</body>
</html>