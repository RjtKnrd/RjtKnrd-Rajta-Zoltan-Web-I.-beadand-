let worker;
function startWorker() {
    if (typeof(Worker) !== 'undefined') {
        if (!worker) {
            worker = new Worker('worker.js');
            worker.onmessage = function(event) {
                document.getElementById('workerResult').innerText = event.data;
            };
        }
    } else {
        alert('A böngésződ nem támogatja a Web Workereket.');
    }
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            document.getElementById('location').innerText = 
                `Szélesség: ${position.coords.latitude}, Hosszúság: ${position.coords.longitude}`;
        }, function(error) {
            document.getElementById('location').innerText = 'Hiba: ' + error.message;
        });
    } else {
        document.getElementById('location').innerText = 'A böngésződ nem támogatja a helymeghatározást.';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const drag = document.getElementById('drag');
    const drop = document.getElementById('drop');

    drag.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text', e.target.id);
    });

    drop.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    drop.addEventListener('drop', function(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        drop.appendChild(document.getElementById(data));
    });

   
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 150, 75);
});
