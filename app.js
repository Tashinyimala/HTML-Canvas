const canvas  = document.querySelector('#draw');
const context = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

context.strokeStyle ='#BADA55';
context.lineJoin    = 'round';
context.lineCap     = 'round';
context.lineWidth   = 20;
context.globalCompositeOperation = 'multiply'; //blend the color when overlap

let isDrawing = false; //Flag
let lastX     = 0;
let lastY     = 0;
let hue       = 0;
let direction = true;

function draw(ev) {
    if(!isDrawing)  return;

    context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(ev.offsetX, ev.offsetY);
    context.stroke();

    [lastX, lastY] = [ev.offsetX, ev.offsetY];
    
    hue++;

    if(hue >= 360) { 
        hue = 0;
    }

    if(context.lineWidth >=100 || context.lineWidth <= 1) {
        direction = !direction;
    } 

    if(direction) {
        context.lineWidth ++;
    } else {
        context.lineWidth --;
    }
}

// Event Listeners
canvas.addEventListener('mousedown', (ev) => {
    isDrawing = true;
    [lastX, lastY] = [ev.offsetX, ev.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);