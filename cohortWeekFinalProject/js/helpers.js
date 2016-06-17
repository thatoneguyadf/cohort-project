(function () {
  // creates new elements
  function e(elementType, text, atributes, styles, selector) {
    var $element = $('<' + elementType + '></' + elementType +'>');
    $element.text(text);
    for(var attr in atributes) {
      if(atributes.hasOwnProperty(attr))
        $element.attr(attr, atributes[attr]);
    }
    for(var style in styles) {
      if(styles.hasOwnProperty(style))
        $element.css(styles);
    }
    var $container = typeof(selector) === 'string' ? $(selector) : selector;
    if($container)
      $container.append($element);
    return $element;
  }
  // generates a random number based on max number passed in
  function randomNum(max) {
    return Math.ceil(Math.random() * max);
  }
  window.e = e;
  window.randomNum = randomNum;
}());