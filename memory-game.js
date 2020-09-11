function MemoryGame() {
    const cards = document.querySelectorAll('.memory-card')
    const countNumber = document.getElementById('countClick')
    let hasFlippedCard = false
    let lockBoard = false
    let firstCard, secondCard
    let countMatch = 0
    let countClick = 0

    let cardsLength = cards.length

    //game timer
    var second = 0, minute = 0; hour = 0;
    var timer = document.getElementById('timer')
    var interval;

    countNumber.innerHTML = countClick

    function flipCard() {
        
        if(lockBoard) return
        
        if(this === firstCard) return
        
        this.classList.add('flip')
        if(!hasFlippedCard) {
            // first click
            hasFlippedCard = true
            firstCard = this
            
            return
        }
        
        // second click
        secondCard = this
        
        // do match
        checkMatch()
    }

    function checkMatch() { 
        
        countClick += 1
        countNumber.innerHTML = countClick 
        const istmatch = firstCard.dataset.framework === secondCard.dataset.framework
        istmatch ? disableCard()  : unFlipCard()
    }

    function disableCard() {
        firstCard.removeEventListener('click', flipCard)
        secondCard.removeEventListener('click', flipCard)

        countMatch += 1
        
        checkWin();
        
        resetBoard()
    }

    function unFlipCard() {
        lockBoard = true
        
        setTimeout(() => {
            firstCard.classList.remove('flip')
            secondCard.classList.remove('flip') 
            resetBoard()
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false]
        [firstCard, secondCard] = [null, null]
    }

    // @description game timer
    function startTimer(){
        interval = setInterval(function(){
            timer.innerHTML = minute+"mins "+second+"secs";
            second++;
            if(second == 60){
                minute++;
                second=0;
            }
            if(minute == 60){
                hour++;
                minute = 0;
            }
        },1000);
    }



    (function shuffle() {
        startTimer();
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * cardsLength)
            card.style.order = randomPos
        })
    })()

    // check win
    function checkWin() {
        if((cardsLength / 2) == countMatch) {
            gameWin()
        }
    }

    function gameWin() {
        clearInterval(interval)
        Swal.fire({
            text: "Anda mendapatkan hadiah powerbank. Waktu bermain anda adalah " + minute + " mins " + second + " secs",
            title: "Selamat!!",
            icon: "success"
        })
    }

    cards.forEach(card => card.addEventListener('click', flipCard))
}