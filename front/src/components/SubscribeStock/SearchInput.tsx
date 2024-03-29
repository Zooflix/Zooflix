import styled from "styled-components";
import Search from "../Predict/Search";
import { ChangeEvent, useState } from "react";

const searchInputStyle = {
  width: "225px",
};

interface Props {
  onSearchChange: (value: { stockName: string; stockCode: string }) => void;
}

function SearchInput({ onSearchChange }: Props) {
  const [stockName, setStockName] = useState("");

  return (
    <div>
      <SearchContainer>
        <label>종목</label>
        <Search
          type="text"
          placeholder="종목명 또는 지수명을 입력해주세요."
          style={searchInputStyle}
          onSearchChange={onSearchChange}
        />
      </SearchContainer>
    </div>
  );
}

export default SearchInput;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  label {
    width: 50px;
    font-weight: bold;
    padding: 5px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
