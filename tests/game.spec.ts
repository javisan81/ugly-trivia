import {GameRunner} from '../src/game-runner';
import  * as seedrandom from 'seedrandom';

describe('The test environment', () => {

    it('should golden master', () => {
        let newConsoleLog = jest.fn();
        global.console.log = newConsoleLog;
        for(let i=0; i<500; i++){
            seedrandom(i.toString(), { global: true });
            GameRunner.main();
        }
        expect(newConsoleLog.mock.calls).toMatchSnapshot();
    });
});
