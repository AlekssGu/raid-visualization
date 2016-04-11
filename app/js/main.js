$(document).ready(function() {
  $('.slider').slick({
    centerMode: true,
    centerPadding: '60px',
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  });

  function change_image_source(mode,level) {
    var image = $('#raid-gif');
    var src;

    if(mode !== 'WRITE' && mode !== 'READ' && mode !== 'RECOVER') {
      return;
    }

    src = 'images/' + level + '_' + mode + '.gif';
    image.attr('src',src);
    image.removeClass('hidden');
  };

  $('.item a').click(function(e){
    var mode = $(this).text();
    var level = $(this).attr('level').toUpperCase();

    if(mode.trim() && level.trim()) {
      change_image_source(mode,level);
    }

    e.preventDefault();
  });
});
