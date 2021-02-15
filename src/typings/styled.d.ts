import "styled-components";
import { ITheme } from "types/theme";

declare module "styled-components" {
    // eslint-disable-next-line
    export interface DefaultTheme extends ITheme {}
}
