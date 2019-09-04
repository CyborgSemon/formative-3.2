console.log('JS has loaded');
$('.card').click(()=> {
	if ($('.card').hasClass('active')) {
		$('.card').removeClass('active');
	} else {
		$('.card').addClass('active');
	}
});