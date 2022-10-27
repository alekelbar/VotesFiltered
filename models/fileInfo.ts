import argv from "../config/yargsConfig";

interface fileInfo {
    path: string;    
    registerPerLecture: number,
    lines: number,
    line: string,
    encoding: BufferEncoding
}

const baseRoute = 'assets/padron/'
const source = ((argv as unknown) as { source: boolean, s: boolean }).source;
const path = source ? `${baseRoute}production.csv` : `${baseRoute}test.csv`;

export default {
    path,
    registerPerLecture: 100000,
    lines: 0,
    line: '',
    encoding: 'utf8'
} as fileInfo;