$(window).on('resize', toggle);
$(window).on('load', toggle);
$(window).on('load', toggleWeight);
$(".edit").on('click',function() {
	editContact(this.closest( "tr" ));
});
$(".add").on('click',function() {
	addContact();
});
$(".trash").on('click',function() {
	deleteContact(this.closest( "tr" ));
});
$('#calcForm').change(function(){
	toggleWeight();
})
function toggleWeight(){
	var select = document.getElementById("calcFormSelect").value;
	if(select == 'post'){
		document.getElementById("weightRow").style.display = "none";
	}else{
		document.getElementById("weightRow").style.display = "table-row";
	}
}
var arr = [];
var cartCount = 0;
function editContact(tr){
	var max = tr.childNodes.length;
	for(var i = 0; i < max; i++){
		var text = tr.childNodes[i].innerText || tr.childNodes[i].textContent;
		var td = $("<td></td>");
		switch(i){
			case 0:
				var input = text;
			break;
			case 1:
				var input = "<input name='num' type='hidden' value='" + tr.childNodes[1].childNodes[0].value + "'/><input name='name' type='text' value='" + text + "'/>";
			break;
			case 2:
				var input = "<input name='email' type='text' value='" + text + "'/>";
			break;
			case 3:
				var input = "<input name='phone' type='text' value='" + text + "'/>";
			break;
			case 4:
				var input = "<input name='company' type='text' value='" + text + "'/>";
			break;
			case 5:
				var input = "<input name='title' type='text' value='" + text + "'/>";
			break;
			case 6:
				var input = "<input type='submit' class='check' name='update' />/<img class='cancel' onclick='cancelEdit()' src='../../Images/cancel.png' />"
			break;
		}
		tr.childNodes[i].innerHTML = input;
		$(".edit").remove();
		$(".trash").remove();
		$(".add").remove();
	}
}
function cancelEdit(){
	location.reload();
}
function addContact(){
	var table = $("#contactsTable tr:last");
	var num = $("#contactsTable tr").length;
	var tr = "<tr><td>" + num + "</td><td><input name='name' type='text' value=''></td><td><input name='email' type='text' value=''></td><td><input name='phone' type='text' value=''></td><td><input name='company' type='text' value=''></td><td><input name='title' type='text' value=''></td><td><input type='submit' class='check' name='add' src='../../Images/check.png'>/<img class='cancel' onclick='cancelEdit()' src='../../Images/cancel.png'></td></tr>";
	table.after(tr);
	$(".edit").remove();
	$(".trash").remove();
	$(".add").remove();
}
function deleteContact(tr){
	tr.childNodes[0].innerHTML = "<input name='num' type='hidden' value='" + tr.childNodes[1].childNodes[0].value + "'/>" + tr.childNodes[0].innerHTML;

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
function addToCart(item){
	console.log("Item Number", item);
	var div = document.getElementById(item);
	var hidden = document.getElementById("viewCart");
	var hidden1 = document.getElementById("viewCart1");
	var hidden2 = document.getElementById("viewCart2");
	var hidden3 = document.getElementById("viewCart3");
	var quantity = document.getElementsByClassName("quantity")[item - 1].value;
	console.log("Quantity", quantity);
	if(quantity > 0 && quantity != "" && quantity != 0){
		console.log("Switch", item);
		switch(item){
			case 1:
				var tempArr = {Game:"Ark: Survival Evolved", Price:"$39.99", Quantity:quantity};
				arr[0] = tempArr;
				hidden1.value = "";
				hidden1.value = JSON.stringify(arr);
				break;
			case 2:
				var tempArr = {Game:"Overwatch", Price:"$59.99", Quantity:quantity};
				arr[1] = tempArr;
				hidden2.value = "";
				hidden2.value = JSON.stringify(arr);
				break;
			case 3:
				var tempArr = {Game:"RocketLeague", Price:"$29.99", Quantity:quantity};
				arr[2] = tempArr;
				hidden3.value = "";
				hidden3.value = JSON.stringify(arr);
				break;
		}
	}
	hidden.value = "";
	hidden.value = JSON.stringify(arr);
}