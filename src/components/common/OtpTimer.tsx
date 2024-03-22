import { useState, useEffect } from "react";

// Packages
import { bool, func, number } from "prop-types";

// Services
import { IsEqual, IsFunction, IsTrue } from "@/service/helper";

// Component interface
interface OtpTimerProps {
  seconds?: number;
  onTimeout?: () => void;
  inMinutes?: boolean;
}

/**
 * OTP Timer
 * @param {object} props
 * @returns Node
 */
const OtpTimer: React.FC<OtpTimerProps> = ({
  seconds,
  onTimeout,
  inMinutes,
}) => {
  const [timer, setTimer] = useState(seconds || 60);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (IsEqual(timer, 0) && onTimeout && IsFunction(onTimeout)) {
      onTimeout();
    }
  }, [timer, onTimeout]);

  /**
   * Format Time
   * @param {number} time
   * @returns String
   */
  const formatTime = (time: any) => {
    if (!IsTrue(inMinutes, false)) {
      return `${time < 10 ? `0${time}` : time}`;
    }

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  return <>{formatTime(timer)}</>;
};

/**
 * Component Prop Types
 */
OtpTimer.propTypes = {
  seconds: number,
  onTimeout: func,
  inMinutes: bool,
};

/**
 * Component Default Types
 */
OtpTimer.defaultProps = {
  seconds: 60,
  onTimeout: () => {},
  inMinutes: false,
};

export default OtpTimer;
