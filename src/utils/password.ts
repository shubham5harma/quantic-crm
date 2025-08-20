import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (plain: string): Promise<string> =>
  bcrypt.hash(plain, SALT_ROUNDS);

export const comparePassword = async (
  plain: string,
  hash: string
): Promise<boolean> => bcrypt.compare(plain, hash);

export const isStrongPassword = (password: string): boolean => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return re.test(password);
};
