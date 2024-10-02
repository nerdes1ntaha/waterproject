// import md5 from "md5";
import { validationResult, ValidationError } from "express-validator";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import dns from "dns";
import os from "os";
import { Request } from "express";
import bcrypt from 'bcrypt';

async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export const handleValidation = (req: Request) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return {
      message: "Geçersiz veri",
      success: false,
      error: true,
      validationErrors: validationErrors.array(),
      timestamp: Date.now(),
    };
  }
  return null;
};

export const createToken = (
  userId: string,
  userName: string,
  email: string
): string => {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in environment variables");
  }

  const token = jsonwebtoken.sign(
    { userId, userName, email },
    process.env.SECRET_KEY as string,
    { expiresIn: "1h", issuer: "localhost" }
  );
  return token;
};

export const verifyToken = (
  token: string
): { decodeToken: JwtPayload | null } => {
  const isVerify = { decodeToken: null as JwtPayload | null };
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in environment variables");
  }

  try {
    isVerify.decodeToken = jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JwtPayload;
  } catch (error: any) {
    console.log("Token verify hatası:", error.message);
  }
  return isVerify;
};

export const getHost = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    dns.lookup(os.hostname(), (err, ip) => {
      if (err || !ip) {
        reject(new Error("IP address not found."));
      } else {
        const port = process.env.PORT || 3000;
        resolve(`http://${ip}:${port}`);
      }
    });
  });
};

