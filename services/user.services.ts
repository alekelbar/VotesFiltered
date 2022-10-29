// funciones para obtener ciertos datos...

import dayjs from "dayjs";
import { userVote } from "../models/userVote"

export const searchByID = (arr: userVote[], target: string): Array<any> => {
    return arr.filter(e => e.ID === target.toUpperCase());
}

export const searchByName = (arr: userVote[], target: string): Array<any> => {
    return arr.filter(e => e.name.includes(target.toUpperCase()));
}

export const searchByLastName = (arr: userVote[], target: string): Array<any> => {
    return arr.filter(e => e.pName.includes(target.toUpperCase()));
}

export const searchByDate = (arr: userVote[], target: string): Array<any> => {
    return arr.filter(e => dayjs(e.date) === dayjs(target));
}

export const searchByEqualNames = (arr: userVote[], target: string): Array<any> => {
    let count: number = 0;
    arr.map((e) => {
        if ((`${e.name} ${e.pName} ${e.mName}`) === target.toUpperCase()) count++;
    });
    return [count.toString()];
}

export const expiresDate = (arr: userVote[], targetID: string): Array<any> => {
    const user = arr.find(e => e.ID === targetID);
    if (!user)
        return [''];
    return (dayjs().add(1, 'M') >= dayjs(user.date)) ? ['Cercano a expirar'] : ['Lejano a expirar'];
}

