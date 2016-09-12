$(function() {
  animate({
    name: 'flipInY',
    selector: '.error-card > .error-title-block'
  });

  setTimeout(function(){
    var $el = $('.error-card > .error-container');

    animate({
      name: 'fadeInUp',
      selector: $el
    });

    $el.addClass('visible');
  }, 1000);
})
/***********************************************
*        Animation Settings
***********************************************/
function animate(options) {
  var animationName = "animated " + options.name;
  var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
  $(options.selector)
  .addClass(animationName)
  .one(animationEnd,
    function(){
      $(this).removeClass(animationName);
    }
  );
}

$(function() {
  var $itemActions = $(".item-actions-dropdown");

  $(document).on('click',function(e) {
    if (!$(e.target).closest('.item-actions-dropdown').length) {
      $itemActions.removeClass('active');
    }
  });

  $('.item-actions-toggle-btn').on('click',function(e){
    e.preventDefault();

    var $thisActionList = $(this).closest('.item-actions-dropdown');

    $itemActions.not($thisActionList).removeClass('active');

    $thisActionList.toggleClass('active');
  });
});

$(function() {
  $('.actions-list > li').on('click', '.check', function(e){
    e.preventDefault();

    $(this).parents('.tasks-item')
    .find('.checkbox')
    .prop("checked",  true);

    removeActionList();
  });
});
