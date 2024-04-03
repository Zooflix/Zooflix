import styled from "styled-components";
import React from "react";

type SortProps = {
    onSortChange: (value: string) => void; // 함수 props 추가
};

function Sort(props: SortProps) {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onSortChange(e.target.value); // 변경된 값 Predict 컴포넌트로 전달
    };

    return (
        <Wrapper>
            <select onChange={handleSortChange}>
                <option key="date" value="date">
                    최신순
                </option>
                <option key="userTem" value="userTem">
                    예측 날짜 순
                </option>
                <option key="end" value="end">
                    예측 완료 글
                </option>
            </select>
        </Wrapper>
    );
}

export default Sort;

const Wrapper = styled.div`
    select {
        height: 30px;
        width: 100px;
        border: none;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
    }
`;
