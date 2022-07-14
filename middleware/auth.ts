// deno-lint-ignore-file no-explicit-any
import { Context } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { Status } from "https://deno.land/std@0.144.0/http/http_status.ts";
import { verify as jwtVerify } from "https://deno.land/x/djwt@v2.7/mod.ts";   

import { key } from "./jwt/jwt.ts";

const authMiddleware = async (ctx: Context, next: any) => {
    const headers: Headers = ctx.request.headers;
    const authorization = headers.get("Authorization");

    if (authorization){
        const jwt = authorization.split(" ")[1];
        if (jwt){
            if (await jwtVerify(jwt, key)) {
                await next();
            } else {
                ctx.response.status = Status.Unauthorized;
                ctx.response.body = { 
                    success: false,
                    message: "Invalid jwt token",
                    data: [],
                 };
            }   
        } else {
            ctx.response.status = Status.Unauthorized;
            ctx.response.body = { 
                success:  false, 
                message: "JWT is necessary",
                data: []
            };
        }      
    } else {
        ctx.response.status = Status.Unauthorized;
        ctx.response.body = { 
            success: false, 
            message: "Header Authorization not present",
            data: [], 
        };
    }    
};

export { authMiddleware };
