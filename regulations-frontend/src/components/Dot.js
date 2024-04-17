export function Dot(options) {
  let hasWrapperEl = options && options.element;
  let element = hasWrapperEl || document.body;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let cursor = { x: width / 2, y: height / 2 };  // Fixed a typo here: it should be height / 2
  let dot = new Dot(width / 2, height / 2, 40, 20);  // Increased size and adjusted lag
  let canvas, context, animationFrame;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  prefersReducedMotion.onchange = () => {
    if (prefersReducedMotion.matches) {
      destroy();
    } else {
      init();
    }
  };

  function init() {
    if (prefersReducedMotion.matches) {
      console.log("Reduced motion is enabled, cursor effect will not be initialized");
      return false;
    }

    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.style.cssText = "position: fixed; top: 0; left: 0; pointer-events: none; z-index: 10000;";
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;

    bindEvents();
    loop();
  }

  function bindEvents() {
    element.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function onMouseMove(e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  }

  function updateDot() {
    context.clearRect(0, 0, width, height);
    dot.moveTowards(cursor.x, cursor.y, context);
  }

  function loop() {
    updateDot();
    animationFrame = requestAnimationFrame(loop);
  }

  function destroy() {
    canvas.remove();
    cancelAnimationFrame(animationFrame);
    element.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("resize", onWindowResize);
  };

  function Dot(x, y, radius, lag) {
    this.position = { x, y };
    this.radius = radius;
    this.lag = lag;
  
    this.moveTowards = function(targetX, targetY, context) {
      // Smoothly move towards the cursor position
      this.position.x += (targetX - this.position.x) / this.lag;
      this.position.y += (targetY - this.position.y) / this.lag;
  
      // Set the fill style and shadow for a semi-transparent red blob
      context.fillStyle = 'rgba(255, 0, 0, 0.2)'; // Semi-transparent red
      context.shadowBlur = 10; // Adds a soft glow around the blob
      context.shadowColor = 'rgba(255, 0, 0, 1)'; // Glowing color
  
      // Start drawing an irregular shape using Bezier curves
      context.beginPath();
      // Start point
      context.moveTo(this.position.x + radius, this.position.y);
      // Draw Bezier curves to form an irregular blob
      context.bezierCurveTo(
        this.position.x + radius * 1.5, this.position.y - radius * 0.5,
        this.position.x + radius * 1.2, this.position.y + radius * 1.2,
        this.position.x, this.position.y + radius
      );
      context.bezierCurveTo(
        this.position.x - radius * 1.5, this.position.y + radius * 1.1,
        this.position.x - radius * 1.2, this.position.y - radius * 0.6,
        this.position.x - radius * 0.5, this.position.y - radius * 0.9
      );
      context.bezierCurveTo(
        this.position.x + radius * 0.3, this.position.y - radius * 1.4,
        this.position.x + radius * 0.8, this.position.y - radius * 0.5,
        this.position.x + radius, this.position.y
      );
      context.fill();
      context.closePath();
    };
  }
  

  init();

  return {
    destroy: destroy
  };
}

export default Dot;