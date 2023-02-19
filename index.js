const colorElements = document.querySelectorAll('.color-column');
const tooltip = document.getElementById("tooltip");
const palete = document.querySelector(".palete");

let colors = []

colorElements.forEach(colorElement => {
  colorElement.addEventListener('click', () => {
    const hexValue = colorElement.querySelector('.hex-name');
    navigator.clipboard.writeText(hexValue.textContent)
  });
});

palete.addEventListener("click", function(event) {
  let x = event.clientX;
  let y = event.clientY;
  console.log(x, y);
  
  tooltip.style.left = x + "px";
  tooltip.style.top = y + "px";
  tooltip.style.visibility = 'visible';
    tooltip.style.opacity = 1;
    setTimeout(function(){
        tooltip.style.transition = 'opacity 0.3s ease';
        tooltip.style.opacity = 0;
    }, 1200);
    setTimeout(function(){
    tooltip.style.visibility = 'hidden';
    }, 2000);
});

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