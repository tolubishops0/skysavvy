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
    label: "Theme",
    link: "theme",
    icon: ThemeSwitch,
    size: 25,
  },
  {
    label: "Units",
    link: "units",
    icon: MdOutlineSwitchAccessShortcutAdd,
    size: 25,
  },
  {
    label: "Pointers",
    link: "",
    icon: MdOutlineRecommend,
    size: 25,
  },
];
