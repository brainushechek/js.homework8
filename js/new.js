var app = document.getElementById('app')

var img = document.createElement('img')
img.src = 'drt.png'
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

var dartInMotion = document.createElement('img')
app.appendChild(dartInMotion)

window.onmousemove = (event) => {
    //console.dir(event)
    img.style.top = `${event.clientY - 80}px`
    img.style.left = `${event.clientX}px`
    dartInMotion.style.top = `${event.clientY - 80}px`
    dartInMotion.style.left = `${event.clientX}px`
}

window.onclick = (event) => {
    dartInMotion.src = 'drt.gif'
    setTimeout (() => {
        img.src = 'drt.png'
    }, 800)
    console.log(event)
}

