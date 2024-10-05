// Components
import CardComponent from "../common/Card";
import ProjectStatusPie from "../Charts/ProjectStatusPie";
import ProjectStatusCompleteYearly from "../Charts/CompletedProjectsChart";
import CardSkeleton from "../common/ContentLoader/CardLoader";
import PieChartSkeleton from "../common/ContentLoader/PieChartLoader";
import { useEffect, useState } from "react";
import { GetProjectStatus } from "@/model/Projects";
import { toast } from "sonner";
import { ArrayHaveValues } from "@/service/helper";

/**
 * Renders the Dashboard component.
 * @return {JSX.Element} The CardComponent to be rendered.
 */
const Dashboard = () => {
  const [projectsYearlyData, setProjectsYearlyData] = useState([]);
  const [listOfEveryStatusProject, setListOfEveryStatusProject] = useState({
    pending: 0,
    inProgress: 0,
    blocked: 0,
    completed: 0,
    totalTask: 0,
  });

  /**
   * Get Counts function
   * @param data Array
   * @param key String
   * @returns Count
   */
  const GetCounts = (data: Array<any> = [], key: string = "pending") => {
    let count = 0;
    data.forEach((item) => {
      count += item[key];
    });
    return count;
  };

  /**
   * Get Project Status
   * @returns Promise
   */
  const getProjectStatusDetails = async () => {
    try {
      const { data = [] }: any = await GetProjectStatus();
      setProjectsYearlyData(data);

      const totalsCounts = {
        pending: GetCounts(data, "Pending"),
        inProgress: GetCounts(data, "In Progress"),
        blocked: GetCounts(data, "Block"),
        completed: GetCounts(data, "Complete"),
      };
      setListOfEveryStatusProject({
        ...totalsCounts,
        totalTask:
          totalsCounts?.pending +
          totalsCounts?.inProgress +
          totalsCounts?.blocked +
          totalsCounts?.completed,
      });
    } catch ({ response = {} }: any) {
      toast("Something went wrong.", {
        description: response?.data?.message,
      });
    }
  };

  useEffect(() => {
    getProjectStatusDetails();
  }, []);

  return (
    <>
      {!ArrayHaveValues(projectsYearlyData) && (
        <>
          <div className="flex flex-wrap justify-around pb-10">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>

          <div className="pb-10">
            <PieChartSkeleton />
          </div>
        </>
      )}

      {ArrayHaveValues(projectsYearlyData) && (
        <>
          <div className="flex flex-wrap justify-around">
            <CardComponent
              title="Total Task Pending"
              taskDone={listOfEveryStatusProject?.pending}
              type="Pending"
              totalTask={listOfEveryStatusProject?.totalTask}
            />
            <CardComponent
              title="Total Task In Progress"
              taskDone={listOfEveryStatusProject?.inProgress}
              type="In Progress"
              totalTask={listOfEveryStatusProject?.totalTask}
            />
            <CardComponent
              title="Total Task Blocked"
              taskDone={listOfEveryStatusProject?.blocked}
              type="Blocked"
              totalTask={listOfEveryStatusProject?.totalTask}
            />
            <CardComponent
              title="Total Task Completed"
              taskDone={listOfEveryStatusProject.completed}
              type="Completed"
              totalTask={listOfEveryStatusProject?.totalTask}
            />
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-2/3 flex-shrink-0">
              <ProjectStatusCompleteYearly list={projectsYearlyData} />
            </div>
            <div className="w-1/3 flex-shrink-0">
              <ProjectStatusPie status={listOfEveryStatusProject} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
