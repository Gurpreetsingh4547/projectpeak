import httpService from "@/service/http";

/**
 * Signup model
 */
interface Signup {
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  password: string;
}

/**
 * Login model
 */
interface Login {
  email: string;
  password: string;
}

/**
 * Sign up a new user
 * @param payload The sign up payload
 * @returns The user created
 */
export const SignupUser = async (payload: Signup) => {
  return await httpService.post("/signup", payload);
};

/**
 * Login user
 * @param payload The Login payload
 * @returns User details
 */
export const LoginUser = async (payload: Login) => {
  return await httpService.post("/login", payload);
};
