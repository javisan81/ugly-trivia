import {Game} from './game';

export class GameRunner {
    public static main(): void {
        const game = this.createGame();
        this.play(game);
    }

    private static createGame() {
        const game = new Game();
        game.add('Chet');
        game.add('Pat');
        game.add('Sue');
        return game;
    }

    private static play(game: Game) {
        let thereIsAWinner;
        do {
            game.roll(Math.floor(Math.random() * 6) + 1);

            if (Math.floor(Math.random() * 10) == 7) {
                thereIsAWinner = !game.wrongAnswer();
            } else {
                thereIsAWinner = !game.wasCorrectlyAnswered();
            }

        } while (!thereIsAWinner);
    }
}

GameRunner.main();

