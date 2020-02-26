import {Game} from './game';

export class GameRunner {
    public static main(): void {
        const game = new Game();
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");

        this.play(game);
    }

    private static play(game: Game) {
        let notAWinner;
        do {

            game.roll(Math.floor(Math.random() * 6) + 1);

            if (Math.floor(Math.random() * 10) == 7) {
                notAWinner = game.wrongAnswer();
            } else {
                notAWinner = game.wasCorrectlyAnswered();
            }

        } while (notAWinner);
    }
}

GameRunner.main();

