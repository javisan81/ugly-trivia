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

export class StackOfQuestions {
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
        const foundCategory = this.categoriesQuestionsInTheBoard.find((categoryForPositions) =>
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
