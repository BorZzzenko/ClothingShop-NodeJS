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

});