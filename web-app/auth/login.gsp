<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr" xml:lang="fr">
<head>
<meta name="layout" content="empty" />
%{--<r:require modules="login" />--}%
<link rel="shortcut icon"
	href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
</head>
<body>
    <g:if env="development">
        <g:set var="env" value="development"/>
    </g:if>
    <g:else>
        <g:set var="env" value="release"/>
    </g:else>

    <!-- stylesheet -->
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery-ui/themes/facebook-theme/jquery-ui-1.8.10.custom.css")}' />
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/main.css")}' />
    <link rel="stylesheet" type="text/css" href='${resource(dir: "css", file: "${env}/jquery.notice/jquery.notice.css")}' />

    <!-- javascript -->
    <g:javascript src="${env}/jquery/jquery-1.9.1.js"/>
    <g:javascript src="${env}/jquery/jquery-ui.js"/>
    <g:javascript src="${env}/jquery/jquery.notice.js"/>
    <g:javascript src="${env}/login.js"/>


	<div id="signInDiv" align="center">
		<div id="main" class="page" style="width: 460px;">
			<table width="100%">
				<tr>
					<td %{--width="55%"--}%>
						<div id="signinSection" class="extraPadded">
							<div class="sIHeader">
								<h1>
									<g:message code="logIn.title" />
								</h1>
							</div>
							<div class="sIBody">
								<div class="signInListBorder">
									%{--<div class="signInList">--}%
										%{--<div class="signInPartner">--}%
											%{--<a--}%
												%{--href="${createLink(controller: 'externalAuth', action:'facebook')}?targetUri=${params.targetUri}">--}%
												%{--<img alt="<g:message code="logIn.altFacebook.label" />"--}%
												%{--src="${resource(dir:'images/icons',file:'facebook.png')}"--}%
												%{--title="<g:message code="logIn.TitleFacebook.label" />"></img>--}%
												%{--<div class="partnerName">--}%
													%{--<g:message code="logIn.Facebook.label" />--}%
												%{--</div>--}%
											%{--</a>--}%
										%{--</div>--}%
										%{--<div class="signInPartner">--}%
											%{--<a--}%
												%{--href="${createLink(controller: 'externalAuth', action:'google')}?targetUri=${params.targetUri}">--}%
												%{--<img alt="<g:message code="logIn.altGoogle.label" />"--}%
												%{--src="${resource(dir:'images/icons',file:'google.png')}"--}%
												%{--title="<g:message code="logIn.titleGoogle.label" />"></img>--}%
												%{--<div class="partnerName">--}%
													%{--<g:message code="logIn.Google.label" />--}%
												%{--</div>--}%
											%{--</a>--}%
										%{--</div>--}%
										%{--<div class="signInPartner">--}%
											%{--<a> <img alt="<g:message code="logIn.altYahoo.label" />"--}%
												%{--src="${resource(dir:'images/icons',file:'yahoo.png')}"--}%
												%{--title="<g:message code="logIn.titleYahoo.label" />"></img>--}%
												%{--<div class="partnerName">--}%
													%{--<g:message code="logIn.Yahoo.label" />--}%
												%{--</div>--}%
											%{--</a>--}%
										%{--</div>--}%
										%{--<div class="signInPartner signInPartnerLast">--}%
											%{--<a> <img alt="<g:message code="logIn.altOpenID.label" />"--}%
												%{--src="${resource(dir:'images/icons',file:'openid.png')}"--}%
												%{--title="<g:message code="logIn.titleOpenID.label" />"></img>--}%
												%{--<div class="partnerName">--}%
													%{--<g:message code="logIn.OpenID.label" />--}%
												%{--</div>--}%
											%{--</a>--}%
										%{--</div>--}%
										%{--<div style="clear: both"></div>--}%
									%{--</div>--}%
								</div>
								<br>
									<div class="sIHeader">
										%{--<h1>--}%
											%{--<g:message code="logIn.headerForm.label" />--}%
										%{--</h1>--}%
									</div>
									<div>
										<g:form controller="auth" action="signIn" name="login-form">
											<g:hiddenField name="targetUri" value="${params.targetUri}" />
											<div id="usernameSection" class="newline">
												<label><g:message code="logIn.Email.label" /></label>
												<g:textField name="username" value="${params.username}" />
											</div>
											<div class="spacer"></div>
											<div id="passwordSection" class="newline">
												<label><g:message code="logIn.Password.label" /></label>
												<g:passwordField name="password" />
											</div>
											<div class="spacer"></div>
											<div class="spacer"></div>
											<div class="newline" id="chekDiv">
												<button class="extraWideButton" id="login" name="submit"
													type="submit" style="cursor: pointer">
													<span style="font-size: large;"><g:message
															code="logIn.Connexion.label" /></span>
												</button>
											</div>
										</g:form>
									</div>
							</div>
						</div>
					</td>
					%{--<td>--}%
						%{--<div id="signupSection" class="extraPadded">--}%
							%{--<div class="sUContent">--}%
								%{--<div class="sUHeader">--}%
									%{--<div class="sUImage">--}%
										%{--<a><img id="logoIperPic"--}%
											%{--alt="<g:message code="logIn.altcommencementMaintenant.label" />"--}%
											%{--src="${resource(dir: 'images', file: 'icon.png')}"--}%
											%{--title="<g:message code="logIn.titlecommencementMaintenant.label" />"></a>--}%
									%{--</div>--}%
									%{--<h1>--}%
										%{--<g:message code="logIn.sUHeader.label" />--}%
									%{--</h1>--}%
								%{--</div>--}%
								%{--<div id="commencerDiv" class="sUBody">--}%
									%{--<p>--}%
										%{--<g:message code="logIn.sUBody.label" />--}%
									%{--</p>--}%
									%{--<button class="orangeButton" id="inscriptionLink">--}%
										%{--<span><g:message code="logIn.Buttoncommencement.label" /></span>--}%
									%{--</button>--}%
									%{--<div class="buttonClear"></div>--}%
								%{--</div>--}%
							%{--</div>--}%
						%{--</div>--}%
					%{--</td>--}%
				</tr>
			</table>
		</div>
	</div>
	<div align="center" id="inscriptionDiv" style="display: none;">
		<g:render template="/auth/support" />
	</div>
</body>
</html>