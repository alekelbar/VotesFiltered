
import { appConfig } from '../config/config';
import { createInterface } from "readline";
import { userVote } from "../models/userVote";
import argv from "../config/yargsConfig";
import fs from 'fs'
import csvParser from 'csv-parser';
import { searchByID, searchByName, expiresDate, searchByDate, searchByLastName, searchByEqualNames, searchByProvince } from '../services/user.services';



type callbackAction = {
    callback: any
    param: string
}

const args = ((argv as unknown) as {
    source: boolean,
    s: boolean,
    se: string,
    search: string,
    q: string,
    query: string
});

export const search = args.search;
export const query = args.query;
let sum: boolean = false;
let searchProvince: boolean = false;

const setCallback = (search: string) => {
    switch (search.toLocaleLowerCase()) {
        case 'name':
            return searchByName;
        case 'id':
            return searchByID;
        case 'date':
            return searchByDate;
        case 'expires':
            return expiresDate;
        case 'equals':
            sum = true;
            return searchByEqualNames;
        case 'lastname':
            return searchByLastName
        case 'province':
            searchProvince = true;
            return searchByProvince;
        default:
            return searchByName;
    }
}

export const callback = setCallback(search);


const path = !args.s
    ? appConfig.productionRouteCsv
    : appConfig.developmentRoute;
let readLines: number = 0;
let peopleCsv: userVote[] = [];
let result: any[] = [];

export type Province = {
    ID: string,
    province: string,
    city: string,
    distri: string,
}


const makeProvinces = async (provinces: Province[]) => {
    return new Promise((resolve, _) => {
        const readStreamProvinces = fs.createReadStream(appConfig.provincesCsv, { encoding: 'utf8' })
            .pipe(csvParser(
                {
                    headers: ['ID', 'province', 'city', 'distri'],
                    mapValues: ({ value }) => value.trim(),
                }))
            .on('data', province => {
                provinces.push(province)
            })
            .on('close', () => {
                resolve(provinces);
                readStreamProvinces.removeAllListeners();
            })
    })
}

const provinces: Province[] = [];

(async () => {
    await makeProvinces(provinces);
})();



export const readData = (action: callbackAction) => {
    return new Promise<Array<any>>((resolve, _) => {
        const it = createInterface({ input: fs.createReadStream(path, { encoding: appConfig.encoding }) })
            .on('line', (line) => {

                if (readLines === appConfig.linesPerBuffer) {
                    transform(action);
                    readLines = 0;
                    peopleCsv.length = 0;
                }
                readLines++;
                const userInfo = line.split(',');
                add(userInfo);
            })
            .on('close', () => {
                transform(action);
                readLines = 0;
                peopleCsv.length = 0;
                resolve(result);
                it.close();
                it.removeAllListeners();
            })
    })

}

function transform({ callback, param }: callbackAction) {

    if(searchProvince){
        result = [...callback(peopleCsv, provinces, param), ...result]
        return;
    }

    if (sum) {
        result = [result[0] ? result[0] + callback(peopleCsv, param) : callback(peopleCsv, param)];
        return;
    }
    result = [...callback(peopleCsv, param), ...result]
};



const add = (arr: string[]) => {
    if (arr.length >= 5)
        peopleCsv.push({
            ID: arr[0].trim(),
            code: arr[1].trim(),
            date: arr[3].trim(),
            managment: arr[4].trim(),
            name: arr[5].trim(),
            mName: arr[6].trim(),
            pName: arr[7].trim(),
        });
}

