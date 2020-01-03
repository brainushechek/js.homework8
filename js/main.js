var modal = document.createElement('div') 
modal.style.cssText = `
    height: 50px;  
    width: 200px; 
    background: white;
    top: calc(50% - ${50 / 2}px); 
    left: calc(50% - ${200 / 2}px);;
    font-size: 24px; 
    z-index: 9; 
    display: none; 
    position: fixed;
    border: 1px solid #383838;
`
document.body.appendChild(modal)

var startButton = document.createElement('input')
startButton.type = 'button'
startButton.value = 'START GAME'
startButton.style.cssText = `
    height: 50px;  
    width: 200px;
    font-family: Comic Sans MS, cursive;
    font-size: 25px
`
modal.appendChild(startButton)

function showModalWin() {
    var darkLayer = document.createElement('div')
    darkLayer.style.cssText = `
        position: fixed;
        width:100%;
        height:100%;
        z-index: 8;
        background:#000;
        opacity: 0.5;
        left:0;
        top:0
    `
    document.body.appendChild(darkLayer)

    modal.style.display = 'block'

    startButton.addEventListener('click', startGame, false)
    function startGame() {
        darkLayer.parentNode.removeChild(darkLayer)
        modal.style.display = 'none'
        app.style.display = 'block'
    }
    startButton.addEventListener('click', playMusic, false)
    function playMusic() {
        music.play()
    }
}

showModalWin()


var app = document.getElementById('app')
app.style.display = 'none'

var music = document.createElement('audio')
music.src = 'music/music.mp3'
music.loop = true
music.volume = 0.2
app.appendChild(music)


var points = document.createElement('div')
points.style.cssText = `
    width: 100px;
    height: 50px;
    font-size: 40px;
    font-family: Comic Sans MS, cursive;
    position: absolute;
    top: 20px;
    right: 20px;
    border: 1px solid black;
    border-radius: 15%;
    background: #286D27;
    text-align: center
`
app.appendChild(points)

var audio = document.createElement('audio')
audio.src = 'music/target.mp3'
app.appendChild(audio)

var sum = 0

function Circle(size, backgroundColor, point, zIndex = 0) {
    var element = document.createElement('div')
    element.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background-color: ${backgroundColor};
        position: absolute;
        top: calc(50% - ${size / 2}px);
        left: calc(50% - ${size / 2}px);
        z-Index: ${zIndex}
    `
    element.addEventListener('click', fPlay, false)
    function fPlay() {
        audio.play()
    }
    element.addEventListener('click', pointSum, false) 
    function pointSum() {
        sum += +`${point}`
        points.innerHTML = sum 
    }

    this.appendToApp = () => circlesContainer.appendChild(element)
}

var circlesContainer = document.createElement('div')
circlesContainer.style.cssText = `
        width: ${500}px;
        height: ${500}px;
        border-radius: 50%;
        position: absolute;
        top: calc(50% - ${500 / 2}px);
        left: calc(50% - ${500 / 2}px)
        `
app.appendChild(circlesContainer)

var circles = [
    new Circle(396, 'black', 5), 
    new Circle(330, 'white', 10, 1),
    new Circle(264, 'black', 20, 2), 
    new Circle(198, 'white', 30, 3),
    new Circle(132, 'black', 40, 4),
    new Circle(66, 'red', 50, 5)]
circles.forEach((circle) => circle.appendToApp())


function circlesMove() { 
    setInterval(() => {
        circlesContainer.style.top = `${random (0, 100)}px`
        circlesContainer.style.left = `${random (300, 400)}px`
    }, 500)}
circlesMove()

var img = document.createElement('img')
img.src = 'img/drt.png'
img.style.zIndex = 10
img.style.width = '80px'
img.style.position = 'absolute'
app.appendChild(img)

var style = document.createElement('style')
style.innerText = ` 
html, body {
    height: 100%;
}
body {
    margin: 0;
}
#app:hover {
    cursor: none;
}
`
document.head.appendChild(style)

window.onmousemove = (event) => {
    //console.dir(event)
    img.style.top = `${event.clientY - 80}px`
    img.style.left = `${event.clientX}px`
}

function Bird(size, imgSrc, intervalTime,zIndex = 5) {
    var element = document.createElement('img')
    element.src = imgSrc
    element.style.cssText = `
        position: absolute;
        width: ${size}px;
        z-Index: ${zIndex};
        transition: ${intervalTime / 1000}s all
        `
    var random = (min, max) => Math.round(Math.random() * (max - min) + min)
    this.appendToApp = () => app.appendChild(element)
    this.startInterval = () => {
        setInterval(() => {
            element.style.top = `${random (0, window.innerHeight - size)}px`
            element.style.left = `${random (0, window.innerWidth - size)}px`
        }, intervalTime)
    }
}
var birds = []
var random = (min, max) => Math.round(Math.random() * (max - min) + min)
for (var i = 0; i < 0; i++) {
    birds.push(new Bird (random(50, 250), 'img/bird.gif', random(50, 2000)))
}
birds.forEach((bird) => bird.appendToApp())
birds.forEach((bird) => bird.startInterval())