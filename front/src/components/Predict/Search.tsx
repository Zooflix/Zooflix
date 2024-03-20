import styled from "styled-components";

import Searchbtn from "../../assets/img/button/Searchbtn.svg";

type SearchProps = {
    type: string;
    placeholder: string;
};

function Search(props: SearchProps) {
    return (
        <Wrapper>
            <img src={Searchbtn} alt="search" className="Searchbtn" />
            <input type={props.type} placeholder={props.placeholder} />
        </Wrapper>
    );
}

export default Search;

const Wrapper = styled.div`
    height: 40px;
    width: 450px;
    border: solid 1px;
    border-radius: 20px;
    margin: 10px 0;
    font-family: "NanumSquareRound";
    font-weight: bold;
    padding: 0 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    input {
        border: none;
        margin-left: 10px;
    }
    input:focus {outline: none;}
`;
