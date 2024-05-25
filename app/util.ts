import { SiConvertio } from "react-icons/si";
import {
  MdOutlineRecommend,
  MdOutlineSwitchAccessShortcutAdd,
} from "react-icons/md";
import { NavContentType } from "@/global";
import ThemeSwitch from "./ThemToggle";
import { IconType } from "react-icons";

export const navContent: NavContentType[] = [
  {
    label: "",
    link: "theme",
    icon: ThemeSwitch,
    size: 25,
  },
  {
    label: "Temp units",
    link: "units",
    icon: MdOutlineSwitchAccessShortcutAdd,
    size: 25,
    subMenu: [
      {
        label: "F",
        link: "units",
        icon: MdOutlineSwitchAccessShortcutAdd,
        size: 25,
      },
      {
        label: "K",
        link: "units",
        icon: MdOutlineSwitchAccessShortcutAdd,
        size: 25,
      },
      {
        label: "C",
        link: "units",
        icon: MdOutlineSwitchAccessShortcutAdd,
        size: 25,
      },
    ],
  },
  {
    label: "Get pointers",
    link: "",
    icon: MdOutlineRecommend,
    size: 25,
  },
];
