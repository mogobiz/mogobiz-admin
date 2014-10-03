<%@ page contentType="text/html; charset=UTF-8" %>

<ul>
<g:each in="${retList?}">
	<li id=${it.id} class="item">
		<a href ="javascript:void(0)" class = "listTitle" id="description${it.id}" onclick="compObjGetEditCompanyPage(${it.id}, '${it.code}');">${it.name}</a><br/><br/>
		<label class="listAttributes"><g:message code="company.website.label" /></label>:&nbsp;&nbsp;<label id="companyWebsiteLabel${it.id}">${it.website}</label><br/>
		<label class="listAttributes"><g:message code="company.phone.label" /></label>:&nbsp;&nbsp;<label id="companyPhoneLabel${it.id}">${it.phone}</label><br/>
		<div id="details${it.id}">
		<hr/>
		<br/>
		</div>
	</li>
<script>
	if($('#companyWebsiteLabel${it.id}') !=""){
		$('#companyWebsiteLabel${it.id}').text(shortTheString($('#companyWebsiteLabel${it.id}').text(),30));
	}
	if($('#companyPhoneLabel${it.id}') !=""){
		$('#companyPhoneLabel${it.id}').text(shortTheString($('#companyPhoneLabel${it.id}').text(),10));
	}
	$('#description${it.id}').text(shortTheString($('#description${it.id}').text(),40));	
</script>
</g:each>
</ul>