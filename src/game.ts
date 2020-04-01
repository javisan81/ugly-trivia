
enum Category {
    Rock = 'Rock',
    Sports = 'Sports',
    Science = 'Science',
    Pop = 'Pop'
}
interface CategoryQuestionsInTheBoard {
    category: Category;
    positions: Array<number>;
    questions: Array<string>;
}

class CategoryQuestionsInTheBoard2 implements CategoryQuestionsInTheBoard {
    category: Category;
    positions: Array<number>;
    questions: Array<string>;
    constructor(category: Category, positions: Array<number>, questions: Array<string>) {
        this.category = category;
        this.positions = positions;
        this.questions = questions;
    }
}

class X {
    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    constructor() {
        this.initializeQuestions();
    }

    private initializeQuestions() {
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

    private rockCategoryQuestion = {category: Category.Rock, positions: [], questions: this.rockQuestions};

    private categoriesQuestionsInTheBoard: Array<CategoryQuestionsInTheBoard> = [
        {category: Category.Pop, positions: [0, 4, 8], questions: this.popQuestions},
        {category: Category.Science, positions: [1, 5, 9], questions: this.scienceQuestions},
        {category: Category.Sports, positions: [2, 6, 10], questions: this.sportsQuestions},
        this.rockCategoryQuestion,
    ];

    private currentCategoryInTheBoard(currentPosition: number): CategoryQuestionsInTheBoard2 {
        const foundCategory =  this.categoriesQuestionsInTheBoard.find((categoryForPositions) =>
            categoryForPositions.positions.includes(currentPosition));
        return foundCategory ? foundCategory : this.rockCategoryQuestion;
    }

    public currentCategory(currentPosition: number): Category {
        return this.currentCategoryInTheBoard(currentPosition).category;
    }

    public nextQuestion(currentPosition: number) {
        return this.currentCategoryInTheBoard(currentPosition).questions.shift();
    }
}


export class Game {

    private boardShowsQuestion(): void {
        console.log(this.x.nextQuestion(this.places[this.currentPlayer]));
    }

    private players: Array<string> = [];
    private places: Array<number> = [];
    private purses: Array<number> = [];

    private inPenaltyBox: Array<boolean> = [];
    private currentPlayer: number = 0;

    private isGettingOutOfPenaltyBox: boolean = false;

    private x: X;

    constructor() {
        this.x = new X();
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
            console.log('The category is ' + this.x.currentCategory(this.places[this.currentPlayer]));
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
            console.log('The category is ' + this.x.currentCategory(this.places[this.currentPlayer]));
            this.boardShowsQuestion();
        } else {
            console.log(this.players[this.currentPlayer] + ' is not getting out of the penalty box');
            this.isGettingOutOfPenaltyBox = false;
        }
    }

    private playerCanExitPenaltyBox(roll: number) {
        return roll % 2 != 0;
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
