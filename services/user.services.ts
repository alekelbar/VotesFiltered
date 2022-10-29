// funciones para obtener ciertos datos...

import dayjs from "dayjs";
import { Province } from "../controller/data.controller";
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

export const searchByEqualNames = (arr: userVote[], target: string): number => {
    return arr.filter(e => {
        return `${e.name} ${e.pName} ${e.mName}` === target.toUpperCase();
    }).length;
}

export const searchByProvince = (arr: userVote[], arrp: Province[], target: string) => {
    const user = arr.find(e => e.ID === target);
    if (!user)
    return [''];
    console.log(arrp);
    return [arrp.find(e => e.ID === user.code)];
}


export const expiresDate = (arr: userVote[], targetID: string): Array<any> => {
    const user = arr.find(e => e.ID === targetID);
    if (!user)
        return [''];
    return (dayjs().add(1, 'M') >= dayjs(user.date)) ? ['Cercano a expirar'] : ['Lejano a expirar'];
}

