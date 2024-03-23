import styled from "styled-components";

function ListHeader() {
    const header = ["종목명", "작성자", "예측날짜", "예측가"];
    return (
        <Wrapper>
            {header && header.map((item, index) => (
                <div style={{ width: "100px" }}key={index}>{item}</div>
            ))}
        </Wrapper>
    );
}

export default ListHeader;

const Wrapper = styled.div`
display: flex;
justify-content: space-evenly;
margin-top: 15px;
margin-bottom: 15px;
padding-bottom: 15px;
border-bottom: 1px solid lightgray;
padding-right: 30px;
`;