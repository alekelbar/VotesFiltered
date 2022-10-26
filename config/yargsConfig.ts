import  yargs  from "yargs/yargs";

export default yargs(process.argv.slice(2))
    .option({
        s: {alias: 'source'}
    })
    .argv;
