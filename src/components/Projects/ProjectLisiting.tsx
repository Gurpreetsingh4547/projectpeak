import React, { useEffect, useState } from "react";

// Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableLoader from "../common/ContentLoader/TableLoader";
import { toast } from "sonner";

// Services
import { GetProjects } from "@/model/Projects";
import { ArrayHaveValues, IsTrue } from "@/service/helper";

/**
 * React functional component for ProjectListing.
 * @return {JSX.Element} The rendered JSX element
 */
const ProjectLisiting: React.FC = () => {
  const [projectList, setProjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * A function that retrieves a list of projects asynchronously.
   * @return {Promise<void>} This function does not return anything.
   */
  const getListOfProjects = async () => {
    setIsLoading(true);
    try {
      const { data = [] }: any = await GetProjects();

      setProjectList(data);
      console.log(data);
    } catch ({ response = {} }: any) {
      toast("Something went wrong.", {
        description: response?.data?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListOfProjects();
  }, []);

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Ongoing Projects!
          </h2>
          <p className="text-muted-foreground">
            Comprehensive overview of ongoing projects managed by our
            professional team.
          </p>
        </div>
      </div>
      {/* Content Loader */}
      {IsTrue(isLoading, false) && <TableLoader />}

      {!IsTrue(isLoading, false) && (
        <Table>
          <TableCaption>A list of your recent projects.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SR. No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ArrayHaveValues(projectList) &&
              projectList.map((item: any, index: number) => (
                <TableRow key={item?._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>{item?.description}</TableCell>
                  <TableCell className="text-right">Actions</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProjectLisiting;
