"use client";
import { Pagination, PaginationItem } from "@mui/material";
import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    navigationPath: string;
}

const MyPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, navigationPath }) => {
    totalPages = totalPages !== 0 ? totalPages : 1;

    return (
        <Pagination sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}
            page={currentPage}
            count={totalPages}
            renderItem={(item) => (
                <Link href={`${navigationPath}?page=${item.page}`}>
                <PaginationItem {...item} />
                </Link>
            )}
        />
    );
};

export default MyPagination;