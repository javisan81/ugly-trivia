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
export class StackOfQuestions {
    private rockQuestions: Array<string> = [];

    private categoriesQuestionsInTheBoard: Array<CategoryQuestionsInTheBoard> = [
        {category: Category.Pop, positions: [0, 4, 8], questions: []},
        {category: Category.Science, positions: [1, 5, 9], questions: []},
        {category: Category.Sports, positions: [2, 6, 10], questions: []},
        {category: Category.Rock, positions: [], questions: this.rockQuestions},
    ];

    constructor() {
        this.initializeQuestions();
    }

    private initializeQuestions() {
        for (let i = 0; i < 50; i++) {
            this.categoriesQuestionsInTheBoard[0].questions.push('Pop Question ' + i);
            this.categoriesQuestionsInTheBoard[1].questions.push('Science Question ' + i);
            this.categoriesQuestionsInTheBoard[2].questions.push('Sports Question ' + i);
            this.categoriesQuestionsInTheBoard[3].questions.push('Rock Question ' + i);
        }
    }


    private currentCategoryInTheBoard(currentPosition: number): CategoryQuestionsInTheBoard {
        const foundCategory = this.categoriesQuestionsInTheBoard.find((categoryForPositions) =>
            categoryForPositions.positions.includes(currentPosition));
        return foundCategory ? foundCategory : this.categoriesQuestionsInTheBoard[3];
    }

    public currentCategory(currentPosition: number): Category {
        return this.currentCategoryInTheBoard(currentPosition).category;
    }

    public nextQuestion(currentPosition: number) {
        return this.currentCategoryInTheBoard(currentPosition).questions.shift();
    }
}
