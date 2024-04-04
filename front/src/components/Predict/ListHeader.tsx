import styled from "styled-components";

function ListHeader() {
    const header = ["종목명", "작성자", "예측날짜", "예측가"];
    return (
        <Wrapper>
            <span>{header[0]}</span>
            <span style={{paddingLeft: "110px"}}>{header[1]}</span>
            <span style={{paddingLeft: "80px"}}>{header[2]}</span>
            <span style={{paddingLeft: "75px"}}>{header[3]}</span>
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
    padding-right: 110px;
    padding-left: 70px;
    margin-bottom: 20px;
`;
