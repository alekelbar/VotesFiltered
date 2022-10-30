// archivo de configuración global de rutas, y demás variables...
const baseRoute = 'assets/padron/'

interface appConfigInterface {
    linesPerBuffer: number,
    encoding: BufferEncoding,
    productionRouteCsv: string,
    developmentRoute: string,
    provincesCsv: string,
}

export const appConfig: appConfigInterface = {
    linesPerBuffer: 1000000,
    encoding: 'utf8',
    productionRouteCsv: `${baseRoute}production.csv`,
    developmentRoute: `${baseRoute}test.csv`,
    provincesCsv: `${baseRoute}Distelec.csv`,
}

