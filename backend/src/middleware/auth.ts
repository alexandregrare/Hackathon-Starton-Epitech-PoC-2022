import { Response, Request, NextFunction } from 'express';
import * as dotenv from 'dotenv'

dotenv.config()
const { API_KEY_SECRET } = process.env;

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const apiKey = req.header('x-api-key');
        if (apiKey == null)
            throw 'ApiKey is missing';
        if (API_KEY_SECRET == undefined)
            throw 'ApiKey not set, contact server admin.'
        if (apiKey != API_KEY_SECRET)
            throw 'Bad ApiKey'
        next()
    } catch (error) {
        res.status(401).json(error);
    }
};

export default auth;