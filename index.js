const hexName = document.querySelectorAll(".hex-name")
let colors = []
console.log(hexName)

hexName.forEach(hexName => {
hexName.addEventListener('click', function() {
    let hexValue = hexName.textContent
    navigator.clipboard.writeText(hexValue)
    alert("Copied the text: " + hexValue)
})
})

document.addEventListener('change',function() {
    const seedHex = document.getElementById("color-picker").value.slice(1)
    const mode = document.getElementById("select-mode").value
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedHex}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => {
            data.colors.forEach(element => {
                colors.push(element.hex.value)
                console.log(colors)
            });
        })
        .then(() => {
            const colorContainers = document.querySelectorAll(".color-container")
            const hexName = document.querySelectorAll(".hex-name")
            colorContainers.forEach((element, index) => {
                element.style.backgroundColor = colors[index]
            })
            hexName.forEach((element, index) => {
                element.textContent = colors[index]
            })
            colors = []
        })
})
