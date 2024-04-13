import { FC } from "react";

// Packages
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { SheetFooter } from "../ui/sheet";
import { Button } from "../ui/button";

// Interfaces
interface UserInterface {
  setIsVisible: (value: boolean) => void;
}

// Form Schema
const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email(),
});

/**
 * A functional component that represents a User Form.
 * @return {JSX.Element} The UserForm component
 */
const UserForm: FC<UserInterface> = ({ setIsVisible }) => {
  // Form Schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  /**
   * Handle form submission.
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex flex-row justify-between">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-30 mr-5">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-30">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-30">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-slate-100 px-6 py-3 flex justify-between">
            <Button onClick={form.handleSubmit(onSubmit)}>Create</Button>
            <Button variant="outline" onClick={() => setIsVisible(false)}>
              Cancel
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
