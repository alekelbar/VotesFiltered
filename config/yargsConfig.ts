import { string } from "yargs";
import  yargs  from "yargs/yargs";

export default yargs(process.argv.slice(2))
    .option({
        source: {alias: 'source', type: 'string', choices: ['production', 'development']},
        se: {
                alias:'search',
                type: 'string',
                demandOption: true, 
                choices: ['name', 'id', 'date', 'expires', 'equals', 'lastname', 'province']
            },
        q: {
                alias: 'query', 
                type: 'string', 
                demandOption: true
            },
    })    
    .argv;
