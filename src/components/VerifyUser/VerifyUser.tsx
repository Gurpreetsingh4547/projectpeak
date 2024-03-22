// Packages
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
import OtpTimer from "../common/OtpTimer";

// Services
import { ResendOtp, VerifyUserWithOtp } from "@/model/LoginSignup";
import LocalStorageUtil from "@/service/localStorage";
import { IsTrue } from "@/service/helper";

/**
 * Verify user with OTP
 * @returns React Node
 */
const VerifyUser = () => {
  // Navigation Hooks
  const navigate = useNavigate();

  const [isRequesting, setIsRequesting] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpTimer, setShowOtpTimer] = useState(true);

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

    setIsRequesting(true);
    try {
      await VerifyUserWithOtp({
        otp: parseInt(otp),
      });
      toast("Verification Successful");

      // Set Login user verified
      LocalStorageUtil.setObject("USER", {
        ...currentLoginUser,
        verified: true,
      });

      navigate("/");
    } catch ({ response = {} }: any) {
      toast("Something went wrong.", {
        description: response?.data?.message,
        action: {
          label: "Retry",
          onClick: handleSubmit,
        },
      });
    } finally {
      setIsRequesting(false);
    }
  };

  /**
   * A function that handles the resend of OTP and sets the showOtpTimer to true.
   */
  const handleResendOtp = async () => {
    setShowOtpTimer(true);

    try {
      const { message }: any = await ResendOtp();

      // Show toast message
      toast(message);
    } catch ({ response = {} }: any) {
      toast("Something went wrong.", {
        description: response?.data?.message,
        action: {
          label: "Retry",
          onClick: handleSubmit,
        },
      });
    }
  };

  useEffect(() => {
    // Check if user is verified
    if (currentLoginUser?.verified) {
      navigate("/");
    }

    // Check if user is logged in
    if (!currentLoginUser?._id) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen justify-center m-2">
      <div className="flex justify-center items-center">
        <Card className="w-[350px]">
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
          <CardFooter className="flex justify-center">
            <Button
              className="min-w-60"
              type="submit"
              onClick={handleSubmit}
              disabled={isRequesting || otp.length < 6}
            >
              {isRequesting ? <DotLoader /> : "Verify"}
            </Button>
          </CardFooter>
          <div className="space-x-2 mb-5 flex items-center justify-center">
            {IsTrue(showOtpTimer, false) ? (
              <>
                <span>OTP sent to your email address.</span>
                <span className="text-sm  text-blue-600">
                  <OtpTimer
                    seconds={120}
                    onTimeout={() => setShowOtpTimer(false)}
                    inMinutes
                  />
                </span>
              </>
            ) : (
              <>
                <span>Didn't you receive the otp?</span>
                <span
                  className="text-sm  text-blue-600 cursor-pointer"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </span>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VerifyUser;
