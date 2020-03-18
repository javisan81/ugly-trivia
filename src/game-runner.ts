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
        let noWinner;
        do {
            game.playerPlayTurn();

            if (game.hasPlayerCorrectlyAnswer()) {
                noWinner = game.playerDidntWin();
            } else {
                game.wrongAnswer();
                noWinner = true;
            }

        } while (noWinner);
    }
}

GameRunner.main();

