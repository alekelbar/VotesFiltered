import { createInterface } from "readline";
import fs from 'fs'
import fileInfo from "../models/fileInfo";
import transacctionState from "../models/transacctionState";

interface dataAccess {
    readData: () => void
    private transform: Function
}

class dataController implements dataAccess {
    public readData() {
        createInterface({input: fs.createReadStream(fileInfo.path, {encoding: fileInfo.encoding})})
            .on('line', (line) => {
                if(fileInfo.lines === fileInfo.registerPerLecture){
                    // startUp()
                }
                fileInfo.lines++;
                
                const userInfo = line.split(',');
                if(userInfo.length >= 5)
                    transacctionState.peopleCsv.push({
                        ID: userInfo[0].trim(),
                        code: userInfo[1].trim(),
                        date: userInfo[3].trim(),
                        managment: userInfo[4].trim(),
                        name: userInfo[5].trim(),
                        mName: userInfo[6].trim(),
                        pName: userInfo[7].trim(),
                    });
                })
            .on('close', () => {
                console.log(transacctionState.resultSet);
            }); 
    }

    private transform(action: string)  {    
        // switch (action) {
        //     case value:
        //         break;
        //     default:
        //         break;
        // }
    
        // reset...
        transacctionState.peopleCsv.length = 0;
        fileInfo.lines = 0;

    };

}
