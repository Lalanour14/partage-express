import { object } from "joi";

export interface Object {
    _id?:any;
    label:string;
    descriptiion:string;
    photo:[string];
    user:User;
}


export interface User{
    _id?:any;
    name:string;
    firstName:string;
    address:string;

}

export interface Location {
    _id?:any;
    startLoc:Date;
    endLoc:Date;
    reserObject:string;
    stausObject:string;
    object:Object;
    user:User;
}

