import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getJwtUserNo } from "../../apis/utils/jwt";
import { useNavigate } from "react-router-dom";

// 컴포넌트
import Title from "../../components/Common/Title";
import SquareBtn from "../../components/Common/SquareBtn";
import Search from "../../components/Predict/Search";
import Sort from "../../components/Predict/Sort";
import PredictList from "../../components/Predict/PredictList";
import Rank from "../../components/Predict/Rank";
import Graph from "../../components/Predict/Graph";
import StockHistory from "../../components/Predict/StockHistory";
import ListHeader from "../../components/Predict/ListHeader";
import Page from "../../components/Predict/Page";
import CommonPageTransition from "../../components/Common/CommonPageTransition";
import { useRecoilState } from "recoil";
import {
    myPageInfoState,
    myPageSubscribeListState,
} from "../../Store/MyPageState";
import { getMyInfo, getMySubscribeList } from "../../apis/api/MyPage";

const buttonStyleDark = {
    backgroundColor: "#1E3659",
    color: "white",
    border: "none",
    width: "110px",
    height: "40px",
    borderRadius: "20px",
    boxShadow: "1px 2px 5px rgba(0, 0, 0, 0.2)",
};

const searchInputStyle = {
    width: "25vw",
};

function Predict() {
    const navigate = useNavigate();
    const [sorted, setSorted] = useState("date"); // 초기값은 "date"
    const handleSortChange = (value: React.SetStateAction<string>) => {
        setSorted(value);
    };

    const [stockName, setStockName] = useState("null"); // 초기값은 "null"
    const handleSearchChange = (value: {
        stockName: string;
        stockCode: string;
    }) => {
        setStockName(value.stockName);
    };

    const [currentPage, setCurrentPage] = useState<any[]>([]);
    const handleCurrentPageChange = (value: React.SetStateAction<any[]>) => {
        setCurrentPage(value);
    };

    const [deleteOne, setDeleteOne] = useState(0);
    const handleDeleteChange = (value: number) => {
        setDeleteOne(value);
    };

    const createPredict = () => {
        let no = 0;
        try {
            no = getJwtUserNo();
        } catch (error) {
            no = 0;
        }
        if (no === 0) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        } else {
            navigate("/predict/create");
        }
    };

    //***************추가 구간 */
    // 내 정보 담기
    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);

    // 로그인 체크
    const [isLogin, setIsLogin] = useState(false);

    // 내 구독 목록 담기
    const [mySubscribeList, setMySubscribeList] = useRecoilState(
        myPageSubscribeListState
    );

    const fetchdata = async () => {
        //내 정보
        const dataInfo = await getMyInfo()
            .then((resInfo) => {
                console.log(resInfo);
                setMyPageInfo(resInfo);
            })
            .catch((error) => {
                console.error(error);
            });

        //내 구독 목록
        const dataSubscribe = await getMySubscribeList()
            .then((resSubscribe) => {
                setMySubscribeList(resSubscribe);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (localStorage.getItem("access") !== null) {
            // 로그인 했다면
            setIsLogin(true);
        } else {
            // 로그인 안 했다면
            setIsLogin(false);
        }
        if (isLogin === true) {
            fetchdata();
        }
    }, []);

    return (
        <CommonPageTransition>
            <Wrapper>
                <UpperContainer>
                    <LeftContainer>
                        <FirstContainer>
                            <Title text="주식 예측하기" />
                            <SquareBtn
                                text="나도 예측하기"
                                style={buttonStyleDark}
                                onClick={createPredict}
                            />
                        </FirstContainer>
                        <SecondContainer>
                            <Search
                                type="text"
                                placeholder="종목명을 입력하세요."
                                onSearchChange={handleSearchChange}
                                style={searchInputStyle}
                            />
                            <Sort onSortChange={handleSortChange} />
                        </SecondContainer>
                        <ListHeader />
                        <PredictList currentPage={currentPage} />
                    </LeftContainer>
                    <RightContainer>
                        <Rank stockName={stockName} />
                        <Graph stockName={stockName} />
                        <StockHistory />
                    </RightContainer>
                </UpperContainer>
                <LowerContainer>
                    <Page
                        sorted={sorted}
                        stockName={stockName}
                        onCurrentPageChange={handleCurrentPageChange}
                    />
                </LowerContainer>
            </Wrapper>
        </CommonPageTransition>
    );
}

export default Predict;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const UpperContainer = styled.div`
    padding-left: 200px;
    display: flex;
`;
const LowerContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const LeftContainer = styled.div`
    width: 65%;
`;

const RightContainer = styled.div`
    width: 50%;
    margin-left: 100px;
`;

const FirstContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}
`;

const SecondContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
