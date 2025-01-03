import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { Config } from '../config/index.js';

const generateTokenAndSetCookie = (userId, res) => {
    // Create the JWT token
    const token = jwt.sign({ userId }, Config.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

    // Set the token in a cookie
    res.setHeader('Set-Cookie', cookie.serialize('jwt-token', token, {
        httpOnly: true,         // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Set cookie as Secure in production (requires HTTPS)
        maxAge: 24 * 60 * 60,   // 1 day expiration time
        path: '/',              // Available for the entire app
        sameSite: 'none'
    }));
};

export { generateTokenAndSetCookie };
