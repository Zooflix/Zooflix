import styled from "styled-components";

import Searchbtn from "../../assets/img/button/Searchbtn.svg";

type SearchProps = {
    type: string;
    placeholder: string;
    style?: React.CSSProperties;
};

function Search(props: SearchProps) {
    return (
        <Wrapper>
            <img src={Searchbtn} alt="search" className="Searchbtn" />
            <input type={props.type} placeholder={props.placeholder} style={props.style}/>
        </Wrapper>
    );
}

export default Search;

const Wrapper = styled.div`
    border: solid 1px;
    border-radius: 15px;
    margin: 10px 0;
    font-family: "NanumSquareRound";
    font-weight: bold;
    padding: 0 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: none;
    background-color: white;
    box-shadow : 1px 2px 5px rgba(0, 0, 0, 0.2);

    input {
        border: none;
        margin-left: 10px;
        height: 40px;
    }

    input:focus {
        outline: none;
    }
`;
