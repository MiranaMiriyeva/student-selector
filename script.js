
  var items = [];

  window.onload = function() {
    var savedItems = localStorage.getItem('items');
    if (savedItems) {
      items = JSON.parse(savedItems);
    }
    loadItems();
  };

  function saveItemsToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
  }

  function loadItems() {
    var itemInputs = document.getElementById("itemInputs");
    items.forEach(function(item) {
      var input = document.createElement("input");
      input.type = "text";
      input.value = item;
      itemInputs.appendChild(input);
    });
  }

  function addItems() {
    var count = parseInt(document.getElementById("itemCount").value);
    var itemInputs = document.getElementById("itemInputs");
    itemInputs.innerHTML = "";
  
    for (var i = 0; i < count; i++) {
      var input = document.createElement("input");
      input.type = "text";
      input.placeholder = "item " + (i + 1);
      itemInputs.appendChild(input);
    }
    document.getElementById("finish").style.display=  'flex';
  }

  function showRandomItems() {
    var randomCount = parseInt(document.getElementById("randomCount").value);
    var randomItemList = document.getElementById("randomItemList");

    var itemInputs = document.getElementById("itemInputs").getElementsByTagName("input");
    items = [];
    for (var i = 0; i < itemInputs.length; i++) {
      var item = itemInputs[i].value.trim();
      if (item !== "") {
        items.push(item);
      }
    }

    if (items.length === 0) {
      alert("Please fill");
      return;
    }

    if (randomCount > items.length) {
      alert("The number of items to be displayed randomly cannot exceed the number of items added.");
      return;
    }

     var randomItems = [];
    for (var i = 0; i < randomCount; i++) {
      var randomIndex = Math.floor(Math.random() * items.length);
      randomItems.push(items[randomIndex]);
      items.splice(randomIndex, 1); 
    }

    randomItemList.innerHTML = "";
    randomItems.forEach(function(item) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(item));
      randomItemList.appendChild(li);
    });
    saveItemsToLocalStorage();
  }

  function completeSelection() {
        var firstSection = document.getElementById("first-section");
        firstSection.style.display = "none";
        saveItemsToLocalStorage();
    
}
function showRandomItems() {
    var randomCount = parseInt(document.getElementById("randomCount").value);
    var randomItemList = document.getElementById("randomItemList");

    var itemInputs = document.getElementById("itemInputs").getElementsByTagName("input");
    items = [];
    for (var i = 0; i < itemInputs.length; i++) {
      var item = itemInputs[i].value.trim();
      if (item !== "") {
        items.push(item);
      }
    }

    if (items.length === 0) {
      alert("Please fill");
      return;
    }

    if (randomCount > items.length) {
      alert("The number of items to be displayed randomly cannot exceed the number of items added.");
      return;
    }

     var randomItems = [];
    for (var i = 0; i < randomCount; i++) {
      var randomIndex = Math.floor(Math.random() * items.length);
      randomItems.push(items[randomIndex]);
      items.splice(randomIndex, 1); 
    }

    randomItemList.innerHTML = "";
    randomItems.forEach(function(item) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(item));
      randomItemList.appendChild(li);
    });
    saveItemsToLocalStorage();
  }


var PARTICLE_NUM = 500;
var PARTICLE_BASE_RADIOUS = 0.5;
var FL = 500;
var DEFAULT_SPEED = 2;
var BOOST_SPEED = 300;

var canvas;
var canvasWidth, canvasHeight;
var context;
var centerX, centerY;
var mouseX, mouseY
var speed = DEFAULT_SPEED;
var targetSpeed = DEFAULT_SPEED;
var particles = [];

window.addEventListener('load', function() {
        canvas = document.getElementById('c');

        var resize = function() {
            canvasWidth = canvas.width = window.innerWidth;
            canvasHeight = canvas.height = window.innerHeight;
            centerX = canvasWidth * 0.5;
            centerY = canvasHeight * 0.5;
            context = canvas.getContext('2d');
            context.fillStyle = 'rgb(255,255,255)';
        };

        document.addEventListener('resize', resize);
        resize();

        mouseX = centerX;
        mouseY = centerY;

        for ( var i = 0, p; i < PARTICLE_NUM; i++){
            particles[i] = randomizeParticle(new Particle());
            particles[i].z -= 500 * Math.random();
        }

        document.addEventListener('mousemove',function(e){
            mouseX = e.clientX;
            mouseY = e.clientY;
        },
        false
        );

        document.addEventListener('mousedown', function(e){
            targetSpeed = BOOST_SPEED;
        },
        false
        );

        document.addEventListener('mouseup',function (d){
            targetSpeed = DEFAULT_SPEED;
        },
        false
        );

        setInterval (loop, 1000 / 60);
    },
    false
)


function loop () {
    context.save();
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();

    speed += (targetSpeed - speed) * 0.01;

    var p;
    var cx, cy;
    var rx, ry;
    var f, x, y, r;
    var pf, px, py, pr;
    var a, a1, a2;

    var halfPi = Math.PI * 0.5;
    var atan2 = Math.atan2;
    var cos = Math.cos;
    var sin = Math.sin;

    context.beginPath();
    for( var i = 0; i < PARTICLE_NUM; i++) {
        p = particles [i];

        p.pastZ = p.z;
        p.z -= speed;

        if(p.z <= 0) {
            randomizeParticle(p);
            continue;
        }

        cx = centerX - (mouseX - centerX) * 1.25;
        cy = centerY - (mouseY - centerY) * 1.25;

        rx = p.x - cx;
        ry = p.y - cy;

        f = FL / p.z;
        x = cx + rx * f;
        y = cy + ry * f;
        r = PARTICLE_BASE_RADIOUS * f;

        pf = FL / p.pastZ;
        px = cx + rx * pf;
        py = cy + ry * pf;
        pr = PARTICLE_BASE_RADIOUS * pf;

        a = atan2 (py - y, px - x);
        a1 = a + halfPi;
        a2 = a - halfPi;

        context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
        context.arc(px, py, pr, a1, a2, true);
        context.lineTo(x + r * cos(a2), y + r * sin(a2));
        context.arc(x, y, r, a1, a2, true);
        context.closePath();
    }
    context.fill();
}

function randomizeParticle(p){
    p.x = Math.random() * canvas.width;
    p.y = Math.random() * canvas.height;
    p.z = Math.random() * 1500 + 500;
    return p;
}


function Particle (x, y, z){
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.pastZ = 0;
}
