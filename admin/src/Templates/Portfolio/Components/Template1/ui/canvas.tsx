// @ts-expect-error: init method is not defined in the interface
function n(e) {
  // @ts-expect-error: init method is not defined in the interface
  this.init(e || {});
}
n.prototype = {
  // @ts-expect-error: init method is not defined in the interface
  init: function (e) {
    this.phase = e.phase || 0;
    this.offset = e.offset || 0;
    this.frequency = e.frequency || 0.001;
    this.amplitude = e.amplitude || 1;
  },
  update: function () {
    return (
      (this.phase += this.frequency),
      (e = this.offset + Math.sin(this.phase) * this.amplitude)
    );
  },
  value: function () {
    return e;
  },
};

// @ts-expect-error: init method is not defined in the interface

function Line(e) {
  // @ts-expect-error: init method is not defined in the interface
  this.init(e || {});
}

Line.prototype = {
  // @ts-expect-error: init method is not defined in the interface
  init: function (e) {
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (var t, n = 0; n < E.size; n++) {
      t = new Node();
      // @ts-expect-error: init method is not defined in the interface
      t.x = pos.x;
      // @ts-expect-error: init method is not defined in the interface
      t.y = pos.y;
      // @ts-expect-error: init method is not defined in the interface
      this.nodes.push(t);
    }
  },
  update: function () {
    // @ts-expect-error: init method is not defined in the interface
    let e = this.spring,
      // @ts-expect-error: init method is not defined in the interface
      t = this.nodes[0];
    // @ts-expect-error: init method is not defined in the interface
    t.vx += (pos.x - t.x) * e;
    // @ts-expect-error: init method is not defined in the interface
    t.vy += (pos.y - t.y) * e;
    // @ts-expect-error: init method is not defined in the interface
    for (var n, i = 0, a = this.nodes.length; i < a; i++)
      // @ts-expect-error: init method is not defined in the interface
      (t = this.nodes[i]),
        0 < i &&
        // @ts-expect-error: init method is not defined in the interface
        ((n = this.nodes[i - 1]),
          (t.vx += (n.x - t.x) * e),
          (t.vy += (n.y - t.y) * e),
          (t.vx += n.vx * E.dampening),
          (t.vy += n.vy * E.dampening)),
        // @ts-expect-error: init method is not defined in the interface
        (t.vx *= this.friction),
        // @ts-expect-error: init method is not defined in the interface
        (t.vy *= this.friction),
        (t.x += t.vx),
        (t.y += t.vy),
        (e *= E.tension);
  },
  draw: function () {
    let e,
      t,
      // @ts-expect-error: init method is not defined in the interface
      n = this.nodes[0].x,
      // @ts-expect-error: init method is not defined in the interface
      i = this.nodes[0].y;
    // @ts-expect-error: init method is not defined in the interface
    ctx.beginPath();
    // @ts-expect-error: init method is not defined in the interface
    ctx.moveTo(n, i);
    // @ts-expect-error: init method is not defined in the interface
    for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
      // @ts-expect-error: init method is not defined in the interface
      e = this.nodes[a];
      // @ts-expect-error: init method is not defined in the interface
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      // @ts-expect-error: init method is not defined in the interface
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    // @ts-expect-error: init method is not defined in the interface
    e = this.nodes[a];
    // @ts-expect-error: init method is not defined in the interface
    t = this.nodes[a + 1];
    // @ts-expect-error: init method is not defined in the interface
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    // @ts-expect-error: init method is not defined in the interface
    ctx.stroke();
    // @ts-expect-error: init method is not defined in the interface
    ctx.closePath();
  },
};

// @ts-ignore
function onMousemove(e) {
  function o() {
    lines = [];
    for (let e = 0; e < E.trails; e++)
      lines.push(new Line({ spring: 0.2 + (e / E.trails) * 0.025 }));
  }
  // @ts-expect-error: init method is not defined in the interface
  function c(e) {
    e.touches
      ?// @ts-expect-error: init method is not defined in the interface
      ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
      :// @ts-expect-error: init method is not defined in the interface
      ((pos.x = e.clientX), (pos.y = e.clientY)),
      e.preventDefault();
  }
  // @ts-expect-error: init method is not defined in the interface
  function l(e) {
    // @ts-expect-error: init method is not defined in the interface
    1 == e.touches.length &&
      ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY));
  }
  document.removeEventListener("mousemove", onMousemove),
    document.removeEventListener("touchstart", onMousemove),
    document.addEventListener("mousemove", c),
    document.addEventListener("touchmove", c),
    document.addEventListener("touchstart", l),
    c(e),
    o(),
    render();
}

function render() {
  // @ts-expect-error: init method is not defined in the interface
  if (ctx.running) {
    // @ts-expect-error: init method is not defined in the interface
    ctx.globalCompositeOperation = "source-over";
    // @ts-expect-error: init method is not defined in the interface
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // @ts-expect-error: init method is not defined in the interface
    ctx.globalCompositeOperation = "lighter";
    // @ts-expect-error: init method is not defined in the interface
    ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.025)";
    // @ts-expect-error: init method is not defined in the interface
    ctx.lineWidth = 5;
    for (var e, t = 0; t < E.trails; t++) {
      // @ts-expect-error: init method is not defined in the interface
      (e = lines[t]).update();
      e.draw();
    }
    // @ts-expect-error: init method is not defined in the interface
    ctx.frame++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  // @ts-expect-error: init method is not defined in the interface
  ctx.canvas.width = window.innerWidth - 20;
  // @ts-expect-error: init method is not defined in the interface
  ctx.canvas.height = window.innerHeight;
}

// @ts-ignore
var ctx,
  // @ts-expect-error: init method is not defined in the interface
  f,
  e = 0,
  pos = {},
  // @ts-expect-error: init method is not defined in the interface
  lines = [],
  E = {
    debug: true,
    friction: 0.5,
    trails: 80,
    size: 5,
    dampening: 0.015,
    tension: 0.99,
  };
function Node() {
  this.x = 0;
  this.y = 0;
  this.vy = 0;
  this.vx = 0;
}

export const renderCanvas = function () {
  // @ts-expect-error: init method is not defined in the interface
  ctx = document.getElementById("canvas").getContext("2d");
  ctx.running = true;
  ctx.frame = 1;
  f = new n({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("focus", () => {
    // @ts-expect-error: init method is not defined in the interface
    if (!ctx.running) {
      // @ts-expect-error: init method is not defined in the interface
      ctx.running = true;
      render();
    }
  });
  window.addEventListener("blur", () => {
    // @ts-expect-error: init method is not defined in the interface
    ctx.running = true;
  });
  resizeCanvas();
};
