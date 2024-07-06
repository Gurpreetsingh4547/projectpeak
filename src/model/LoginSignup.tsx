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

/**
 * Verify user with OTP
 * @param otp The OTP
 * @returns User details
 */
export const VerifyUserWithOtp = async (otp: object) => {
  return await httpService.post("/verify", otp);
};

/**
 * Resend OTP to user email
 */
export const ResendOtp = async () => {
  return await httpService.post("/resend/otp", {});
};

/**
 * Sends a POST request to the "/forget/password" endpoint to reset the user's password.
 * @param {any} payload - The payload containing the necessary data for resetting the password.
 * @return {Promise<any>} A Promise that resolves with the response data from the server.
 */
export const ForgetPasswordUser = async (payload: any) => {
  return await httpService.post("/forget/password", payload);
};
