import jwt from "jsonwebtoken";

//function to generate the jwt token
export const jwtSign = async (payload) => {
     try {
          const token = await jwt.sign(payload, process.env.JWT_SECRET);
          return token;
     } catch (e) {
          console.error("Error signing JWT:", e);
          throw new Error("Failed to sign JWT");
     }
}

//function to verify the jwt token
export const jwtVerify = async (token) => {
     try {
          const data = await jwt.verify(token, process.env.JWT_SECRET);
          return data;
     } catch (e) {
          console.error("Error verifying JWT:", e);
          throw new Error("Invalid or expired token");
     }
}