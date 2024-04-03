import styled from "styled-components";
import { useState, useEffect } from "react";

import { stockSearch } from "../../apis/api/Predict";
import Searchbtn from "../../assets/img/button/Searchbtn.svg";
import { useRecoilState } from "recoil";
import {
  selectedStockCode,
  selectedStockName,
} from "../../Store/StockSubscribeState";

type SearchProps = {
  type: string;
  placeholder: string;
  style?: React.CSSProperties;
  onSearchChange: (value: { stockName: string; stockCode: string }) => void;
};

function Search(props: SearchProps) {
  const [keyword, setKeyword] = useState<string>("");
  const [keyItems, setKeyItems] = useState<
    { stockName: string; stockCode: string }[] | null
  >(null);
  const [searchResultVisible, setSearchResultVisible] =
    useState<boolean>(false);

  const [selectStockName, setSelectStockName] =
    useRecoilState(selectedStockName);
  const [selectStockCode, setSelectStockCode] =
    useRecoilState(selectedStockCode);

  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    // if (e.currentTarget.value === "") {
    //   props.onSearchChange({ stockName: "null", stockCode: "" });
    // }
    setKeyword(e.currentTarget.value);
    setSearchResultVisible(true);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) fetchData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  const handleSearchChange = (value: {
    stockName: string;
    stockCode: string;
  }) => {
    props.onSearchChange(value);
    setKeyword(value.stockName);
    setSearchResultVisible(false);
  };

  const fetchData = async () => {
    try {
      const result = await stockSearch(keyword);
      setKeyItems(result);
    } catch (error) {}
  };

  useEffect(() => {
    setKeyword(selectStockName);
    props.onSearchChange({
      stockName: selectStockName,
      stockCode: selectStockCode,
    });
    setSelectStockName("");
    setSelectStockCode("");
  }, []);

  return (
    <Wrapper>
      <SearchInput>
        <img src={Searchbtn} alt="search" className="Searchbtn" />
        <input
          type={props.type}
          placeholder={props.placeholder}
          style={props.style}
          value={keyword}
          onChange={onChangeData}
        />
      </SearchInput>
      <SearchResult keyword={keyword} isVisible={searchResultVisible}>
        <EmptyResult list={keyItems}>검색 결과가 없습니다.</EmptyResult>
        {keyword &&
          keyItems &&
          keyItems.map((item) => (
            <SelectOne key={item.stockCode}>
              <div onClick={() => handleSearchChange(item)}>
                {item.stockName}
              </div>
            </SelectOne>
          ))}
      </SearchResult>
    </Wrapper>
  );
}

export default Search;

interface SearchResultProps {
  keyword: string;
  isVisible: boolean;
}

interface SearchListProps {
  list: string[];
}

interface KeyItemsProps {
  list: { stockName: string; stockCode: string }[] | null;
}

const Wrapper = styled.div`
  position: relative;
  z-index: 5;
`;

const SearchInput = styled.div`
  border: solid 1px;
  border-radius: 15px;
  margin: 10px 0;
  font-weight: bold;
  padding: 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  // margin-right: 30px;
  position: relative;

  input {
    border: none;
    margin-left: 10px;
    height: 40px;
  }

  input:focus {
    outline: none;
  }
`;

const SearchResult = styled.div<SearchResultProps>`
  display: ${(props) => (props.keyword && props.isVisible ? "block" : "none")};
  position: absolute;
  top: 90%;
  left: 50px;
  width: 70%;
  height: 200px;
  overflow-y: scroll;
  z-index: 0;
  background-color: white;
  border: solid 1px white;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
`;

const SelectOne = styled.div`
  div {
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  :hover {
    cursor: pointer;
    color: white;
    background-color: #03045e;
  }
`;

const EmptyResult = styled.div<KeyItemsProps>`
  display: ${(props) =>
    !props.list || props.list.length === 0 ? "block" : "none"};
  text-align: center;
  margin: 60px;
  position: relative;
  z-index: 1;
  color: gray;
`;
