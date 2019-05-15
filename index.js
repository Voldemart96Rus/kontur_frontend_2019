const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const { TODO } = require('./TODO');
const { print } = require('./print');
const listTODO = []; //Лист всех TODO
const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js'); //путь к файлам .js
const files = getFiles(); // Получаем содержимое этих файлов
app();

function app () {
    console.log('Please, write your command!');
    fiendTODO(); // Поиск тоду.
    readLine(processCommand);
}

function getFiles () {
    return filePaths.map(path => readFile(path));
}

function fiendTODO(){
    const todo = /\/\/(\s)*todo(?=\s+|:).*/gi;
    const delTODO = /\/\/\s*todo\s*:?/i;
    let index = 0;
    files.forEach(el => {
        let tmp = el.match(todo);
        if(tmp !== null) { 
        tmp.forEach(foundToDo => {
            let UndefToDO = foundToDo.split(delTODO);
            UndefToDO.forEach(el => {
                if(el.trim() !== '' ){ // удаляю пустые комнтарии типа todo [тут куча пробелов] или todo ;; (&& el.trim() !== ';;') - под вопросом пропускать или нет?
                    listTODO.push(new TODO(el, filePaths[index]));
                } 
            });
        });
    }
    index++;
    });

}

function processCommand (command) {
    let user = /^user ([^0-9\s])(\w+)?/im; // имя не может начинаться с цифр.
    let date = /^date (((\d){4}((-(\d){2})){0,2}))$/im;

    if(user.test(command)) {
        let user = command.replace('user ','');
        getToDoForUser(user);
        return;
    }

    if(date.test(command)) {
        let date = command.replace('date ','');      
        getToDoForDate(new Date(date));
        return;
    }

    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            print(listTODO, false);
            break;
        case 'important':
            print(listTODO, true);
            break;
        case 'sort importance':
            sortTODO(listTODO,'importance');
            break;
        case 'sort user':
            sortTODO(listTODO,'user');
            break;
        case 'sort date':
            sortTODO(listTODO,'date');
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function sortTODO(outList, typeSort) {
    switch (typeSort) {
        case 'importance':
            outList.sort((a,b) => a.important < b.important);
            break;
        case 'user':
            outList = sortDateOrUser(outList, typeSort);
            break;
        case 'date':
            outList = sortDateOrUser(outList, typeSort);
            break;
    }
    print(outList, false);
}

function sortDateOrUser(outList, typeSort) {
    let TODOUserOrDate = []; // список где есть пользователи или дата
    let TODONonameOrDate= []; // список однострочных коментов или где нет имени пользователя или даты
    for(let i = 0; i < outList.length; i++) {
        let el = outList[i];
        if((el.user === '' && typeSort === 'user') || (el.dateValueOF === '' && typeSort === 'date')) {
            TODONonameOrDate.push(el);
        } else {
            TODOUserOrDate.push(el);
        }
    }
    if(typeSort === 'user') {
        TODOUserOrDate.sort((a,b) => a.user.localeCompare(b.user))
    } else {
        TODOUserOrDate.sort((a,b) => a.dateValueOF < b.dateValueOF);
    }

    return TODOUserOrDate.concat(TODONonameOrDate);
}

function getToDoForDate(date) {
    let outList = [];
    for(let i = 0; i < listTODO.length; i++) {
        let el = listTODO[i];
        if(el.dateValueOF !== '' && date <= el.dateValueOF) {
            outList.push(el);
        }
    }
    print(outList, false);
}

function getToDoForUser(user) {
    let outList = [];
    for(let i = 0; i < listTODO.length; i++) {
        let el = listTODO[i];
        if(el.fullNameUser.toLowerCase().startsWith(user.toLowerCase())) {
            outList.push(el);
        }
    }
    print(outList, false);
}
