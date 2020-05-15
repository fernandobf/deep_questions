$( document ).ready(function() {

	var itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
	
	localStorage.setItem('items', JSON.stringify(itemsArray));

	$.getJSON('data.json', function(data) {
		var i = 1;
		$.each(data.reverse(), function (key, item) {
			var value = i++;
			$('ul').prepend('<li class="flip-container item" ontouchstart="this.classList.toggle("hover");" id="'+ value +'"><div class="flipper"><div class="front"><span>'+ value +'</span><img src="https://conexaotalento.com.br/cac/wp-content/uploads/2019/04/logo2.png"></div><div class="back"><p>"' + item.pergunta + '"</p></div></div></li>');
		});

		$( "li" ).each(function(index) {
			$(this).on("click", function(){
				var value = $(this).attr('id');
				itemsArray.push(value);
				localStorage.setItem('items', JSON.stringify(itemsArray));
				$(this).addClass('open');
				if ($(this).hasClass("open")) {
					$(this).removeClass('open');
					$(this).addClass('not');
				}else{
					$(this).removeClass('not');
					$(this).addClass('open');
				}
			});
		});

		$('.clear').on("click", function(e){
			confirm("Tem certeza que gostaria de reiniciar a ação?");
			e.preventDefault();
			localStorage.clear();
			itemsArray = [];
			location.reload(true);
		});

		for(var i = 0; i < itemsArray.length; i++){
			var item = itemsArray[i];
			
			$("li").each(function(index) {
				var id	= $(this).attr('id');

				if(id == itemsArray[i]){
					$(this).addClass("not");
				}
			});
		}
	});

    var maxWidth = $('body').width();
    var duration = 60000;
    var $log = $('#log');
    var $start = $('#start');
    var $stop = $('#stop');
    var timer;

    $start.on('click', function() {
        var $bar = $('#bar');
        Horloge(maxWidth);
        timer = setInterval('Horloge('+maxWidth+')', 100);

        $bar.animate({
            width: maxWidth
        }, duration, function() {
            $(this).css('background-color', 'green');
            $start.attr('disabled', true);
            $stop.attr('disabled', true);
            $log.html('100 %');
            clearInterval(timer);
        });
    });

    $stop.on('click', function() {
        var $bar = $('#bar');
        $bar.stop();

        clearInterval(timer);

        var w = $bar.width();
        var percent = parseInt((w * 100) / maxWidth);
        $log.html(percent + ' %');
    });





});

$(document).on("click", ".flip-container", function () {
	$(this).toggleClass('hover');
});

function Horloge(maxWidth) {
    var w = $('#bar').width();
    var percent = parseInt((w * 100) / maxWidth);
    //$('#log').html(percent + ' %');
}