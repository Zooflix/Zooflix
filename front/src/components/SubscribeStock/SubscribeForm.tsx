import styled from "styled-components";
import { useState } from "react";

import Search from "../Predict/Search";

const searchInputStyle = {
  width: "243px",
};

function SubscribeForm() {
  const [stockName, setStockName] = useState("null"); // 초기값은 "null"

  const handleSearchChange = (value: React.SetStateAction<string>) => {
    setStockName(value);
  };

  return (
    <Wrapper>
      <SearchContainer>
        <label>종목</label>
        <Search
          type="text"
          placeholder="종목을 검색해주세요."
          style={searchInputStyle}
          onSearchChange={handleSearchChange}
        />
      </SearchContainer>
    </Wrapper>
  );
}

export default SubscribeForm;

const Wrapper = styled.div`
  width: 1000px;
  border: none;
  border-radius: 30px;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
`;

const SearchContainer = styled.div``;
