import { FC, ReactNode } from "react";

// Packages
import { bool, func, node, oneOfType, string } from "prop-types";

// Components
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// Services
import { IsTrue } from "@/service/helper";

// Interface
interface SliderInterface {
  title?: string;
  content?: ReactNode | string | JSX.Element;
  isVisible?: boolean;
  setIsVisible?: (value: boolean) => void;
  handlePrimaryAction?: () => void;
  showFooter?: boolean;
}

/**
 * Renders a Slider component.
 * @return {JSX.Element} The rendered Slider component
 */
const Slider: FC<SliderInterface> = ({
  title = "Title",
  content = "Content",
  isVisible = false,
  setIsVisible = () => {},
  handlePrimaryAction = () => {},
  showFooter = false,
}) => {
  return (
    <Sheet open={isVisible} onOpenChange={setIsVisible}>
      <SheetContent>
        <SheetHeader className="absolute top-2 left-4 right-0">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>

        <div className="pt-6">{content}</div>

        {/* Footer */}
        {IsTrue(showFooter, false) && (
          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-slate-100 px-6 py-3 flex justify-between">
            <Button onClick={handlePrimaryAction}>Create</Button>
            <Button
              variant="outline"
              onClick={() => setIsVisible && setIsVisible(false)}
            >
              Cancel
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

// Component Prop Types
Slider.propTypes = {
  title: string,
  content: oneOfType([node, string]),
  isVisible: bool,
  setIsVisible: func,
  handlePrimaryAction: func,
  showFooter: bool,
};

export default Slider;
