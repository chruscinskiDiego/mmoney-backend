import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

export const verifyAuth = (req: Request, res: any, next: NextFunction) => {

    const authToken = req.headers.authorization;

    const jwt_secret:any = process.env.JWT_SECRET;

    if (authToken) {

        const [, token] = authToken.split(' ');

        try {

            jwt.verify(token, jwt_secret) as jwt.JwtPayload;

            return next();
        }
        catch (error) {
            console.error('Erro ao verificar token:', error);
            return res.status(401).json({ message: 'Unauthorized' });
        }

    } else{
        return res.status(401).json({ message: 'Authorization token missing' });
    }

}