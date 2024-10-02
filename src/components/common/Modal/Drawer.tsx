import { FC, ReactNode } from "react";

// Packages
import { bool, func, node, oneOfType, string } from "prop-types";

// Components
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Hooks
import { useMediaQuery } from "@/hooks/useMedaiQuery";

// Services
import { IsTrue } from "@/service/helper";
import DotLoader from "../Loader";

// Component Interface
interface DrawerInterface {
  triggerContent?: ReactNode | string;
  title?: ReactNode | string;
  description?: ReactNode | string;
  content?: ReactNode | string;
  primaryButton?: ReactNode | string;
  secondaryButton?: ReactNode | string;
  isVisible?: boolean;
  setIsVisible?: (value: boolean) => void;
  showFooter?: boolean;
  handlePrimaryAction?: () => void;
  isRequesting?: boolean;
}

/**
 * Renders a Drawer component with the provided trigger content.
 * @param {DrawerInterface} triggerContent - The content to be used as the trigger for the drawer.
 * @return {ReactElement} The rendered Drawer component.
 */
const DrawerComponent: FC<DrawerInterface> = ({
  triggerContent = "open",
  title = "Title",
  description = "Description",
  content = "Content",
  primaryButton = "Primary Button",
  secondaryButton = "Secondary Button",
  isVisible = false,
  setIsVisible = () => {},
  showFooter = false,
  handlePrimaryAction = () => {},
  isRequesting = false,
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (IsTrue(isDesktop, false)) {
    return (
      <Dialog open={isVisible} onOpenChange={setIsVisible}>
        <DialogTrigger asChild>{triggerContent}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {content}
          {IsTrue(showFooter, false) && (
            <DialogFooter>
              <Button onClick={handlePrimaryAction} disabled={isRequesting}>
                {IsTrue(isRequesting, false) ? <DotLoader /> : primaryButton}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsVisible && setIsVisible(false)}
              >
                {secondaryButton}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isVisible} onOpenChange={setIsVisible}>
      <DrawerTrigger asChild>{triggerContent}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {content}
        {IsTrue(showFooter, false) && (
          <DrawerFooter>
            <Button onClick={handlePrimaryAction} disabled={isRequesting}>
              {IsTrue(isRequesting, false) ? <DotLoader /> : primaryButton}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsVisible && setIsVisible(false)}
            >
              {secondaryButton}
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

// Component Prop Types
DrawerComponent.propTypes = {
  triggerContent: oneOfType([node, string]),
  title: oneOfType([node, string]),
  description: oneOfType([node, string]),
  content: oneOfType([node, string]),
  primaryButton: oneOfType([node, string]),
  secondaryButton: oneOfType([node, string]),
  isVisible: bool,
  setIsVisible: func,
  showFooter: bool,
  handlePrimaryAction: func,
  isRequesting: bool,
};

export default DrawerComponent;
