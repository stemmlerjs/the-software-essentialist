import { auth } from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import { Config } from '@dddforum/config';

export function createJwtCheck(config: Config) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await auth().verifyIdToken(token);
      (req as any).user = decodedToken;

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}
