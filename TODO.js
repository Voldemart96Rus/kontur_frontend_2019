class TODO{
    constructor(UndefToDO, filePaths) {
        let file = /\/.*\.js/gi; //регулярка которая вытягивает из path только имя файла.
        let tmpLenNameFile = filePaths.search(file) + 1; // +1 так как в самом пути будет еще '\'
        let tmp = '';
        this.nameFile = filePaths.slice(tmpLenNameFile); //тут получаем имя файла.
        let tmpSTR = UndefToDO.split(';'); // проверяем являтся ли todo user; date; comment
        if(tmpSTR.length >= 3 && this.checkDate(tmpSTR[1])) { 
            this.user = tmpSTR[0].trim();
            this.date = tmpSTR[1].trim();
            this.dateValueOF = this.date === '' ? '' : new Date(this.date); // тип дата необходима для поиска/сортировки коментариев по дате
            this.comment = tmpSTR.slice(2).join(';').trim(); // тут обрабатываю случай когда todo ;;comment; когда в коментарии есть ; - это часть коментария 
            tmp = tmpSTR[2].match(/!/g);
        } else {
            this.user = '';
            this.date = '';
            this.dateValueOF = '';
            this.comment = UndefToDO.trim();
            tmp = UndefToDO.match(/!/g); 
        }
        this.important = tmp !== null ? tmp.length : 0;
        this.fullNameUser = this.user; // нужна когда длина имени пользователя больше 10, т.к user дальше обрежет по длине.
        this.checkLen(); // проверяет длины строк и обрезает при необходимости.
      }
       checkLen() {
          if(this.user.length > 10) {
              this.user = this.user.slice(0,7)+'...';
          }
          if(this.comment.length > 50) {
            this.comment = this.comment.slice(0,47)+'...';
          }
          if(this.nameFile.length > 15) {
            this.nameFile = this.nameFile.slice(0,12)+'...';
          }
      }

      checkDate(date) {
        let tmp = date.trim().split('-');
        let tmpDate = new Date(date);
        if(tmp.length === 3 && tmp[0].length === 4 && tmp[1].length === 2 && tmp[2].length === 2) {
            return tmpDate.toString() !== 'Invalid Date';
        }
        return false;
      }
}

module.exports = {
    TODO
}