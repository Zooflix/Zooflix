import styled from "styled-components";

function Sort() {
    return (
        <Wrapper>
            <select>
                <option key="date" value="date">
                    최신순
                </option>
                <option key="userTem" value="userTem">
                    온도순
                </option>
            </select>
        </Wrapper>
    );
}

export default Sort;

const Wrapper = styled.div`

    select {
        height: 30px;
        width: 75px;
        border: none;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        text-align: center;
    }
`;
