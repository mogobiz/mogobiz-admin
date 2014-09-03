var countries = [];

var CivilityType = {
	MR : 'MR',
	MRS : 'MRS',
	MISS : 'MISS'
}

var civilityTypes = [ {
	label : 'Monsieur',
	value : CivilityType.MR
}, {
	label : 'Madame',
	value : CivilityType.MRS
}, {
	label : 'Mademoiselle',
	value : CivilityType.MISS
} ]

var InputType = {
	TEXT : 'text',
	HIDDEN : 'hidden',
	PASSWORD : 'password',
	TEXTAREA : 'textarea',
	SELECT : 'select',
	MULTIPLE_SELECT : 'multiple',
	RADIO : 'radio'
}

jQuery.expr[':'].Contains = function(a, i, m) {
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(
        m[3].toUpperCase()) >= 0;
};

/**
 * load countries
 * 
 * @return the countries list from db
 */


function countriesLoad() {
    var dataToSend = "format=json";
    var regions = [];
    $.ajax({
        url : companyCountriesUrl,
        type : "GET",
        data : dataToSend,
        dataType : "json",
        cache : false,
        async : true,
        success : function(data, status) {
            countries = data;
        }
    });
}

/**
 * 
 * @param label -
 *            label pour le champs
 * @param name -
 *            nom du champs
 * @param type -
 *            type de champs
 * @param value -
 *            valeur(s) du champs
 * @param id -
 *            identifiant
 * @param options -
 *            options
 * @return html
 */
function addInput(label, name, type, value, id, cssClass, options) {
	var html = (label != '' && type != InputType.HIDDEN) ? '<label for=\"' + (id ? id : '') + '\" id=\"'
			+ (id ? id : '') + 'Label\">' + label + '</label><br/>' : '';
	switch (type) {
	case InputType.TEXT:
		html += '<input type=\"text\" name=\"' + name + '\" class=\"' + (cssClass ? cssClass : '') + '\" id=\"'
				+ (id ? id : '') + (value ? '\" value=\"' + value : '') + '\"/>';
		break;
	case InputType.HIDDEN:
		html += '<input type=\"hidden\" name=\"' + name + '\" class=\"' + (cssClass ? cssClass : '') + '\" id=\"'
				+ (id ? id : '') + (value ? '\" value=\"' + value : '') + '\"/>';
		break;
	case InputType.PASSWORD:
		html += '<input type=\"password\" name=\"' + name + '\" class=\"' + (cssClass ? cssClass : '') + '\" id=\"'
				+ (id ? id : '') + (value ? '\" value=\"' + value : '') + '\"/>';
		break;
	case InputType.TEXTAREA:
		// TODO add cols and rows attributes
		html += '<textarea name=\"' + name + '\" class=\"' + (cssClass ? cssClass : '') + '\" id=\"' + (id ? id : '')
				+ '\">' + (value ? value : '') + '</textarea>';
		break;
	case InputType.SELECT:
		html += '<select  name=\"' + name + '\" class=\"' + (cssClass ? cssClass : '') + '\" id=\"' + (id ? id : '')
				+ '\">'
		if (options) {
			for ( var i = 0; i < options.length; i++) {
				var option = options[i];
				html += '<option value=\"' + option.value + '\" ' + (value == option.value ? 'selected' : '') + '>'
						+ option.label + '</option>\r\n';
			}
		}
		html += '</select>';
		break;

	case InputType.MULTIPLE_SELECT:
		html += '<select  multiple="multiple" name=\"' + name + '\" class=\"' + (cssClass ? cssClass : '') + '\" id=\"'
				+ (id ? id : '') + '\">'
		if (options) {
			for ( var i = 0; i < options.length; i++) {
				var option = options[i];
				html += '<option value=\"' + option.value + '\" ' + (value == option.value ? 'selected' : '') + '>'
						+ option.label + '</option>\r\n';
			}
		}
		html += '</select>';
		break;
	case InputType.RADIO:
		// TODO
		break;
	default:
		break;
	}
	return html;
}


function showErrors(target, errors) {
	var errorList = $("<ul>");
	for (field in errors) {
		errorList.append("<li>" + errors[field] + "</li>")
	}
	$(target).html("").append(errorList).show(100);
}

function clear_form_elements(ele) {
	$(ele).find(':input').each(function() {
		switch (this.type) {
		case 'text':
			$(this).val('');
			break;
		case 'textarea':
			$(this).val('');
			break;
		case 'url':
			$(this).val('');
			break;
		case 'email':
			$(this).val('');
			break;
		default:
			break;
		}
	});
}

$(document).ready(function() {
	$.ajaxPrefilter(function(options) {
		if(options.hideNotice)
			return;
		var type = options.noticeType
		if (type == 'PUT') {
			jQuery.noticeAdd({
				stayTime : 1000,
				text : 'Trying to update asset on the server',
				stay : false,
				type : 'notice'
			});
		} else if (type == 'POST') {
			jQuery.noticeAdd({
				stayTime : 1000,
				text : 'Trying to creating asset on the server',
				stay : false,
				type : 'notice'
			});
		} else if (type == 'DELETE') {
			jQuery.noticeAdd({
				stayTime : 1000,
				text : 'Trying to delete asset on the server',
				stay : false,
				type : 'notice'
			});
		}
	});

	$( document ).ajaxSuccess( function(event, xhr, settings) {
		if(settings.hideNotice)
			return;
		var type = settings.noticeType
		if (type == 'PUT') {
			jQuery.noticeAdd({
				stayTime : 1000,
				text : 'Updating asset on the server',
				stay : false,
				type : 'success'
			});
		} else if (type == 'POST') {
			jQuery.noticeAdd({
				stayTime : 1000,
				text : 'Creating asset on the server',
				stay : false,
				type : 'success'
			});
		} else if (type == 'DELETE') {
			jQuery.noticeAdd({
				stayTime : 1000,
				text : 'Deleting asset on the server',
				stay : false,
				type : 'success'
			});
		}
	});
});

/**
 * shortTheString
 * making the string shortest to a number(40 for example) @params the string and
 * the number as integer to short to it
 * @param string
 * @param numberShortTo
 * @returns {String}
 */
function shortTheString(string, numberShortTo) {
    var newString = "";
    if (!string){
        newString = "";
    } else if (string.length > numberShortTo) {
        newString = string.substring(0, numberShortTo) + "...";
    } else {
        newString = string;
    }
    return newString;
}