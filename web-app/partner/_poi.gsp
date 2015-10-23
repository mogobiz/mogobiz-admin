<g:set var="lang" value="${session.'org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'}"/>
<style type="text/css">
	#creatPoiDiv, #poiTranslationDiv{
		font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
		font-size: 11px;
		color: #888;
		text-align: left;
		direction: ltr;
		width: 500px;
	}
	#poiDialog {
		font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
		font-size: 11px;
		color: #888;
		text-align: left;
		direction: ltr;
		background:#F2F2F2;
		border:1px solid #CCCCCC;
		padding: 10px;
		margin: 5px 0px 0px 0px;
	}
	#poiTabs ul.tabs{
		padding-top: 5px;
		padding-left: 0px;
	}
	img#poiPictureImg {
		background-color:#fff;
		border-width:1px;
		border-style:solid;
		border-bottom-color:#aaa;
		border-right-color:#aaa;
		border-top-color:#ddd;
		border-left-color:#ddd;
		border-radius:3px;
		-moz-border-radius:3px;
		-webkit-border-radius:3px;
	}
</style>
<div id="poiTabs">
	<div id="ulTabs">
		<ul class="tabs">
			<li>
				<a id="poiGeneralTab">
					<g:message locale="${lang}" code="tabs.general.label" />
				</a>
			</li>
			<li>
				<a id="poiTranslationTab">
					<g:message locale="${lang}" code="tabs.translation.label" />
				</a>
			</li>
		</ul>
		<hr style="margin-top: 5px;" />
	</div>
	<div id="creatPoiDiv">
		<div id="poiAddress" align="left">
			<form id="poiPrdLocationForm" name="form_poiPrdLocation">
				<input type="hidden" name="poi.country.code" id="poiCountryCode"/>
				<input type="hidden" name="poi.city" id="poiCity"/>
				<input type="hidden" name="poi.latitude" id="poiLat"/>
				<input type="hidden" name="poi.longitude" id="poiLng"/>
			</form>
		</div>
		<div id="poiInfosForm" align="left">
			<form id="poiPrdInfoForm" name="form_poiPrdInfos">
				<div class="newline">
					<div style="float: left; margin-right: 15px; padding-top: 15px;">
						<label for="poiPictureImg" id="poiPictureImgLabel"><g:message locale="${lang}" code="poi.icon.label" /></label>
					</div>
					<div style="float: left;">
						<a href="javascript:openPoiPictureDialog()"><img id="poiPictureImg" src="../images/markers/tourism/information.png"></a>
					</div>
				</div>
				<div class="spacer"></div>
				<div class="newline">
					<label for="poiName" id="poiNameLabel"><g:message locale="${lang}" code="poi.name.label" />&nbsp;<sup>*</sup></label>
				</div>
				<div class="spacer-small"></div>
				<div class="newline">
					<input type="text" name="poi.name" id="poiName" required/>
				</div>
				<div class="spacer"></div>
				<div class="newline">
					<label for="poiAdress" id="poiAdressLabel"><g:message locale="${lang}" code="poi.address.label" />&nbsp;<sup>*</sup></label>
				</div>
				<div class="spacer-small"></div>
				<div class="newline">
					<input type="text" id="poiAdress" placeholder="<g:message locale="${lang}" code="poi.addressInputPlaceholder.label" />" required/>
				</div>
				<div class="spacer"></div>
				
				<input type="hidden" name="poi.postalCode" id="poiPostalCode"/>
				<input type="hidden" name="poi.roadNum" id="poiRoadNum"/>
				<input type="hidden" name="poi.road1" id="poiRoad1"/>
				<input type="hidden" name="poi.road2" id="poiRoad2"/>
				<input type="hidden" name="poi.road3" id="poiRoad3"/>
				<input type="hidden" name="poi.picture" id="poiPicture" value="information.png"/>
				<input type="hidden" name="poi.pictureType" id="poiPictureType" value="tourism"/>
	
				<div class="newline">
					<label for="poiDescription" id="poiDescriptionLabel"><g:message locale="${lang}" code="poi.description.label" /></label>
				</div>
				<div class="spacer-small"></div>
				<div class="newline">
					<textarea name="poi.description" id="poiDescription"></textarea>
				</div>
				<div class="spacer"></div>
				<div class="newline">
					<input type="checkbox" checked="checked" id="poiMain">&nbsp;<g:message locale="${lang}" code="poi.isMain" />
				</div>
				<div class="spacer"></div>
			</form>
		</div>
	</div>
	<div id="poiTranslationDiv" >
		<div style="padding: 10px;">
			<a id="poiTranslationAddLink"><g:message locale="${lang}" code="translation.add.label" /></a>
		</div>
		<div id="poiTranslationGridDiv">
			<div id="poiTranslationGrid" style="height: 144px;"></div>
		</div>
	</div>
</div>