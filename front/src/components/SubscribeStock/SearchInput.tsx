import styled from "styled-components";
import Search from "../Predict/Search";
import { useState } from "react";

const searchInputStyle = {
  width: "243px",
};

function SearchInput() {
  const [stockName, setStockName] = useState("null");

  const handleSearchChange = (value: React.SetStateAction<string>) => {
    setStockName(value);
  };
  return (
    <div>
      <SearchContainer>
        <label>종목</label>
        <Search
          type="text"
          placeholder="종목명 또는 지수명을 입력해주세요."
          style={searchInputStyle}
          onSearchChange={handleSearchChange}
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
    font-weight: bold;
    padding-top: 20px;
    margin-right: 30px;
  }
`;
