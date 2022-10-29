import { callback, query, readData } from '../controller/data.controller';
import 'colors'
import { createWriteStream } from 'fs';

(async () => {
    console.clear();

    console.log('Cargando información geografica...'.cyan)

    console.log('Construyendo su reporte...'.bgMagenta)

    const data = await readData({ callback, param: query });

    if (data.length > 30) {
        console.log('Verificar la carpeta de reportes...'.cyan)
        const fileWrite = createWriteStream('reports/report.json', { encoding: 'utf-8' });
        fileWrite.write(JSON.stringify(data, null, 3))
        fileWrite.close();
    } else console.log(data);

    console.log('reporte generado...'.bgGreen)
})();


