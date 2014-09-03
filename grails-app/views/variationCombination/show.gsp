<%@ page contentType="text/html; charset=UTF-8" %>

<form id="addVariationForm" class="fk_content_area" style="margin-bottom:10px; width:98%;" onsubmit="return false;" >
	<table cellpadding="5px;" cellspacing="10px;">
		<tr>
			<g:each in="${variation.names}">
				<td>
					<label for='variation${it.id}' id='variation${it.id}Label'>${it.name}</label>
				</td>
			</g:each>
			<td>
				<label for='weightValue' id='weightValueLabel'>Weight</label>
			</td>
			<td>
				<label for='priceValue' id='priceValueLabel'>Price</label>
			</td>
		</tr>
		<tr>
			<g:each in="${variation?.names}">
				<td>
					<select id='variation${it.id}'>
						<g:each var='selectValue' in="${it?.values}">
							<option value='${selectValue?.id}'>${selectValue?.value}</option>
						</g:each>
					</select>
				</td>
			</g:each>
			<td>
				<input type="text" pattern="[\+]?[\-]?\d+(\.\d{1,2})?[\%]?" name="vpp.weight" id="weightValue" style="width:100px;" />
				<input type="hidden" name="vpp.id" id="idValue" />
			</td>
			<td>
				<input type="text" pattern="[\+]?[\-]?\d+(\.\d{1,2})?[\%]?" name="vpp.amount" id="priceValue" style="width:100px;"/>
			</td>
		</tr>
	</table>
	<div class="fk_button_area" id="creatBtns" style="display:none;">
		<button type="reset" id="cancelAddVaiation" class="fk_ko_btn"><g:message code="default.button.cancel.label" /></button>
		<button type="submit" id="addVariationBtn" class="fk_ok_btn"><g:message code="variation.button.update.label" /></button>
	</div>
	<div class="fk_button_area" id="updateBtns" style="display:none;">
		<button type="submit" id="deleteVariationBtn" class="fk_rm_btn"><g:message code="default.button.delete.label" /></button>
		<button type="reset" id="cancelUpdateVaiation" class="fk_ko_btn"><g:message code="default.button.cancel.label" /></button>
		<button type="submit" id="updateVariationBtn" class="fk_ok_btn"><g:message code="variation.button.update.label" /></button>
	</div>
</form>
