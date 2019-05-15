const chai = require('chai');
const path = require('path');
const child = require('child_process');

const { expect } = chai;
let proc;
const exec = path.join(__dirname, '../..', 'index.js');


describe('Команда show с тонкостями', () => {
    before(() => {
        process.chdir(__dirname);
    });

    beforeEach(() => {
        proc = child.exec('node ' + exec);
    });

    it('должен показывать список todo', (done) => {
        const result = `
  !  |  user  |  date  |  comment  |  fileName       
-----------------------------------------------------
     |        |        |  ;;       |  jsWithTodo.js  
     |        |        |  ;;;      |  jsWithTodo.js  
-----------------------------------------------------
`.trim();

        proc.stdout.once('data', function () {
            proc.stdin.write('show\r');
            proc.stdout.once('data', function (output) {
                expect(output.toString('utf-8').trim()).to.eq(result);
                done();
            });
        });
    });
});






