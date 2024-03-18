/**
 * The UserVerification function checks if the user is verified,
 * and returns a function that handles redirection if not verified.
 */
const UserVerification = (verified = false) => {
  /**
   * Determines if the user is verified or not
   */
  const isVerified = verified;

  /**
   * Returns a function that handles redirection if the user is not verified.
   */
  if (!isVerified) {
    return window.location.replace("/verify");
  }

  return isVerified;
};

export default UserVerification;
