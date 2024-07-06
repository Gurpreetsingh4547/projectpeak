import { useState } from "react";

// Packages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
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
import { ForgetPasswordUser } from "@/model/LoginSignup";

// Form Schema
const formSchema = z.object({
  email: z.string().email(),
});

const ForgetPassword = () => {
  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isRequesting, setIsRequesting] = useState(false);

  /**
   * Handle form submission.
   * @param values - The form values.
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = { ...values };

    setIsRequesting(true);
    try {
      const { message = "" }: any = await ForgetPasswordUser(payload);

      toast("Email sent successfully.", {
        description: message,
      });
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
              Forgot Password
            </CardTitle>
            <CardDescription className="flex justify-center">
              <span className="text-center">
                Enter your email and we will send you a link to reset your
                password.
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
              {isRequesting ? <DotLoader /> : "Verify Email"}
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

export default ForgetPassword;
