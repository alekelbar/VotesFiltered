
import { appConfig } from '../config/config';
import { createInterface } from "readline";
import { userVote } from "../models/userVote";
import argv from "../config/yargsConfig";
import fs, { createReadStream, readFileSync } from 'fs'
import csvParser from 'csv-parser';


const source = ((argv as unknown) as { source: boolean, s: boolean }).source;
const path = source
    ? appConfig.productionRouteCsv
    : appConfig.developmentRoute;
let readLines: number = 0;
let peopleCsv: userVote[] = [];
let result: userVote[] = [];

type Province = {
    ID: string,
    province: string,
    city: string,
    distri: string,
}

const provinces: Province[] = [];

export const makeProvinces = async () => {
    return new Promise((resolve, _) => {
        fs.createReadStream(appConfig.provincesCsv, { encoding: 'utf8' })
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
            })
    })
}




type callbackAction = {
    callback: (arr: userVote[], target: string) => Array<any>,
    param: string
}

export const readData = (action: callbackAction) => {
    return new Promise<Array<any>>((resolve, _) => {
        createInterface({ input: fs.createReadStream(path, { encoding: appConfig.encoding }) })
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
            })
    })

}

const transform = ({ callback, param }: callbackAction) => {
    result
        = [...callback(peopleCsv, param), ...result]
            .filter(e => e.length !== 0 && e !== '0')
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

