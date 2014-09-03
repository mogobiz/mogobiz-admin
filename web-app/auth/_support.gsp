<r:script>
	$(function(){
		$.ajax({
			url : "${createLink(controller: 'country')}",
			type : "GET",
			data : "format=json",
			dataType : "json",
			cache : false,
			async : true,
			success : function(data, status) {
				$.each(data, function(i, value) {
					$('#createCompanyCountry').append("<option value='" + value.id + "'>" + value.name + "</option>");
				});
			}
		});
		$('#commencerDiv a').bind('click', function() {
			validateCreateCompanyForm();
		});
	});
	function validateCreateCompanyForm(){
		if($('#createCompanyName').val() == ""){
			$('#createCompanyName').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : "${message(code:'company.general.errors.requiredStoreName.label')}",
				stay : false,
				type : 'error'
			});
			return;
		}
		if(!$('input#createCompanyName')[0].checkValidity()){
			$('#createCompanyName').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : "${message(code:'company.general.errors.invalidStoreName.label')}",
				stay : false,
				type : 'error'
			});
			return;
		}
		if($('#createCompanyCode').val() == ""){
			$('#createCompanyCode').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : "${message(code:'company.general.errors.requiredStoreCode.label')}",
				stay : false,
				type : 'error'
			});
			return;
		}
		if(!$('input#createCompanyCode')[0].checkValidity()){
			$('#createCompanyCode').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : "${message(code:'company.general.errors.invalidStoreCode.label')}",
				stay : false,
				type : 'error'
			});
			return;
		}
		if($('#createCompanyEmail').val() == ""){
			$('#createCompanyEmail').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : "${message(code:'company.general.errors.requiredEmail.label')}",
				stay : false,
				type : 'error'
			});
			return;
		}
		if(!$('input#createCompanyEmail')[0].checkValidity()){
			$('#createCompanyEmail').focus();
			jQuery.noticeAdd({
				stayTime : 2000,
				text : "${message(code:'company.general.errors.invalidEmail.label')}",
				stay : false,
				type : 'error'
			});
			return;
		}
		if($('#createCompanyCountry').val() == null) {
			jQuery.noticeAdd({
				stayTime : 2000,
				text : "${message(code:'company.general.errors.requiredCountry.label')}",
				stay : false,
				type : 'error'
			});
			return;
		}
		checkUniqueCompanyName();
	}

	function checkUniqueCompanyName(){
		$.ajax({
			url : "${createLink(controller: 'company', action:'isNameNew')}",
			type : "GET",
			data : "name=" + $('#createCompanyName').val(),
			dataType : "json",
			cache : false,
			async : true,
			success : function(response, status) {
				var existCode  = response.result;
				if (existCode == "success"){
					checkUniqueCompanyCode()
				}
				else {
					jQuery.noticeAdd({
						stayTime : 2000,
						text : "${message(code:'company.mane.exist.label')}",
						stay : false,
						type : 'error'
					});
					$('#createCompanyName').focus();
					$('#createCompanyName').css("background-image", 'url("../images/uncheck.png")');
					$("#createCompanyName").unbind();
					$("#createCompanyName").keyup(function() {
						$('#createCompanyName').removeAttr("style");
					});
				}
			}
		});
	}

	function checkUniqueCompanyCode(){
		$.ajax({
			url : "${createLink(controller: 'company', action:'isCodeNew')}",
			type : "GET",
			data : "code=" + $('#createCompanyCode').val(),
			dataType : "json",
			cache : false,
			async : true,
			success : function(response, status) {
				var existCode  = response.result;
				if (existCode == "success"){
					checkUniqueSellerMail()
				}
				else {
					jQuery.noticeAdd({
						stayTime : 2000,
						text : "${message(code:'company.code.exist.label')}",
						stay : false,
						type : 'error'
					});
					$('#createCompanyCode').focus();
					$('#createCompanyCode').css("background-image", 'url("../images/uncheck.png")');
					$("#createCompanyCode").unbind();
					$("#createCompanyCode").keyup(function() {
						$('#createCompanyCode').removeAttr("style");
					});
				}
			}
		});
	}

	function checkUniqueSellerMail(){
		$.ajax({
			url : "${createLink(controller: 'seller', action: 'isEmailNew')}",
			type : "GET",
			data : "email=" + $('#createCompanyEmail').val(),
			dataType : "json",
			cache : false,
			async : true,
			success : function(response, status) {
				var existCode  = response.result;
				if (existCode == "success"){
					createCompany()
				}
				else {
					jQuery.noticeAdd({
						stayTime : 2000,
						text : "${message(code:'company.sellers.errors.emailMustBeUnique.label')}",
						stay : false,
						type : 'error'
					});
					$('#createCompanyEmail').focus();
					$('#createCompanyEmail').css("background-image", 'url("../images/uncheck.png")');
					$("#createCompanyEmail").unbind();
					$("#createCompanyEmail").keyup(function() {
						$('#createCompanyEmail').removeAttr("style");
					});
				}
			}
		});
	}

	function createCompany(){
		var dataToSend = $('#companyAddForm').serialize();
		dataToSend += "&format=json";
		$.ajax({
			url : "${createLink(controller: 'company', action:'save')}",
			type : "POST",
			noticeType : "POST",
			data : dataToSend,
			dataType : "json",
			cache : false,
			async : true,
			success : function(response, status) {
				if(response.success){
					$('#inscriptionDiv').hide();
					$('#signInDiv').show();
				}
			}
		});
	}
