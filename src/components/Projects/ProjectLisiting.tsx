import React from "react";

// Packages
import { useSelector } from "react-redux";

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

// Services
import { ArrayHaveValues, IsTrue } from "@/service/helper";

/**
 * React functional component for ProjectListing.
 * @return {JSX.Element} The rendered JSX element
 */
const ProjectLisiting: React.FC = () => {
  const { items, loading } = useSelector((state: any) => state.projects);

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
      {IsTrue(loading, false) && <TableLoader />}

      {!IsTrue(loading, false) && (
        <Table>
          <TableCaption>A list of your recent projects.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[5rem]">SR. No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ArrayHaveValues(items) &&
              items.map((item: any, index: number) => (
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
