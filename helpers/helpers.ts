// funciones para obtener ciertos datos...

const startUp = () => {

    const filterByPatterns = (pattern: string) => {
        return peopleCsv.filter(e => e.name.includes(pattern.toUpperCase()));
    }

    filterByPatterns('Alexander').map(e => searchResult.push(e));
    peopleCsv.length = 0;
    count = 0;
}

