import httpService from "@/service/http";

interface Signup {
  first_name: string;
  last_name: string;
  full_name: string;
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
