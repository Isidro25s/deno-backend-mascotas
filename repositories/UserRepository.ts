// deno-lint-ignore-file no-explicit-any
import { UserModel } from "../models/UserModel.ts";

class UserRepository {

    async getUsers() { 
        return await UserModel.select("id", "account").all();
    }

    async isLogin(account:string, password:string) { 
        const users =  await UserModel.where("account", account).select().all();
        let isAuthenticate =false;

        users.forEach((user: any) => {
            if (user.password === password){
                isAuthenticate= true;
            }
        });
        return  (isAuthenticate);
    } 

}

export default new UserRepository();