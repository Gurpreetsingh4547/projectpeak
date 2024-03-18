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

/**
 * Verify user with OTP
 * @returns React Node
 */
const VerifyUser = () => {
  const [isRequesting] = useState(false);

  //   Current Login User
  const currentLoginUser = LocalStorageUtil.getObject("USER");

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
                <span className="text-black"> {currentLoginUser?.email}</span>
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4 flex justify-center">
              Type 6 digit security code
            </p>
            <InputOTP
              maxLength={6}
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
              //   onClick={form.handleSubmit(onSubmit)}
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
