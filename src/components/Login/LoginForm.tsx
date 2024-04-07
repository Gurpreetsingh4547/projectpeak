import { useEffect, useState } from "react";

// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

// Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CheckboxWithLabel from "../common/Checkbox";
import LOGO from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "@/model/LoginSignup";
import DotLoader from "../common/Loader";
import LocalStorageUtil from "@/service/localStorage";

// Form Schema
const formSchema = z.object({
  email: z.string().email(),
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

/**
 * Login Form Component.
 */
const LoginForm = () => {
  const navigate = useNavigate();

  // Current Login User
  const currentLoginUser = LocalStorageUtil.getObject("USER");
  const [showPassword, setShowPassword] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handle form submission.
   * @param values - The form values.
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = { ...values };

    setIsRequesting(true);
    try {
      const { message = "", data = {} }: any = await LoginUser(payload);

      // Set User details in localStorage
      LocalStorageUtil.setObject("USER", data);

      toast("Welcome back", {
        description: message,
      });

      // Check User verified or not
      if (!data.verified) {
        navigate("/verify");
        return;
      }
      navigate("/");
    } catch ({ response = {} }: any) {
      toast("Something went wrong.", {
        description: response?.data?.message,
        action: {
          label: "Retry",
          onClick: () => onSubmit(values),
        },
      });
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    if (currentLoginUser?._id && currentLoginUser?.verified) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen justify-center m-5">
      <div className="flex justify-center items-center">
        <Card className="w-[450px] ">
          <div className="flex justify-center items-center">
            <img src={LOGO} alt="Project Peak" className="w-24 object-cover" />
          </div>
          <CardHeader>
            <CardTitle className="uppercase">Login</CardTitle>
            <CardDescription>Welcome Back to Project Peak.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                              icon={showPassword ? faEye : faEyeSlash}
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
            <div className="flex justify-between space-x-2 mt-5">
              <CheckboxWithLabel label="Remember me" value={true} />
              <a href="" className="text-sm">
                Forget Password?
              </a>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isRequesting}
            >
              {isRequesting ? <DotLoader /> : "Login"}
            </Button>
          </CardFooter>
          <div className="pl-5 space-x-2 mb-5">
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-sm  text-blue-600">
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
