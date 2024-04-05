import styled from "styled-components";
import Pagination from "react-js-pagination";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectPredicts } from "../../apis/api/Predict";
import {
  selectUserNoState,
  deletePdNoState,
  selectStockNameState,
  selectUserNameState,
} from "../../Store/PredictState";
import "./Page.css";

type PageProps = {
  sorted: string;
  stockName: string;
  onCurrentPageChange: (value: any[]) => void;
  zbti: boolean;
};

function Page(props: PageProps) {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);

  const postPerPage: number = 5; //페이지당 개수
  const indexOfLastPage = page * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const [selectUserNo, setSelectUserNo] = useRecoilState(selectUserNoState);
  const [selectStockName, setSelectStockName] =
    useRecoilState(selectStockNameState);
  const [selectUserName, setSelectUserName] =
    useRecoilState(selectUserNameState);
  const [deletePdNo, setDeletePdNo] = useRecoilState(deletePdNoState);

  useEffect(() => {
    fetchData();
  }, [props.sorted, props.stockName, props.zbti]);

  useEffect(() => {
    setDeletePdNo(0);
    fetchData();
  }, [deletePdNo]);

  useEffect(() => {
    setSelectUserNo(0);
    setSelectStockName("");
    setSelectUserName("");
    props.onCurrentPageChange(data.slice(indexOfFirstPage, indexOfLastPage));
  }, [data, page]);

  const fetchData = async () => {
    try {
      const result = await selectPredicts(
        props.sorted,
        props.stockName,
        props.zbti
      );
      setData(result);
      setPage(1);
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
