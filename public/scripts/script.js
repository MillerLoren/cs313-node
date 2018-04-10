$(window).on('resize', toggle);
$(window).on('load', toggle);
$(window).on('load', toggleWeight);
$(".add").on('click',function() {
	addContact();
});
$('.save').on('click',function(){
	saveContacts();
});
$('#calcForm').change(function(){
	toggleWeight();
})
function toggleWeight(){
	if(document.getElementById("calcFormSelect")){
		var select = document.getElementById("calcFormSelect").value;
		if(select == 'post'){
			document.getElementById("weightRow").style.display = "none";
		}else{
			document.getElementById("weightRow").style.display = "table-row";
		}
	}
}
function editContact(btn){
	var tr = $(btn).closest('tr');
	var content = new Array(6);
	tr.children('td').each(function(i){
		if(i != 0){
			content[i-1] = $(this).text();
		}
		switch(i){
			case 2:
				this.innerHTML = '<input type="text" name="name[]" value="'+this.innerHTML+'"/>';
			break;
			case 3:
				this.innerHTML = '<input type="text" name="company[]" value="'+this.innerHTML+'"/>';
			break;
			case 4:
				this.innerHTML = '<input type="text" name="title[]" value="'+this.innerHTML+'"/>';
			break;
			case 5:
				this.innerHTML = '<input type="text" name="phone[]" value="'+this.innerHTML+'"/>';
			break;
			case 6:
				this.innerHTML = '<input type="text" name="email[]" value="'+this.innerHTML+'"/><input type="hidden" value="'+content+'"/>';
			break;
			case 0:
				this.innerHTML = '<input type="hidden" name="new[]" value="false"/><input type="hidden" name="delete[]" value="false"/><input type="hidden" name="update[]" value="true"/><button type="button" class="btn btn-default btn-sm" onClick="cancelUpdate(this)"><span class="glyphicon glyphicon-remove"></span></button>';
			break;
			case 1:
				this.innerHTML = this.innerHTML;
			break;
		}
	});
}
function cancelUpdate(btn){
	var tr = $(btn).closest('tr');
	var content = tr.children('td').last().find('input[type="hidden"]').val().split(',');
	tr.children('td').each(function(i){
		if(i!=0){
			this.innerHTML = content[i-1];
		}else{
			this.innerHTML = '<input type="hidden" name="new[]" value="false"/><input type="hidden" name="delete[]" value="false"/><input type="hidden" name="update[]" value="false"/><button type="button" class="btn btn-default btn-sm" onClick="deleteContact(this)"><span class="glyphicon glyphicon-trash"></span></button><button type="button" class="btn btn-default btn-sm edit" onClick="editContact(this)"><span class="glyphicon glyphicon-edit"></span></button>';
		}
	});
}
function addContact(){
	var num = 0;
	if($('#contactsTable tr').last().find('td:nth-child(2)').find('input').val()){
		$('#contactsTable tr').each(function(){
			if(Number($(this).find('td:nth-child(2)').find('input').val()) > num){
				num = Number($(this).find('td:nth-child(2)').find('input').val());
			}
		});
		num += 1;
	}else{
		num = 1;
	}
	console.log(num);
	var tr = $('<tr>').html(
		'<td><input type="hidden" name="new[]" value="true"/><input type="hidden" name="delete[]" value="false"/><input type="hidden" name="update[]" value="false"/><button type="button" class="btn btn-default btn-sm" onClick="deleteNewContact(this)"><span class="glyphicon glyphicon-trash"></span></button></td>'
		+'<td><input type="hidden" name="index[]" value="'+num+'"/>'+$('#contactsTable tr').length+'</td>'
		+'<td><input type="text" name="name[]" value="" placeholder="Name"/></td>'
		+'<td><input type="text" name="company[]" value=""placeholder="Company"/></td>'
		+'<td><input type="text" name="title[]" value=""placeholder="Title"/></td>'
		+'<td><input type="text" name="phone[]" value=""placeholder="Phone"/></td>'
		+'<td><input type="text" name="email[]" value=""placeholder="Email"/></td>').hide();
	$('#contactsTable > tbody:last-child').append(tr);
	tr.fadeIn(200);
}
function deleteContact(btn){
	$(btn).closest('tr').children('td').first().html('<input type="hidden" name="new[]" value="false"/><input type="hidden" name="delete[]" value="true"/><input type="hidden" name="update[]" value="false"/><button type="button" class="btn btn-default btn-sm" onClick="undeleteContact(this)"><span class="glyphicon glyphicon-trash"></span></button><button type="button" class="btn btn-default btn-sm edit" onClick="" disabled><span class="glyphicon glyphicon-edit"></span></button>');
	$(btn).closest('tr').children('td').css('text-decoration','line-through');
}
function undeleteContact(btn){
	$(btn).closest('tr').children('td').first().html('<input type="hidden" name="new[]" value="false"/><input type="hidden" name="delete[]" value="false"/><input type="hidden" name="update[]" value="false"/><button type="button" class="btn btn-default btn-sm" onClick="deleteContact(this)"><span class="glyphicon glyphicon-trash"></span></button><button type="button" class="btn btn-default btn-sm edit" onClick="editContact(this)"><span class="glyphicon glyphicon-edit"></span></button>');
	$(btn).closest('tr').children('td').css('text-decoration','none');
}
function deleteNewContact(btn){
	$(btn).closest('tr').remove();
	$('#contactsTable tr').each(function(i){
		if(i!=0){
			$(this).children('td')[1].innerHTML = i;
		}
	});
}
function toggle(){
	var win = $(this); //this = window
	var ul = document.getElementById("menu");
	var btn = document.getElementById("dropBtn");
	if (win.width() <= 700) {
	  $(ul).removeClass('show');
	  $(ul).addClass('hide');
	  $(btn).removeClass('hide');
	  $(btn).addClass('show');
	}
	if (win.width() >= 701) {
	  $(ul).removeClass('hide');
	  $(ul).addClass('show');
	  $(btn).removeClass('show');
	  $(btn).addClass('hide');
	}
	add = $('#modifyBtns');
	add.css("left", ((($(window).width()/2) + ($('#content').width() / 2))-150));
}
function menu(){
	var ul = document.getElementById("menu");
	if($(ul).hasClass('hide') == true){
		$(ul).removeClass('hide');
		$(ul).addClass('show');
	}else{
		$(ul).removeClass('show');
		$(ul).addClass('hide');
	}
}
function loadContacts(c){
	if($('#contactsTable tr').length > 1){
		$('#contactsTable tr').each(function(i){
			if(i != 0){
				$(this).remove();
			}
		});
	}
	for(var i = 0; i < c.length; i++){
		console.log("Added row #", i);
		var tr = $('<tr>').html(
			'<td><input type="hidden" name="new[]" value="false"/><input type="hidden" name="delete[]" value="false"/><input type="hidden" name="update[]" value="false"/><button type="button" class="btn btn-default btn-sm" onClick="deleteContact(this)"><span class="glyphicon glyphicon-trash"></span></button><button type="button" class="btn btn-default btn-sm edit" onClick="editContact(this)"><span class="glyphicon glyphicon-edit"></span></button></td>'
			+'<td><input type="hidden" name"index[] value="'+c[i].index+'">'+(i+1)+'</td>'
			+'<td>'+c[i].name+'</td>'
			+'<td>'+c[i].company+'</td>'
			+'<td>'+c[i].title+'</td>'
			+'<td>'+c[i].phone+'</td>'
			+'<td>'+c[i].email+'</td>').hide();
		$('#contactsTable > tbody:last-child').append(tr);
		showRows(tr, i);
	}
	$('#result').html("")
}
function showRows(tr, i){
    setTimeout(function(){
        tr.fadeIn(200);
    }, 200 * i);
}
function saveContacts(){
	$('#contactsTable tr').each(function(i){
		if(i!=0){
			var index, name, company, title, phone, email;
			var data = {};
			if($(this).find('input[name="delete[]"]').val() == "true"){
				index = $(this).find('td:nth-child(2)').find('input').val();
				data['user'] = localStorage.getItem("session_id");
				data['index'] = index;
				postDelete(data);
			}else if($(this).find('input[name="new[]"]').val() == "true"){
				index = $(this).find('td:nth-child(2)').find('input').val();
				name = $(this).find('td:nth-child(3)').find('input').val();
				company = $(this).find('td:nth-child(4)').find('input').val();
				title = $(this).find('td:nth-child(5)').find('input').val();
				phone = $(this).find('td:nth-child(6)').find('input').val();
				email = $(this).find('td:nth-child(7)').find('input').val();
				data['user'] = localStorage.getItem("session_id");
				data['index'] = index;
				data['name'] = name;
				data['company'] = company;
				data['title'] = title;
				data['phone'] = phone;
				data['email'] = email;
				postNew(data);
			}else if($(this).find('input[name="update[]"]').val() == "true"){
				index = $(this).find('td:nth-child(2)').find('input').val();
				name = $(this).find('td:nth-child(3)').find('input').val();
				company = $(this).find('td:nth-child(4)').find('input').val();
				title = $(this).find('td:nth-child(5)').find('input').val();
				phone = $(this).find('td:nth-child(6)').find('input').val();
				email = $(this).find('td:nth-child(7)').find('input').val();
				data['user'] = localStorage.getItem("session_id");
				data['index'] = index;
				data['name'] = name;
				data['company'] = company;
				data['title'] = title;
				data['phone'] = phone;
				data['email'] = email;
				postUpdate(data);
			}
		}
	});
	setTimeout(function(){
		$.ajax({
			type: "POST",
			url: '/getContacts',
			data: {
			user : localStorage.getItem("session_id")
			},
			success: function(msg){
				console.log(msg);
				loadContacts(msg.results);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log("Error" + errorThrown);
			}
		});
	}, 500);
}
function updateIndex(x){
}
function postDelete(item){
	var bool = 0;
	console.log('Deleting');
	$.ajax({
		type: "POST",
		url: '/deleteContact',
		data: item,
		success: function(msg){
			console.log(msg);
			bool = 1;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log("Error" + errorThrown);
			bool = 0;
		}
	});
	console.log(bool);
	return bool;
}
function postNew(item){
	var bool = 0;
	console.log('Adding');
	$.ajax({
		type: "POST",
		url: '/newContact',
		data: item,
		success: function(msg){
			console.log(msg);
			bool = 1;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log("Error" + errorThrown);
			bool = 0;
		}
	});
	return bool;
}
function postUpdate(item){
	var bool = 0;
	console.log('Updating');
	$.ajax({
		type: "POST",
		url: '/updateContact',
		data: item,
		success: function(msg){
			console.log(msg);
			bool = 1;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log("Error" + errorThrown);
			bool = 0;
		}
	});
	return bool;
}