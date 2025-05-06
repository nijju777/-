new Vue({
    el: '#app',
    data: {
        cards: [],
        flippedCards: [],
        matchedCards: 0,
        totalPairs: 8, // Количество пар карточек
        timer: 0,
        attempts: 0,
        timerInterval: null,
    },
    created() {
        this.createCardValues();
        this.createCards();
        this.startTimer();
    },
    methods: {
        createCardValues() {
            const cardImages = [];
            for (let i = 1; i <= this.totalPairs; i++) {
                cardImages.push(`card${i}.png`, `card${i}.png`); // Добавляем путь к изображению
            }
            this.cards = this.shuffleArray(cardImages);
        },
        shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5);
        },
        createCards() {
            this.cards = this.cards.map(image => ({ image, flipped: false }));
        },
        flipCard(card) {
            if (this.flippedCards.length < 2 && !card.flipped) {
                card.flipped = true;
                this.flippedCards.push(card);

                // Увеличиваем счетчик попыток только при открытии пары
                if (this.flippedCards.length === 2) {
                    this.attempts += 1; // Увеличиваем счетчик попыток
                    this.checkForMatch();
                }
            }
        },
        checkForMatch() {
            const [firstCard, secondCard] = this.flippedCards;

            if (firstCard.image === secondCard.image) {
                this.matchedCards += 1;
                this.flippedCards = [];
                if (this.matchedCards === this.totalPairs) {
                    clearInterval(this.timerInterval); // Остановить таймер
                    setTimeout(() => alert('Поздравляем! Вы собрали все цветы!'), 500);
                }
            } else {
                setTimeout(() => {
                    firstCard.flipped = false;
                    secondCard.flipped = false;
                    this.flippedCards = [];
                }, 1000);
            }
        },
        restartGame() {
            this.flippedCards = [];
            this.matchedCards = 0;
            this.attempts = 0; // Сбрасываем счетчик попыток
            this.timer = 0; // Сбрасываем таймер
            clearInterval(this.timerInterval); // Останавливаем таймер
            this.createCardValues();
            this.createCards();
            this.startTimer(); // Запускаем таймер заново
        },
        startTimer() {
            this.timerInterval = setInterval(() => {
                this.timer += 1; // Увеличиваем таймер каждую секунду
            }, 1000);
        }
    }
});