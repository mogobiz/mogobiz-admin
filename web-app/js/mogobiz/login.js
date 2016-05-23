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

    $('#email').focus(function() {
        $('#emailSection').addClass('focused');
    }).blur(function() {
        $('#emailSection').removeClass('focused');
    }).keyup(function() {
        if ($('#email').val() != '')
            $('#emailSection').addClass('filled');
        else
            $('#emailSection').removeClass('filled');
    }).change(function() {
        if ($('#email').val() != '')
            $('#emailSection').addClass('filled');
        else
            $('#emailSection').removeClass('filled');
    });
    if($(".errorMessage").length > 0){
        jQuery.noticeAdd({
            stayTime : 5000,
            text : $(".errorMessage").html(),
            stay : false,
            type : 'error'
        });
    }
});

function showHideResetPasswordForm(){
    $("#signinSection").toggle();
    $("#resetPasswordSection").toggle();
}