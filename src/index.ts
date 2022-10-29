import { resolve } from 'path';
import { createInterface } from 'readline';
import { makeProvinces, readData } from '../controller/data.controller';
import { searchByID, searchByName, expiresDate, searchByDate, searchByEqualNames, searchByLastName } from '../services/user.services';


const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

// console.clear();
rl.question('hello! ', (awnser) => {
    resolve(awnser);
    rl.removeAllListeners();
    rl.close();
})

let num: number = 0;


const repeat = async (option: number) => {

    let opt: number = 0;

    const data = (await readData({ callback: searchByName, param: 'alexander' }));

    const handlerTime = setTimeout(() => {
        console.log(data[num])
        num++;
    }, 1000);

    if (option === 0) return;
    else repeat(1);

}

// repeat(0);


