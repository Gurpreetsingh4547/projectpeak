import { useState } from "react";

// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import DotLoader from "../common/Loader";

// Services
import { ChangeUserPassword } from "@/model/LoginSignup";

// Form Schema
const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password cannot exceed 100 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

const ChangePassword = () => {
  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
  const { token } = useParams();
  const navigate = useNavigate();

  const [isRequesting, setIsRequesting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Handle form submission.
   * @param values - The form values.
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = { ...values, token };

    setIsRequesting(true);
    try {
      const { message = "" }: any = await ChangeUserPassword(payload);

      toast("Password changed successfully.", {
        description: message,
      });

      navigate("/login");
    } catch ({ response = {} }: any) {
      toast("Something went wrong.", {
        description: response?.data?.message,
      });
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen justify-center m-2">
      <div className="flex justify-center items-center">
        <Card className="w-[350px]">
          <div className="flex justify-center items-center">
            <img src={LOGO} alt="Project Peak" className="w-24 object-cover" />
          </div>
          <CardHeader>
            <CardTitle className="flex justify-center">
              Change Password
            </CardTitle>
            <CardDescription className="flex justify-center">
              <span className="text-center">
                Enter your new password below to change it.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            {...field}
                          />
                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 right-3 flex items-center justify-center w-5 h-5 text-gray-400 rounded-full"
                          >
                            <FontAwesomeIcon
                              icon={
                                showPassword
                                  ? (faEye as IconProp)
                                  : (faEyeSlash as IconProp)
                              }
                            />
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col justify-center">
            <Button
              className="min-w-60"
              type="submit"
              disabled={isRequesting}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isRequesting ? <DotLoader /> : "Change Password"}
            </Button>
            <Link to="/login" className="flex justify-center mt-5">
              <Button className="align-middle border-none" variant="outline">
                <FontAwesomeIcon
                  icon={faArrowLeft as IconProp}
                  className="mr-2"
                />{" "}
                Back to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChangePassword;
