<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr" xml:lang="fr">
<head>
<meta name="layout" content="empty" />
%{--<r:require modules="login" />--}%
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
									<g:message locale="${lang}" code="logIn.title" />
								</h1>
							</div>
							<div class="sIBody">
								<div class="signInListBorder">
									%{--<div class="signInList">--}%
										%{--<div class="signInPartner">--}%
											%{--<a--}%
												%{--href="${createLink(controller: 'externalAuth', action:'facebook')}?targetUri=${params.targetUri}">--}%
												%{--<img alt="<g:message locale="${lang}" code="logIn.altFacebook.label" />"--}%
												%{--src="${resource(dir:'images/icons',file:'facebook.png')}"--}%
												%{--title="<g:message locale="${lang}" code="logIn.TitleFacebook.label" />"></img>--}%
												%{--<div class="partnerName">--}%
													%{--<g:message locale="${lang}" code="logIn.Facebook.label" />--}%
												%{--</div>--}%
											%{--</a>--}%
										%{--</div>--}%
										%{--<div class="signInPartner">--}%
											%{--<a--}%
												%{--href="${createLink(controller: 'externalAuth', action:'google')}?targetUri=${params.targetUri}">--}%
												%{--<img alt="<g:message locale="${lang}" code="logIn.altGoogle.label" />"--}%
												%{--src="${resource(dir:'images/icons',file:'google.png')}"--}%
												%{--title="<g:message locale="${lang}" code="logIn.titleGoogle.label" />"></img>--}%
												%{--<div class="partnerName">--}%
													%{--<g:message locale="${lang}" code="logIn.Google.label" />--}%
												%{--</div>--}%
											%{--</a>--}%
										%{--</div>--}%
										%{--<div class="signInPartner">--}%
											%{--<a> <img alt="<g:message locale="${lang}" code="logIn.altYahoo.label" />"--}%
												%{--src="${resource(dir:'images/icons',file:'yahoo.png')}"--}%
												%{--title="<g:message locale="${lang}" code="logIn.titleYahoo.label" />"></img>--}%
												%{--<div class="partnerName">--}%
													%{--<g:message locale="${lang}" code="logIn.Yahoo.label" />--}%
												%{--</div>--}%
											%{--</a>--}%
										%{--</div>--}%
										%{--<div class="signInPartner signInPartnerLast">--}%
											%{--<a> <img alt="<g:message locale="${lang}" code="logIn.altOpenID.label" />"--}%
												%{--src="${resource(dir:'images/icons',file:'openid.png')}"--}%
												%{--title="<g:message locale="${lang}" code="logIn.titleOpenID.label" />"></img>--}%
												%{--<div class="partnerName">--}%
													%{--<g:message locale="${lang}" code="logIn.OpenID.label" />--}%
												%{--</div>--}%
											%{--</a>--}%
										%{--</div>--}%
										%{--<div style="clear: both"></div>--}%
									%{--</div>--}%
								</div>
								<br>
                                <div class="sIHeader">
                                    %{--<h1>--}%
                                        %{--<g:message locale="${lang}" code="logIn.headerForm.label" />--}%
                                    %{--</h1>--}%
                                </div>
                                <div>
                                    <g:if test="${flash.message}">
                                        <div class="errorMessage" style="display: none;">${flash.message}</div>
                                    </g:if>
                                    <g:form controller="auth" action="signIn" name="login-form">
                                        <g:hiddenField name="targetUri" value="${params.targetUri}" />
                                        <div id="usernameSection" class="newline">
                                            <label><g:message locale="${lang}" code="logIn.Email.label" /></label>
                                            <g:textField name="username" value="${params.username}" />
                                        </div>
                                        <div class="spacer"></div>
                                        <div id="passwordSection" class="newline">
                                            <label><g:message locale="${lang}" code="logIn.Password.label" /></label>
                                            <g:passwordField name="password" />
                                        </div>
                                        <div class="spacer"></div>
                                        <div class="spacer"></div>
                                        <div class="newline" id="chekDiv">
                                            <a href="javascript:void(0)" onclick="showHideResetPasswordForm()" class="resetLink"><g:message locale="${lang}" code="logIn.forgetPass.label" /></a>
                                            <button class="extraWideButton" id="login" name="submit" type="submit" style="cursor: pointer">
                                                <span style="font-size: large;"><g:message locale="${lang}" code="logIn.Connexion.label" /></span>
                                            </button>
                                        </div>
                                    </g:form>
                                </div>
							</div>
						</div>
						<div id="resetPasswordSection" class="extraPadded" style="display:none">
							<div class="sIHeader">
								<h1>
									<g:message locale="${lang}" code="logIn.reset.title" />
								</h1>
							</div>
							<div class="sIBody">
								<br>
                                <div>
                                    <g:form controller="sellerPassword" action="resendPassword" name="reset-form">
                                        <div id="emailSection" class="newline">
                                            <label><g:message locale="${lang}" code="logIn.Email.label" /></label>
                                            <g:textField name="email" value="" />
                                        </div>
                                        <div class="spacer"></div>
                                        <div class="spacer"></div>
                                        <div class="newline" id="resetPassBtnDiv">
                                            <button class="extraWideButton" type="button" onclick="showHideResetPasswordForm()" style="cursor: pointer; float:left; font-weight: normal;">
                                                <span style="font-size: large;"><g:message locale="${lang}" code="default.button.cancel.label" /></span>
                                            </button>
                                            <button class="extraWideButton" id="reset" name="submit" type="submit" style="cursor: pointer">
                                                <span style="font-size: large;"><g:message locale="${lang}" code="logIn.reset.label" /></span>
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
											%{--alt="<g:message locale="${lang}" code="logIn.altcommencementMaintenant.label" />"--}%
											%{--src="${resource(dir: 'images', file: 'icon.png')}"--}%
											%{--title="<g:message locale="${lang}" code="logIn.titlecommencementMaintenant.label" />"></a>--}%
									%{--</div>--}%
									%{--<h1>--}%
										%{--<g:message locale="${lang}" code="logIn.sUHeader.label" />--}%
									%{--</h1>--}%
								%{--</div>--}%
								%{--<div id="commencerDiv" class="sUBody">--}%
									%{--<p>--}%
										%{--<g:message locale="${lang}" code="logIn.sUBody.label" />--}%
									%{--</p>--}%
									%{--<button class="orangeButton" id="inscriptionLink">--}%
										%{--<span><g:message locale="${lang}" code="logIn.Buttoncommencement.label" /></span>--}%
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
</body>
</html>