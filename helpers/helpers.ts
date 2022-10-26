import argv from "../config/yargsConfig";
import fs from 'fs'


const baseRoute = 'assets/padron/'
const source = ((argv as unknown) as { source: boolean, s: boolean }).source
let fileCsvPeople: string;
let fileCsvProvinces = fs.readFileSync(`${baseRoute}Distelec.csv`, { encoding: 'utf8' });

const readStreamPeople = fs.createReadStream(!source ? `${baseRoute}/production.csv` : `${baseRoute}/test.csv`, { encoding: 'utf8' })

readStreamPeople.on('data', data => {
    fileCsvPeople = data as string;
})

readStreamPeople.on('close', () => {
    startUp(); // Los archivos fueron cargados...
})

const formatData = (arr: string[]) => {
    return arr
        .map(value => [...value.split(',')])
        .map(e => e.filter(info => info.trim().length > 0))
        .map(e => e.map(e => e.trim()))
}

const startUp = () => {

    const people = formatData([...fileCsvPeople.split('\n')]);
    const provinces = formatData([...fileCsvProvinces.split('\n')]);

    const filterByPatterns = (on: number, pattern: string) => {
        return [...people.filter(e => e[on].includes(pattern.toUpperCase()))];
    }

    console.log(filterByPatterns(4, 'maria'))
}












