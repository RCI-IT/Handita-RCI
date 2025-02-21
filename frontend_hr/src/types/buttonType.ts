import { IconType } from "react-icons";

export type buttonType = {
  Icon: IconType;
  title: string;
  click: () => void;
  className: string;
  disable: boolean;
};
