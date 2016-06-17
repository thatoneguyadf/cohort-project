(function () {
  // creates new elements
  function e(elementType, text, atributes, styles, selector) {
    var element = document.createElement(elementType);
    element.textContent = text || '';
    for(var attr in atributes) {
      if(atributes.hasOwnProperty(attr))
        element.setAttribute(attr, atributes[attr]);
    }
    for(var style in styles) {
      if(styles.hasOwnProperty(style))
        element.style[style] = styles[style];
    }
    var container = typeof(selector) === 'string' ? document.querySelector(selector) : selector;
    if(container)
      container.appendChild(element);
    return element;
  }
  // generates a random number based on max number passed in
  function randomNum(max) {
    return Math.ceil(Math.random() * max);
  }
  window.e = e;
  window.randomNum = randomNum;
}());