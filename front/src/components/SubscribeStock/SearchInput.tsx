import styled from "styled-components";
import Search from "../Predict/Search";
import { useEffect } from "react";

const searchInputStyle = {
  width: "225px",
};

interface Props {
  onSearchChange: (value: { stockName: string; stockCode: string }) => void;
  resetInput: boolean;
}

function SearchInput({ onSearchChange, resetInput }: Props) {
  return (
    <div>
      <SearchContainer>
        <label>종목</label>
        <Search
          type="text"
          placeholder="종목명을 입력해주세요."
          style={searchInputStyle}
          onSearchChange={onSearchChange}
          resetInput={resetInput}
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
