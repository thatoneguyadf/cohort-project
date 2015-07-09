var h1 = document.getElementById('myHdr');

h1.setAttribute("rel", "adam");

console.log(h1);

setTimeout(function () {
    h1.removeAttribute('rel');
}, 5000);

var a = document.createElement('a');
a.textContent = 'I\'m a link to google';
a.setAttribute('href', 'http://www.google.com');
a.setAttribute('target', '_blank');

document.body.appendChild(a);

setTimeout(function () {
    document.body.removeChild(a);
}, 5000);

var anchors = document.querySelectorAll("ul li a");
console.log(anchors);
console.log(anchors.length);

for (var i = 0; i < anchors.length; i++) {
    var anchor = anchors.item(i);
    console.log(anchor.href);
}

h1.style.backgroundColor = 'red';
setTimeout(function () {
    h1.style.color = 'white';
}, 5000);

function e(elementType, text, atributes, styles, selector) {
    var element = document.createElement(elementType);
    element.textContent = text;

    for(var attr in atributes) {
        if(atributes.hasOwnProperty(attr)) {
            element.setAttribute(attr, atributes[attr]);
        }
    }

    for(var style in styles) {
        if(styles.hasOwnProperty(style)) {
            element.style[style] = styles[style];
        }
    }

    var container = document.querySelector(selector);
    if(container) {
        container.appendChild(element);
    }

    return element;
}

var anchor = e('a', 'link to google', {href: 'http://www.google.com', id: 'google.com', target: '_blank'}, {color: 'red'});

document.body.appendChild(anchor);