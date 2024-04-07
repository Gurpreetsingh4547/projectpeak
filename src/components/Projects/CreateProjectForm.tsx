import { FC } from "react";

// Packages
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/Store";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import DotLoader from "../common/Loader";

// Services
import { IsTrue } from "@/service/helper";

// Hooks
import { useMediaQuery } from "@/hooks/useMedaiQuery";
import { addProject } from "@/redux/Reducers/Project";

// Form Schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(500, { message: "Description cannot exceed 100 characters" }),
});

// Form Interface
interface FormInterface {
  setIsVisible: (value: boolean) => void;
  className?: string;
}

const CreateProjectForm: FC<FormInterface> = ({ setIsVisible, className }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { isRequesting } = useSelector((state: any) => state.projects);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  /**
   * Handle form submission.
   * @param values - The form values.
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = { ...values };
    dispatch(addProject(payload));
  };

  return (
    <div className={`${className} ${IsTrue(isDesktop, false) ? "" : "p-4"}`}>
      <Form {...form}>
        <form
          className="space-y-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`${
              IsTrue(isDesktop, false)
                ? "justify-end space-x-2"
                : " flex-col space-y-2"
            } flex pt-2`}
          >
            <Button
              disabled={isRequesting}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isRequesting ? <DotLoader /> : "Create"}
            </Button>
            <Button
              variant="outline"
              disabled={isRequesting}
              onClick={() => setIsVisible && setIsVisible(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
