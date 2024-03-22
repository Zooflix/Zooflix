import styled from "styled-components";
import Pagination from "react-js-pagination";
import { useState, useEffect } from "react";
import { selectPredicts } from "../../apis/api/Predict";

type PageProps = {
    sorted: string;
    stockName: string;
};

function Page(props: PageProps) {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);

    const postPerPage: number = 5; //페이지당 개수
    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    useEffect(() => {
        fetchData();
    }, [props.sorted, props.stockName]);

    useEffect(() => {
        setCurrentPage(data.slice(indexOfFirstPage, indexOfLastPage));
    }, [data, page]);

    const fetchData = async () => {
        try {
            const result = await selectPredicts(props.sorted, props.stockName);
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Wrapper>
            <Pagination
                activePage={page}
                itemsCountPerPage={postPerPage}
                totalItemsCount={data.length}
                pageRangeDisplayed={5}
                prevPageText={"<"}
                nextPageText={">"}
                onChange={handlePageChange}
            />
        </Wrapper>
    );
}

export default Page;

const Wrapper = styled.div``;
