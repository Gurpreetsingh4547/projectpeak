// Packages
import { useState } from "react";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LOGO from "../../assets/logo.png";
import { Button } from "../ui/button";
import DotLoader from "../common/Loader";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import LocalStorageUtil from "@/service/localStorage";
import { VerifyUserWithOtp } from "@/model/LoginSignup";
import { toast } from "sonner";

/**
 * Verify user with OTP
 * @returns React Node
 */
const VerifyUser = () => {
  const [isRequesting] = useState(false);
  const [otp, setOtp] = useState("");

  // Current Login User
  const currentLoginUser = LocalStorageUtil.getObject("USER");

  /**
   * Handle OTP change
   * @param value The new OTP value
   */
  const handleOtpChange = (value: string) => {
    // Set the new OTP value
    setOtp(value);
  };

  /**
   * Function for handling the otp submission.
   * @return {Promise<void>} A promise that resolves when the form submission is handled.
   */
  const handleSubmit = async () => {
    if (otp.length < 6) {
      toast("Something went wrong.", {
        description: "Please enter a valid OTP",
      });
      return;
    }

    try {
      const data = await VerifyUserWithOtp({ otp: otp });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen justify-center m-2">
      <div className="flex justify-center items-center">
        <Card className="w-[400px]">
          <div className="flex justify-center items-center">
            <img src={LOGO} alt="Project Peak" className="w-24 object-cover" />
          </div>
          <CardHeader>
            <CardTitle className="flex justify-center">
              OTP Verification
            </CardTitle>
            <CardDescription className="flex justify-center">
              <span>
                Enter the verification code we sent to
                <span className="text-black flex justify-center">
                  {currentLoginUser?.email}
                </span>
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4 flex justify-center">
              Type 6 digit security code
            </p>
            <InputOTP
              maxLength={6}
              onChange={(value) => handleOtpChange(value)}
              className="flex justify-center"
              render={({ slots }) => (
                <>
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} />
                    ))}
                  </InputOTPGroup>
                </>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              onClick={handleSubmit}
              disabled={isRequesting}
            >
              {isRequesting ? <DotLoader /> : "Verify"}
            </Button>
          </CardFooter>
          <div className="pl-5 space-x-2 mb-5">
            <span>Didn't you receive the otp?</span>
            <span className="text-sm  text-blue-600 cursor-pointer">
              Resend OTP
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VerifyUser;
