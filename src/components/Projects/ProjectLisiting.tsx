import React, { useState } from "react";

// Packages
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableLoader from "../common/ContentLoader/TableLoader";
import DrawerComponent from "../common/Modal/Drawer";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CreateProjectForm from "./CreateProjectForm";

// Services
import { ArrayHaveValues, IsEqual, IsTrue } from "@/service/helper";

// Redux services
import { AppDispatch } from "@/redux/Store";
import { deleteProject, fetchProjects } from "@/redux/Reducers/Project";

/**
 * React functional component for ProjectListing.
 * @return {JSX.Element} The rendered JSX element
 */
const ProjectLisiting: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, isRequesting, pagination } = useSelector(
    (state: any) => state.projects
  );
  const [isDeleteProjectOpen, setIsDeleteProjectOpen] = useState(false);
  const [idToDeleteProject, setIdToDeleteProject] = useState(0);
  const [isUpdateProjectOpen, setIsUpdateProjectOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>({});

  /**
   * Deletes a project from the listing.
   */
  const deleteProjectFromListing = () => {
    const payload = {
      id: idToDeleteProject,
      callback: () => setIsDeleteProjectOpen(false),
    };

    // Dispatch delete project action
    dispatch(deleteProject(payload));
  };

  /**
   * Fetches more projects from the API when the user reaches the end of the
   * listing. If the `refresh` parameter is true, it will fetch the first page
   * again, otherwise it will fetch the next page from the current one.
   * @param {boolean} refresh If true, it will refresh the projects list
   */
  const fetchMoreProjects = (refresh: boolean) => {
    if (IsTrue(refresh, false)) {
      fetchProjects({
        page: 1,
        limit: pagination?.limit,
      });
      return;
    }

    if (IsEqual(pagination?.page, pagination?.total_pages)) return;

    const payload = {
      page: pagination?.page + 1,
      limit: pagination?.limit,
    };

    dispatch(fetchProjects(payload));
  };

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
      {IsTrue(loading, false) && !ArrayHaveValues(items) && <TableLoader />}

      {ArrayHaveValues(items) && (
        <InfiniteScroll
          dataLength={items?.length} //This is important field to render the next data
          next={() => fetchMoreProjects(false)}
          hasMore={!IsEqual(pagination?.page, pagination?.total_pages)}
          loader={<TableLoader />}
          endMessage={
            <p style={{ textAlign: "center", paddingTop: "10px" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={() => fetchMoreProjects(true)}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          <div className="border rounded-md">
            <Table>
              <TableHeader className="bg-slate-100">
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
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                              <FontAwesomeIcon
                                icon={faEllipsis as IconProp}
                                className="h-4 w-4"
                              />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-[160px]"
                          >
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                setIsUpdateProjectOpen(true);
                                setCurrentProject(item);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              Make a copy
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setIsDeleteProjectOpen(true);
                                setIdToDeleteProject(item?._id);
                              }}
                              className="cursor-pointer"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </InfiniteScroll>
      )}

      <DrawerComponent
        triggerContent={<></>}
        content={<></>}
        isVisible={isDeleteProjectOpen}
        setIsVisible={setIsDeleteProjectOpen}
        primaryButton="Confirm"
        secondaryButton="Cancel"
        title="Confirmation"
        isRequesting={isRequesting}
        handlePrimaryAction={deleteProjectFromListing}
        description="You are about to delete this Project. Click confirm to proceed."
      />

      {IsTrue(isUpdateProjectOpen, false) && (
        <DrawerComponent
          triggerContent={<></>}
          content={
            <CreateProjectForm
              currentProject={currentProject}
              setIsVisible={setIsUpdateProjectOpen}
            />
          }
          isVisible={isUpdateProjectOpen}
          setIsVisible={setIsUpdateProjectOpen}
          primaryButton="Update"
          secondaryButton="Cancel"
          title="Update Project Details"
          showFooter={false}
          description="Effortlessly create projects with automated, AI-generated descriptions tailored to your project's title."
        />
      )}
    </div>
  );
};

export default ProjectLisiting;
