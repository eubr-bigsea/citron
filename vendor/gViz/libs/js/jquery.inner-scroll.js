$.fn.innerScroll = function(options) {
  var defaultOptions 
    , paddingHeight = 1;

  // setup options
  defaultOptions = {
    paddingClass: "inner-scroll-padding"
  };
  options = options || {};
  options = $.extend(defaultOptions, options);

  // create and append padding element
  $(this).prepend(createPaddingElement());
  $(this).append(createPaddingElement());

  $(this).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function(e) {
    if ( isReachedTop( $(this) ) ) {
      $(this).scrollTop( $(this).scrollTop() + paddingHeight );
    }

    if ( isReachedBottom( $(this) ) ) {
      $(this).scrollTop( $(this).scrollTop() - paddingHeight );
      return false;
    }  
  });

  function createPaddingElement () {
    return $("<div></div>")
      .addClass(options.paddingClass)
      .css("height", paddingHeight);
  }

  function isReachedTop ($element) {
    return $element.scrollTop() == 0;
  }

  function isReachedBottom ($element) {
    var totalHeight = totalChildrenHeight($element);
    return  $element.scrollTop() + $element.height() >= totalHeight;
  }

  function totalChildrenHeight ($element) {
    var totalHeight = 0;
    $element.children().each(function() {
      // not caculating paddingClass height, as a buffer for locking criteria
      if ( ! $(this).hasClass(options.paddingClass) ) {
        totalHeight += $(this).outerHeight();
      }
    });
    return totalHeight;
  }
};
