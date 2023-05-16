$(document).ready(function() {
  $('.dropdown-card').hover(
    function() {
      $(this).addClass('show');
    },
    function() {
      $(this).removeClass('show');
    }
  );
});
