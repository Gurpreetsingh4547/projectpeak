// Packages
import {
  faBarsProgress,
  faChartSimple,
  faCirclePlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import { Button } from "@/components/ui/button";

// CSS Classes
import { cn } from "@/lib/utils";

// Props Interface
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Renders the Sidebar component with various options like Dashboard, Overview of Projects, Browse Projects, Create New Project, and Users.
 * @param {SidebarProps} className - the CSS class for styling the sidebar
 * @return {JSX.Element} the rendered Sidebar component
 */
const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("pb-12 max-w-52 border-r h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <FontAwesomeIcon icon={faChartSimple} className="mr-2 h-4 w-4" />
              Overview of Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faBarsProgress} className="mr-2 h-4 w-4" />
              Browse Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faCirclePlus} className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FontAwesomeIcon icon={faUsers} className="mr-2 h-4 w-4" />
              Users
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
