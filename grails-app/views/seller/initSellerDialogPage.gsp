<%@ page contentType="text/html; charset=UTF-8" %>

<div id="sellerDialog">
  <form id="formSeller" name="formSeller" onsubmit="return false;">
    <div class="errors"></div>
    <div id="sellerContent">
      <div class="newline">
        <div class="sellerDialog-medium">
          <label for="sellerFirstName"><g:message code="company.sellers.firstName.label" />&nbsp;<sup>*</sup></label>
        </div>
      </div>
      <div class="spacer-small"></div>
      <div class="newline">
        <div class="sellerDialog-medium">
          <input type="text" name="seller.firstName" id="sellerFirstName"/>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="newline">
        <div class="sellerDialog-medium">
          <label for="sellerLastName"><g:message code="company.sellers.lastName.label" />&nbsp;<sup>*</sup></label>
        </div>
      </div>
      <div class="spacer-small"></div>
      <div class="newline">
        <div class="sellerDialog-medium">
          <input type="text" name="seller.lastName" id="sellerLastName"/>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="newline">
        <div class="sellerDialog-medium">
          <label for="sellerEmail"><g:message code="company.sellers.email.label" />&nbsp;<sup>*</sup></label>
        </div>
      </div>
      <div class="spacer-small"></div>
      <div class="newline">
        <div class="sellerDialog-medium">
          <input type="email" name="seller.email" id="sellerEmail" pattern="[a-zA-Z0-9._-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}"/>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="newline">
        <div class="sellerDialog-medium sellerConfirmEmailDiv">
          <label for="sellerConfirmEmail" id="sellerConfirmEmailLabel" ><g:message code="company.sellers.confirmEmail.label" />&nbsp;<sup>*</sup></label>
        </div>
      </div>
      <div class="spacer-small"></div>
      <div class="newline">
        <div class="sellerDialog-medium sellerConfirmEmailDiv">
          <input type="email" id="sellerConfirmEmail" pattern="[a-zA-Z0-9._-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}"/>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="spacer"></div>
      <div class="newline">
        <div class="sellerDialog-medium">
          <input type="checkbox" name="seller.admin" id="sellerAdmin" value="true" />
          <label for="sellerAdmin"><g:message code="company.sellers.isAdmin.label" /></label>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="newline">
        <div class="sellerDialog-medium">
          <input type="checkbox" name="seller.sell" id="sellerSell" value="true"  />
          <label for="sellerSell"><g:message code="company.sellers.isSeller.label" /></label>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="newline">
        <div class="sellerDialog-medium">
          <input type="checkbox" name="seller.validator" id="sellerValidator" value="true"  />
          <label for="sellerValidator"><g:message code="company.sellers.isValidator.label" /></label>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="newline">
        <div class="sellerDialog-medium">
          <input type="checkbox" name="seller.active" id="sellerActive" value="true" />
          <label for="sellerActive"><g:message code="company.sellers.isActive.label" /></label>
        </div>
      </div>
      <div class="spacer"></div>
    </div>
  </form>
</div>