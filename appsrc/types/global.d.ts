

export type UserRegisterData = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmpassword: string;
}

export type UserLoginData = {
    email: string;
    password: string;
}


declare global {
    namespace Express {
        export interface Request {
            jwtaccess?: string | jwt.JwtPayload | undefined
            jwtrefresh?: string | jwt.JwtPayload | undefined
        }
    }
}