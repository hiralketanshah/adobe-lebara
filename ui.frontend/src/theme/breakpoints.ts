import { createBreakpoints } from "@chakra-ui/theme-tools"
import {breakpoints as aemBreakPoints} from "../breakpoints";

const breakpoints = createBreakpoints({
    sm: aemBreakPoints.smallMax,
    md: aemBreakPoints.medium,
    lg: aemBreakPoints.large,
    xl: aemBreakPoints.largeMax,
    "2xl": aemBreakPoints.largeMax,
})

export default breakpoints;