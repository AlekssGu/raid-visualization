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
    var mode = $(this).text().trim();
    var level = $(this).attr('level').toUpperCase().trim();
    var shortDesc;

    if(mode && level && mode !== 'CALCULATE') {
      change_image_source(mode,level);
    } else if (mode == 'CALCULATE') {
      $('#calcModal .level').text(level);

      switch (level)
      {
         case 'RAID0': shortDesc = 'Speed over capacity'
         break;

         case 'RAID1': shortDesc = 'Redundancy over performance and capacity'
         break;

         case 'RAID5': shortDesc = 'Sacrifices some performance and capacity to provide redundancy'
         break;

         case 'RAID6': shortDesc = 'Same compromises as RAID5 but favours redundancy more and has less capacity compared to RAID5'
         break;

         default: ''
      }

      $('#calcModal .shortDesc').text(shortDesc);
    }

    e.preventDefault();
  });

  $('#calcModal').on('shown.bs.modal', function () {
    $('#diskQuantity').focus()
  })

  $('#calcModal').on('hidden.bs.modal', function () {
    level = $('#calcModal .level');
    quantityText = $('#calcModal .quantityText');
    sizeText = $('#calcModal .sizeText');
    redundancy = $('.results .redundancy');
    capacity = $('.results .capacity');

    $('#calcModal input').val('');

    level.text('');
    quantityText.text('');
    sizeText.text('');
    redundancy.text('');
    capacity.text('');
  })

  $('#diskQuantity, #diskSize').on('input', function() {
    n = parseInt($('#diskQuantity').val()) || 0;
    s = parseInt($('#diskSize').val()) || 0;
    level = $('#calcModal .level').text();
    quantityText = $('#calcModal .quantityText');
    sizeText = $('#calcModal .sizeText');
    redundancy = $('.results .redundancy');
    capacity = $('.results .capacity');

    if(level == 'RAID0') {
      if(n < 2) {
        quantityText.text(level + ' requires minimum 2 disks');
        redundancy.text('');
        capacity.text('');
      }
      else if(n>=2) {
        quantityText.text('');
        redundancy.text('None');
        capacity.text('Full capacity (' + n * s + ')');
      }

    } else if (level == 'RAID1') {
      if(n < 2) quantityText.text(level + ' requires minimum 2 disks');
      else if(n >= 2) quantityText.text('');
      redundancy.text(n-1);
      capacity.text(s)

    } else if (level == 'RAID5') {
      if(n < 3) quantityText.text(level + ' requires minimum 3 disks');
      else if(n >= 3) quantityText.text('');
      redundancy.text(1);
      capacity.text((n-1)*s);

    } else if (level == 'RAID6') {
      if(n < 4) quantityText.text(level + ' requires minimum 4 disks');
      else if(n >= 4) quantityText.text('');
      redundancy.text(2);
      capacity.text((n-2)*s);
    }
  });

  $('.slick-arrow').click(function() {
    $('.item a').removeClass('btn-primary');
  });
});
