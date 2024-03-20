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
height: 35px;
width: 75px;
border-radius: 10px;
text-align: center;
`;
