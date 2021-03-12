$(document).ready(function() {
	// item deletion
	$('.delete-form').click(function(event) {
        event.preventDefault();
        
		let id = $(this).data("id");

		$.ajax({
			type: "DELETE",
			url: "/delete/" + id,
			data: { "id" : id },
			success: function () {
				alert('Удалено ' + id);
				$("#clothes_"+ id).hide();
			},
			error: function (msg) {
				alert('Ошибка во время удаления: ' + msg.responseJSON.message);
			}
		});
	});

	// clothes info preview
	$('.preview').click(function(event) {
        event.preventDefault();
        
		let id = $(this).data("id");

		$.ajax({
			type: "GET",
			url: "/info/" + id,
			success: function (res) {
				$("#name").text(res.name);
				$("#color").text(res.color);
				$("#category").text(res.category);
				$("#price").text(res.price);
				$("#sizes").text(res.sizes);
				$("#description").text(res.description);
			},
			error: function (msg) {
				alert('Ошибка: ' + msg.responseJSON.message);
			}
		});
	});

	// clothes creation
	$('.create-form').submit(function(event) {
		event.preventDefault();
		
		$.ajax({
			type: "POST",
			url: "/create",
			data: new FormData(this),
			contentType: false,
			processData: false,
			success: function () {
				alert('Одежда успешно добавлена в каталог!');
			},
			error: function (msg) {
				alert('Ошибка во время добавления: ' + msg.responseJSON.message);
			}
		});
	})

});