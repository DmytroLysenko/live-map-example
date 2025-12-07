import React from "react";

import { Button, Flex } from "antd";
import { AccessibleIcon } from "../Icons";

import { IWheelchairsState } from "../../types";
interface IProps {
  wheelchairs: IWheelchairsState;
  setWheelchairs: (update: Partial<IWheelchairsState>) => void;
}

const WheelchairsToggle = ({ wheelchairs, setWheelchairs }: IProps) => {
  const isShown = wheelchairs.show;
  return (
    <Flex style={{ height: "32px" }} align="center" justify="center">
      <Button
        style={{
          borderRadius: "50%",
          color: "white",
          filter: isShown
            ? "none"
            : "brightness(0.7) saturate(0.8) drop-shadow(rgba(59, 130, 246, 0.2) 0px 2px 6px)",
          opacity: isShown ? 1 : 0.5,
        }}
        type="primary"
        size="small"
        onClick={() => setWheelchairs({ show: !isShown })}
        icon={<AccessibleIcon style={{ width: "20px", height: "20px" }} />}
      />
    </Flex>
  );
};

export default WheelchairsToggle;