</r:script>
<div class="mainContent" align="center">
	<div class="page" >
		<div id="joinV2Wrapper">
			<div class="support">
				<div class="crossheadWrapper">
					<div class="supportTitle">
						<a>
							<img alt="<g:message code="logIn.SupportAltImage.label" />" class="imageTitle" src="${resource(dir: 'images', file: 'icon.png')}" title="<g:message code="logIn.SupportTitleImage.label" />"></img>
						</a>
						<h1 align="left">
							<g:message code="logIn.SupportTitle.label" />
						</h1>
						<p align="left"><g:message code="logIn.SupportTitleS.label" /></p>
					</div>
				</div>
				<div class="contentWrapper">
					<div class="support">
						<form id="join">
							<div class="field startRow">
								<label for="createCompanyName"><g:message code="company.general.storeName.label"/></label>
								<%--<span class="helpText"><g:message code="logIn.SupportHelpText.label" /></span>--%>
								<input class="text" type="text" name="company.name" id="createCompanyName" pattern="[a-zA-Z0-9- ]+"/>
							</div>

							<div class="field">
								<label for="createCompanyCode"><g:message code="company.general.storeCode.label"/></label>
								<%--<span class="helpText"><g:message code="logIn.SupportHelpText.label" /></span>--%>
								<input class="text" type="text" name="company.code" id="createCompanyCode" pattern="[a-zA-Z0-9]+"/>
							</div>

							<div class="field startRow">
								<label for="createCompanyEmail"><g:message code="company.general.email.label"/></label>
								<%--<span class="helpText"><g:message code="logIn.SupportNomHelpText.label" /></span>--%>
								<input class="text" type="email" name="company.email" id="createCompanyEmail" pattern="[a-zA-Z0-9._-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}"/>
							</div>

							<div class="field">
								<label for="createCompanyCountry"><g:message code="company.general.country.label"/></label>
								<%--<span class="helpText"><g:message code="logIn.SupportHelpText.label" /></span>--%>
								<select name="company.location.countryCode" id="createCompanyCountry" class="select"></select>
							</div>

							<div id="commencerDiv" class="sUBody">
								<a>
									<span class="pButton fatButton blueColor fullWidth"><g:message code="logIn.SupportCreerButton.label" /></span>
								</a>
							</div>
						</form>
						<div class="clear"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
