import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

export function generateRandomToken(): string {
  return bcrypt.hashSync(randomBytes(32).toString("hex"), 10);
}
