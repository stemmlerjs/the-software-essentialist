// import { DecodedIdToken } from 'firebase-admin/auth';
import { Types } from '@dddforum/api/users'

declare global {
  namespace Express {
    interface Request {
      user: Types.DecodedIdToken;
    }
  }
}

export {}; 