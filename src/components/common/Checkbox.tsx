import React from "react";

// Packages
import { bool, func, string } from "prop-types";
import { Checkbox } from "@/components/ui/checkbox";

interface MyComponentProps {
  label?: string;
  value?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

const CheckboxWithLabel: React.FC<MyComponentProps> = ({
  value,
  onChange,
  disabled,
  label,
  ...props
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms2"
        disabled={disabled}
        checked={value}
        onChange={onChange}
        {...props}
      />
      <label
        htmlFor="terms2"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxWithLabel;

/**
 * Components Prop Types
 */
CheckboxWithLabel.propTypes = {
  value: bool,
  onChange: func,
  disabled: bool,
  label: string,
};

/**
 * Component Default Props
 */
CheckboxWithLabel.defaultProps = {
  value: true,
  onChange: () => {},
  disabled: false,
  label: "Accept terms and conditions",
};
