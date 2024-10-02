import React from "react";

// Packages
import { Link, useNavigate } from "react-router-dom";
import { faChevronDown, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// Componenets
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// CSS Classes
import { cn } from "@/lib/utils";

// Assests
import LOGO from "@/assets/logo.png";
import { toast } from "sonner";
import { LogoutUser } from "@/model/LoginSignup";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

/**
 * Renders a navigation bar with a menu that displays a list of links.
 * @return {JSX.Element} The rendered navigation bar.
 */
const NavigationBar = () => {
  const navigate = useNavigate();

  /**
   * Logs out the user and redirects them to the login page.
   * @return {Promise<void>}
   */
  const logout = async () => {
    try {
      await LogoutUser();
      toast("Logout Successful");

      // Set Login user verified
      localStorage.clear();
      navigate("/login");
    } catch ({ response = {} }: any) {
      toast("Something went wrong.", {
        description: response?.data?.message,
      });
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex justify-center items-center">
          <Link to="/">
            <img src={LOGO} alt="Project Peak" className="w-14 object-cover" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <span className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                          <img
                            src={LOGO}
                            alt="Project Peak"
                            className="w-14 object-cover"
                          />
                          <div className="mb-2 mt-4 text-xs font-medium">
                            Project Management Platform
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Revolutionize project management with our platform
                            that streamlines processes, enhances
                            decision-making, and optimizes project outcomes.
                          </p>
                        </span>
                      </NavigationMenuLink>
                    </li>
                    <ListItem title="Intelligent Task Assignment:">
                      Analyzes project requirements, By considering factors such
                      as expertise, availability, and priority, it ensures
                      efficient task allocation.
                    </ListItem>
                    <ListItem title="Predictive Resource Management">
                      Through machine learning algorithms, AI-PMP forecasts
                      resource needs based on project timelines, historical
                      data, and current workload. This enables proactive
                      resource allocation, preventing bottlenecks and optimizing
                      productivity.
                    </ListItem>
                    <ListItem title="Real-time Performance Analytics">
                      Offers comprehensive analytics dashboards that provide
                      real-time insights into project performance, team
                      productivity, and resource utilization. These insights
                      enable stakeholders to make data-driven decisions and
                      adapt strategies for project success.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Recent Projects</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="h-8 p-2 rounded-md border-transparent border-0 bg-transparent">
              <span className="flex space-x-1">
                <FontAwesomeIcon icon={faUserGear as IconProp} />
                <FontAwesomeIcon icon={faChevronDown as IconProp} />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;

// List Item Component
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
