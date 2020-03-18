
enum Category {
    Rock = 'Rock',
    Sports = 'Sports',
    Science = 'Science',
    Pop = 'Pop'
}

export class Game {

    private players: Array<string> = [];
    private places: Array<number> = [];
    private purses: Array<number> = [];
    private inPenaltyBox: Array<boolean> = [];
    private currentPlayer: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    constructor() {

        for (let i = 0; i < 50; i++) {
            this.popQuestions.push('Pop Question ' + i);
            this.scienceQuestions.push('Science Question ' + i);
            this.sportsQuestions.push('Sports Question ' + i);
            this.rockQuestions.push(this.createRockQuestion(i));
        }
    }

    private createRockQuestion(index: number): string {
        return 'Rock Question ' + index;
    }

    public add(name: string): boolean {
        this.players.push(name);
        this.places[this.howManyPlayers() - 1] = 0;
        this.purses[this.howManyPlayers() - 1] = 0;
        this.inPenaltyBox[this.howManyPlayers() - 1] = false;

        console.log(name + ' was added');
        console.log('They are player number ' + this.players.length);

        return true;
    }

    private howManyPlayers(): number {
        return this.players.length;
    }

    public playerPlayTurn() {
        const rollDice = Game.rollDice();
        this.printCurrentMovementOfPlayer(rollDice);
        if (this.inPenaltyBox[this.currentPlayer]) {
            this.playerTryToExitPenaltyBoxAndAskQuestion(rollDice);
        } else {
            this.playerMove(rollDice);
            console.log('The category is ' + this.currentCategory());
            this.boardShowsQuestion();
        }
    }

    private static rollDice(): number {
        return Math.floor(Math.random() * 6) + 1;
    }

    public hasPlayerCorrectlyAnswer() {
        return Math.floor(Math.random() * 10) != 7;
    }

    private printCurrentMovementOfPlayer(roll: number) {
        console.log(this.players[this.currentPlayer] + ' is the current player');
        console.log('They have rolled a ' + roll);
    }
    private playerMove(roll: number) {
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if (this.places[this.currentPlayer] > 11) {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }
        console.log(this.players[this.currentPlayer] + '\'s new location is ' + this.places[this.currentPlayer]);
    }

    private playerTryToExitPenaltyBoxAndAskQuestion(roll: number) {
        if (this.playerCanExitPenaltyBox(roll)) {
            this.isGettingOutOfPenaltyBox = true;

            console.log(this.players[this.currentPlayer] + ' is getting out of the penalty box');
            this.playerMove(roll);
            console.log('The category is ' + this.currentCategory());
            this.boardShowsQuestion();
        } else {
            console.log(this.players[this.currentPlayer] + ' is not getting out of the penalty box');
            this.isGettingOutOfPenaltyBox = false;
        }
    }

    private playerCanExitPenaltyBox(roll: number) {
        return roll % 2 != 0;
    }


    private boardShowsQuestion(): void {
        if (this.currentCategory() == Category.Pop)
            console.log(this.popQuestions.shift());
        if (this.currentCategory() == Category.Science)
            console.log(this.scienceQuestions.shift());
        if (this.currentCategory() == Category.Sports)
            console.log(this.sportsQuestions.shift());
        if (this.currentCategory() == Category.Rock)
            console.log(this.rockQuestions.shift());
    }

    private currentCategory(): Category {
        const positionToCategory = [
            {category: Category.Pop, positions: [0, 4, 8]},
            {category: Category.Science, positions: [1, 5, 9]},
            {category: Category.Sports, positions: [2, 6, 10]}
        ];

        const currentPosition = this.places[this.currentPlayer];
        const foundCategory = positionToCategory.find((categoryForPositions) =>
            categoryForPositions.positions.includes(currentPosition)
        );

        return foundCategory ? foundCategory.category : Category.Rock;
    }

    private didPlayerNotWin(): boolean {
        return !(this.purses[this.currentPlayer] == 6)
    }

    public wrongAnswer() {
        console.log('Question was incorrectly answered');
        console.log(this.players[this.currentPlayer] + ' was sent to the penalty box');
        this.inPenaltyBox[this.currentPlayer] = true;

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
    }

    public playerDidntWin(): boolean {
        if (this.inPenaltyBox[this.currentPlayer]) {
            if (this.isGettingOutOfPenaltyBox) {
                console.log('Answer was correct!!!!');
                this.purses[this.currentPlayer] += 1;
                console.log(this.players[this.currentPlayer] + ' now has ' +
                    this.purses[this.currentPlayer] + ' Gold Coins.');

                var playerDidntWin = this.didPlayerNotWin();
                this.currentPlayer += 1;
                if (this.currentPlayer == this.players.length)
                    this.currentPlayer = 0;

                return playerDidntWin;
            } else {
                this.currentPlayer += 1;
                if (this.currentPlayer == this.players.length)
                    this.currentPlayer = 0;
                return true;
            }


        } else {

            console.log('Answer was correct!!!!');

            this.purses[this.currentPlayer] += 1;
            console.log(this.players[this.currentPlayer] + ' now has ' +
                this.purses[this.currentPlayer] + ' Gold Coins.');

            var playerNotWin = this.didPlayerNotWin();

            this.currentPlayer += 1;
            if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;

            return playerNotWin;
        }
    }

}
