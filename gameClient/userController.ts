function addUser() {
	var nameInput = 
		<HTMLInputElement>document.getElementById("user-name");
	var name = nameInput.value;
	var user = {"name": name};
	var userContent = JSON.stringify(user);
	$.ajax({
		type: "POST",
		url: "/users",
		data: userContent,
		contentType: "application/json; charset=utf-8",
		dataType: "text",
		success: function() { loadUsers(); }
	}).fail(function() {
		  alert( "Failed to add!" );
		});
}

function loadUsers() {
	$.ajax({
    	type: "GET",
    	url: "/users",
    	contentType: "application/json; charset=utf-8",
    	dataType: "json",
    	success: function(data) { onUsersRetrieved(data); }
    });
}

function onUsersRetrieved(users) {
	var list = document.getElementById("user-list");
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
	users.forEach(function(user) { appendUser(list, user); });
}

function appendUser(list : HTMLElement, user : Object) {
	var li = document.createElement("li");
    li.innerText = user["name"];
    list.appendChild(li);
}