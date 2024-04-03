// Packages
import {
  faBarsProgress,
  faChartSimple,
  faCirclePlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

// Components
import { Button } from "@/components/ui/button";

// CSS Classes
import { cn } from "@/lib/utils";
import { IsEqual } from "@/service/helper";

// Props Interface
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Renders the Sidebar component with various options like Dashboard, Overview of Projects, Browse Projects, Create New Project, and Users.
 * @param {SidebarProps} className - the CSS class for styling the sidebar
 * @return {JSX.Element} the rendered Sidebar component
 */
const Sidebar = ({ className }: SidebarProps) => {
  const { pathname } = useLocation();

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
            <Button
              variant={!isActive("/") ? "ghost" : "secondary"}
              className="w-full justify-start"
            >
              <Link to="/">
                <FontAwesomeIcon
                  icon={faChartSimple}
                  className="mr-2 h-4 w-4"
                />
                Overview of Projects
              </Link>
            </Button>
            <Button
              variant={!isActive("/projects") ? "ghost" : "secondary"}
              className="w-full justify-start"
            >
              <Link to="/projects">
                <FontAwesomeIcon
                  icon={faBarsProgress}
                  className="mr-2 h-4 w-4"
                />
                Browse Projects
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faCirclePlus} className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
            <Button
              variant={!isActive("/users") ? "ghost" : "secondary"}
              className="w-full justify-start"
            >
              <Link to="/users">
                <FontAwesomeIcon icon={faUsers} className="mr-2 h-4 w-4" />
                Users
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
