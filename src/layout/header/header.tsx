import { Typography } from "@mui/material";
import { Box } from "@mui/system"
import { FC } from "react";
import { headerWrapper } from "../styles/header"
import Logo from "../../static/schedule.png"

interface IHeader {
    title?: string;
}

export const Header: FC<IHeader> = ({ title = "Timetable" }) => {
    return (
        <Box sx={headerWrapper}>
            <img alt="logo" src={Logo} width="35" height="35" />
            <Typography variant="h4" fontWeight={600} color="#fff">
                {title}
            </Typography>
        </Box>
    )
}