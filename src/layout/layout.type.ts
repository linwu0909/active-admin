import { MenuItemType } from "antd/es/menu/hooks/useItems";
import React from "react";
import { Role } from "../type";

export interface IMenu extends MenuItemType {
    roles: Role[];
    children?: IMenu[];
    component?: React.ComponentType<any>
}