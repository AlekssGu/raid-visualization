$(document).ready(function() {

  function change_image_source(mode,level) {
    var image = $('#raid-gif');
    var src;
    var activeButton;

    if(mode !== 'WRITE' && mode !== 'READ' && mode !== 'RECOVER') {
      return;
    }

    activeButton = $('.item a[level="' + level.toLowerCase() + '"]:contains("' + mode + '")');
    activeButton.addClass('btn-primary');
    activeButton.siblings().removeClass('btn-primary');

    src = 'images/' + level + '_' + mode + '.gif';
    image.attr('src',src);
    image.removeClass('hidden');
  };

  $('.slider').slick({
    centerMode: false,
    centerPadding: '60px',
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  });

  $('.item a').click(function(e){
    var mode = $(this).text();
    var level = $(this).attr('level').toUpperCase();

    if(mode.trim() && level.trim()) {
      change_image_source(mode,level);
    }

    e.preventDefault();
  });

  $('.slick-arrow').click(function() {
    $('.item a').removeClass('btn-primary');
  });
});
