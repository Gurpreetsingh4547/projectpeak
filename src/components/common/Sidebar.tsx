import { useState } from "react";

// Packages
import {
  faBarsProgress,
  faChartSimple,
  faCirclePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// Components
import { Button } from "@/components/ui/button";
import DrawerComponent from "./Modal/Drawer";
import CreateProjectForm from "../Projects/CreateProjectForm";

// Services
import { IsEqual } from "@/service/helper";

// CSS Classes
import { cn } from "@/lib/utils";

// Props Interface
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleSidebar: () => void;
}

/**
 * Renders the Sidebar component with various options like Dashboard, Overview of Projects, Browse Projects, Create New Project, and Users.
 * @param {SidebarProps} className - the CSS class for styling the sidebar
 * @return {JSX.Element} the rendered Sidebar component
 */
const Sidebar = ({ className, toggleSidebar }: SidebarProps) => {
  const { pathname } = useLocation();
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  // Check if the current path is active
  const isActive = (path: string) => IsEqual(pathname, path);

  return (
    <div className={cn("pb-12 max-w-52 border-r h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <Link to="/">
              <Button
                variant={!isActive("/") ? "ghost" : "secondary"}
                className="w-full justify-start my-1"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon
                  icon={faChartSimple as IconProp}
                  className="mr-2 h-4 w-4"
                />
                Overview of Projects
              </Button>
            </Link>
            <Link to="/projects">
              <Button
                variant={!isActive("/projects") ? "ghost" : "secondary"}
                className="w-full justify-start my-1"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon
                  icon={faBarsProgress as IconProp}
                  className="mr-2 h-4 w-4"
                />
                Browse Projects
              </Button>
            </Link>
            <DrawerComponent
              triggerContent={
                <Button
                  variant="ghost"
                  className="w-full justify-start my-1"
                  onClick={toggleSidebar}
                >
                  <FontAwesomeIcon
                    icon={faCirclePlus as IconProp}
                    className="mr-2 h-4 w-4"
                  />
                  Create New Project
                </Button>
              }
              content={
                <CreateProjectForm setIsVisible={setIsCreateProjectOpen} />
              }
              isVisible={isCreateProjectOpen}
              setIsVisible={setIsCreateProjectOpen}
              primaryButton="Create"
              secondaryButton="Cancel"
              title="Create New Project"
              showFooter={false}
              description="Effortlessly create projects with automated, AI-generated descriptions tailored to your project's title."
            />
            <Link to="/profile">
              <Button
                variant={!isActive("/profile") ? "ghost" : "secondary"}
                className="w-full justify-start my-1"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon
                  icon={faUser as IconProp}
                  className="mr-2 h-4 w-4"
                />
                User Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
