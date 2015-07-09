$(function() {
	$('#inner-content').empty();

	$('#inscriptionLink').click(function() {
		$('#signInDiv').hide();
		$('#inscriptionDiv').show();
	});

	$('#logoIperPic').click(function() {
		$('#signInDiv').hide();
		$('#inscriptionDiv').show();
	});

	$('#username').focus(function() {
		$('#usernameSection').addClass('focused');
	}).blur(function() {
		$('#usernameSection').removeClass('focused');
	});
	$('#password').focus(function() {
		$('#passwordSection').addClass('focused');
	}).blur(function() {
		$('#passwordSection').removeClass('focused');
	});
	$('#username').keyup(function() {
		if ($('#username').val() != '')
			$('#usernameSection').addClass('filled');
		else
			$('#usernameSection').removeClass('filled');
	});
	$('#password').keyup(function() {
		if ($('#password').val() != '')
			$('#passwordSection').addClass('filled');
		else
			$('#passwordSection').removeClass('filled');
	});
	$('#username').change(function() {
		if ($('#username').val() != '')
			$('#usernameSection').addClass('filled');
		else
			$('#usernameSection').removeClass('filled');
	});
	$('#password').change(function() {
		if ($('#password').val() != '')
			$('#passwordSection').addClass('filled');
		else
			$('#passwordSection').removeClass('filled');
	});

	setTimeout(function() {
		if ($('#usernameSection input#username').val() != "") {
			$('#usernameSection').addClass('filled');
		}
		if ($('#passwordSection input#password').val() != "") {
			$('#passwordSection').addClass('filled');
		}
	}, 100);
});