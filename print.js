function print(outList, important) {
    let arrColMax = [0, 4, 4, 7, 8]; // где 0 это относится к 1 столбику ввода, где 4 ко 2 и т.д
    let printConsole = []; 
    getMaxWidthCol(arrColMax, outList, important); // на выходе в массиве arrColMax содержатя максимальные длины столбцов среди отобронного списка для вывода

    printConsole.push('  !  |  user' + getSpaces('user', arrColMax[1]) + '  |  date' 
        + getSpaces('date',arrColMax[2]) + '  |  comment' + getSpaces('comment', arrColMax[3]) 
        + '  |  fileName' + getSpaces('fileName', arrColMax[4]) + '  ');

    let hr = getHR(25 + arrColMax.reduce((acc,item) => acc+item, 0)); // длина черты.

    printConsole.push(hr);
    printConsole = printConsole.concat(getListTODOForPrint(outList, arrColMax, important));

    if(outList.length !== 0) {
    printConsole.push(hr);
    }

    console.log(printConsole.join('\n'));
}

function getHR(hrLen) {
    let hr = '';
    for(let i = 0; i < hrLen; i++) {
        hr +='-';
    }
    return hr;
}

function getMaxWidthCol(arrColMax, outList, important) {
    for(let i = 0; i < outList.length; i++) {
        let el = outList[i]; 
        if(important && el.important === 0) { continue; }
        arrColMax[1] = el.user.length > arrColMax[1] ? el.user.length:arrColMax[1];
        arrColMax[2] = el.date.length > arrColMax[2] ? el.date.length:arrColMax[2];
        arrColMax[3] = el.comment.length > arrColMax[3] ? el.comment.length:arrColMax[3];
        arrColMax[4] = el.nameFile.length > arrColMax[4] ? el.nameFile.length:arrColMax[4];
    }
}

function getListTODOForPrint(outList, arrColMax, important) {
    let result = [];

    for(let i = 0; i < outList.length; i++) {
        let element = outList[i];
        if(important && element.important === 0) { continue; }
        let str1 = element.important > 0 ? '  !  |':'     |';
        let str2 = '  ' + element.user + getSpaces(element.user, arrColMax[1]) + '  |';
        let str3 = '  ' + element.date + getSpaces(element.date, arrColMax[2]) + '  |';
        let str4 = '  ' + element.comment + getSpaces(element.comment, arrColMax[3]) + '  |';
        let str5 = '  ' + element.nameFile + getSpaces(element.nameFile, arrColMax[4]) + '  ';
        result.push(str1 + str2 + str3 + str4 + str5);
    }

    return result;
}

function getSpaces(str, maxLenCol){
    let tmp = maxLenCol - str.length;
    let result = '';
    for(let i = 0; i < tmp; i++){
        result += ' ';
    }

    return result;
}

module.exports = {
    print
}