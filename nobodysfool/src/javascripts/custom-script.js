

jQuery(document).ready(function(){
	$('#topbar-collapse').click(function(){
		$('#topbar').slideToggle();
		$(this).toggleClass('active');  
	})    
}) 