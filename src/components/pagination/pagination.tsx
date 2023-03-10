import { Stack, Pagination } from "@mui/material";
import { FC } from "react";

interface ICustomPagination {
    page: number;
    setPage: (page: number) => void;
}

export const CustomPagination: FC<ICustomPagination> = ({ page, setPage }) => {

    return (
        <Stack spacing={1} alignItems="center">
            <Pagination
                count={7}
                page={page}
                shape="rounded"
                siblingCount={0}
                onChange={(e, page) => setPage(page)}
            />
        </Stack>
    )
}