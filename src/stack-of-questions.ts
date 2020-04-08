enum Category {
    Rock = 'Rock',
    Sports = 'Sports',
    Science = 'Science',
    Pop = 'Pop'
}
interface CategoryQuestionsInTheBoard {
    category: Category;
    questions: Array<string>;
}
export class StackOfQuestions {

    private categoriesQuestionsInTheBoard: Array<CategoryQuestionsInTheBoard> = [
        {category: Category.Pop, questions: []},
        {category: Category.Science, questions: []},
        {category: Category.Sports, questions: []},
        {category: Category.Rock, questions: []},
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


    private categoryInTheBoard(position: number): CategoryQuestionsInTheBoard {
        return this.categoriesQuestionsInTheBoard[position % 4];
    }

    public getCategory(position: number): Category {
        return this.categoryInTheBoard(position).category;
    }

    public drawQuestion(position: number) {
        return this.categoryInTheBoard(position).questions.shift();
    }
}
