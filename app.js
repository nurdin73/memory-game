let section = document.querySelector('.memory-game')

let dataImage = [
    { name: "asus", img: 'img1.jpg'},
    { name: "macbook", img: 'img2.jpg'},
    { name: "tab", img: 'img3.jpg'},
    { name: "laptop", img: 'img4.jpg'},
    { name: "jam", img: 'img5.jpg'},
    { name: "karet gelang", img: 'img6.jpg'},
]
var html = ""

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

dataImage = shuffleArray(dataImage)
for (let i = 0; i < 2; i++) {
    dataImage.map(data => {
        html += `<div class="memory-card" data-framework="${data.name}">
            <img src="img/${data.img}" alt="${data.name}" class="front-face">
            <img src="img/tele.png" alt="Logo" class="back-face">
        </div>`
    })
}
section.innerHTML = html
MemoryGame()