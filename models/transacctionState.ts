import { userVote } from "./userVote";

interface transacctionState  {
    peopleCsv: userVote[],
    resultSet: userVote[],
}

export default {
    peopleCsv: [],
    resultSet: []
} as transacctionState