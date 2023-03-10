import { Box } from "@mui/system"
import {FC} from "react";
import { Header } from "./header/header"

interface ILayout {
    children: JSX.Element;
}

export const Layout: FC<ILayout> = ({ children }) => {
    return (
        <Box>
            <Header/>
            {children}
        </Box>
    )
}