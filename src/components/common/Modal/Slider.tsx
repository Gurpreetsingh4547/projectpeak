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

// Interface
interface SliderInterface {
  title?: string;
  content?: ReactNode | string | JSX.Element;
  isVisible?: boolean;
  setIsVisible?: (value: boolean) => void;
}

/**
 * Renders a Slider component.
 * @return {JSX.Element} The rendered Slider component
 */
const Slider: FC<SliderInterface> = ({
  title,
  content,
  isVisible,
  setIsVisible,
}) => {
  return (
    <Sheet open={isVisible} onOpenChange={setIsVisible}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>

        {content}
        <SheetFooter className="absolute bottom-0 left-0 right-0 bg-slate-100 px-6 py-3 flex justify-between">
          <Button>Create</Button>
          <Button
            variant="outline"
            onClick={() => setIsVisible && setIsVisible(false)}
          >
            Cancel
          </Button>
        </SheetFooter>
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
};

// Component Default Propss
Slider.defaultProps = {
  title: "Title",
  content: "Content",
  isVisible: false,
  setIsVisible: () => {},
};

export default Slider;
