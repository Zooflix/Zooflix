import styled from "styled-components";

function ListHeader() {
    const header = ["종목명", "작성자", "예측날짜", "예측가"];
    return (
        <Wrapper>
            <span>{header[0]}</span>
            <span style={{paddingLeft: "7vw"}}>{header[1]}</span>
            <span style={{paddingLeft: "5vw"}}>{header[2]}</span>
            <span style={{paddingLeft: "5vw"}}>{header[3]}</span>
        </Wrapper>
    );
}

export default ListHeader;

const Wrapper = styled.div`
    display: flex;
    justify-content: start;
    margin-top: 15px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid lightgray;
    // padding-right: 8vw;
    padding-left: 5vw;
    margin-bottom: 20px;
`;
