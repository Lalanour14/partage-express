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

