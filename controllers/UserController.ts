// deno-lint-ignore-file no-explicit-any
import { Status } from "https://deno.land/std@0.140.0/http/http_status.ts";
import { create as jwtCreate } from "https://deno.land/x/djwt@v2.7/mod.ts";   
import { header, payload, key } from "../middleware/jwt/jwt.ts";
import userService  from "../services/UserService.ts";

export const getUsers = async ({ response }: { response: any }) => {
    const users = await userService.fetchUsers();

    response.body = {
        success: true,
        message: "list users", 
        data: users
    }
}

export const loginUser = async (
    {request, response}: { request: any; response: any },
) => {

    console.log(request.body())

    if (request.body()){
        
        const data = await request.body().value;
        
        const isLoginUser = await userService.isLoginUser(
            data.account, data.password);
        
        if (isLoginUser){
            response.status = Status.OK;
            const jwt = await jwtCreate(header, payload(data.account), key);
    
    
            response.body = {
                success: true,
                message: "Authenticate successfull", 
                data: jwt,
            }
            return;
        } 
        response.status = Status.UnprocessableEntity;
        response.body = {
            success: false,
            message:"Invalid username or password!",
            data: "", 
        };
        return;
    }

    response.status = Status.BadRequest;
    response.body = {
        success: false,
        message: "The request must have a body",
        data: "", 
    };
};