/* Matrix that gives the side which is displayed currently according to xAngle
*  and yAngle
*         x
*           -270     -180     -90       0       90        180      270
*    -270("bottom", "right" , "top" , "left" , "bottom", "right" , "top"  )
*    -180("bottom", "front" , "top" , "back" , "bottom", "front" , "top"  )
*     -90("bottom", "left"  , "top" , "right", "bottom", "left"  , "top"  )
*       0("bottom", "back"  , "top" , "front", "bottom", "back"  , "top"  )
*      90("bottom", "right" , "top" , "left" , "bottom", "right" , "top"  )
*   y 180("bottom", "front" , "top" , "back" , "bottom", "front" , "top"  )
*     270("bottom", "left"  , "top" , "right", "bottom", "left"  , "top"  )

*/
var anglesToFacesTab = [
["bottom", "right" , "top" , "left" , "bottom", "right" , "top"],
["bottom", "front" , "top" , "back" , "bottom", "front" , "top"],
["bottom", "left"  , "top" , "right", "bottom", "left"  , "top"],
["bottom", "back"  , "top" , "front", "bottom", "back"  , "top"],
["bottom", "right" , "top" , "left" , "bottom", "right" , "top"],
["bottom", "front" , "top" , "back" , "bottom", "front" , "top"],
["bottom", "left"  , "top" , "right", "bottom", "left"  , "top"] ];
anglesToFacesTab.lenght = 7;

var xAngle = 0, yAngle = 0;

/* Function that returns the face currently displayed on the screen according
to xAngle and yAngle */
function anglesToFace(xAngle, yAngle) {
  xAngle = xAngle % 360;
  yAngle = yAngle % 360;
  return anglesToFacesTab[yAngle / 90 + 3][xAngle / 90 + 3];
}
/* Function that starts the demonstration related to the face currently
displayed */
function startDemo() {
  var face = anglesToFace(xAngle, yAngle);
  var destination = face + ".html";
  document.location.href = destination;
}

/* Creating properties from the polygone class */
var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
    prop,
    el = document.createElement('div');

for(var i = 0, l = props.length; i < l; i++) {
    if(typeof el.style[props[i]] !== "undefined") {
        prop = props[i];
        break;
    }
}

/* Listening to arrow keys inputs*/
$('body').keydown(function(evt) {
    switch(evt.keyCode) {
        case 37: // left
            yAngle -= 90;
            break;

        case 38: // up
            xAngle += 90;
            evt.preventDefault();
            break;

        case 39: // right
            yAngle += 90;
            break;

        case 40: // down
            xAngle -= 90;
            evt.preventDefault();
            break;
    };
    document.getElementById('polygone').style[prop] = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
});
