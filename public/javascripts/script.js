$(function () {
  const msgIcon = $('.con-msg .msg .icon');

  msgIcon.on('click', function () {
    $(this).parent().parent().fadeOut(400);
  });
});
