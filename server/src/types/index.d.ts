import { TokenPayload } from "./Auth";

declare global {
  // Extends the Express Request interface to include the properties
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};