import { FC } from "react";

// Packages
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

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
import { HaveValue, IsTrue } from "@/service/helper";
import { addProject, updateProject } from "@/redux/Reducers/Project";

// Hooks
import { useMediaQuery } from "@/hooks/useMedaiQuery";

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
  currentProject?: object | any;
}

const CreateProjectForm: FC<FormInterface> = ({
  setIsVisible,
  className,
  currentProject,
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { isRequesting } = useSelector((state: any) => state.projects);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentProject?.name || "",
      description: currentProject?.description || "",
    },
  });

  /**
   * Handle form submission.
   * @param values - The form values.
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload: any = { ...values, callback: () => setIsVisible(false) };

    if (HaveValue(currentProject?._id)) {
      payload.id = currentProject?._id;
      // Dispatch add project action
      dispatch(updateProject(payload));
      return;
    }

    // Dispatch add project action
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
                <div className="flex items-baseline justify-between">
                  <FormLabel>Description</FormLabel>
                  <Button title="Generate AI Description" className="w-5 h-8">
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                  </Button>
                </div>
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
              {isRequesting ? (
                <DotLoader />
              ) : HaveValue(currentProject?._id) ? (
                "Update"
              ) : (
                "Create"
              )}
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
