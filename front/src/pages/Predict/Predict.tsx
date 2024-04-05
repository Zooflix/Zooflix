import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
import { userZbti } from "../../Store/UserState";
import Zbti from "../../components/Predict/Zbti";
import { loginCheck } from "../../components/User/IsLoginCheck";
import Character3d from "../../components/Character/Character3d";

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
  width: "15vw",
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

  const [togglePage, setTogglePage] = useState<any[]>([]);
  const handleZbti = (value: React.SetStateAction<any[]>) => {
    setTogglePage(value);
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
  const [userZbtiState, setUserZbtiState] = useRecoilState(userZbti);

  // 내 구독 목록 담기
  const [mySubscribeList, setMySubscribeList] = useRecoilState(
    myPageSubscribeListState
  );

  // 토글 버튼

  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setisOn(!isOn);
  };

  const fetchdata = async () => {
    //내 정보
    const dataInfo = await getMyInfo()
      .then((resInfo) => {
        console.log(resInfo);
        setMyPageInfo(resInfo);
        console.log("마이인포: " + myPageInfo.userName);
      })
      .catch((error) => {
        console.log("에러메세지" + error.message);
        console.error(error);
      });

    //내 구독 목록
    const dataSubscribe = await getMySubscribeList()
      .then((resSubscribe) => {
        setMySubscribeList(resSubscribe);
        console.log("내가 구독한 사람 목록 : " + mySubscribeList);
      })
      .catch((error) => {
        console.log("에러메세지: " + error.message);
        console.error(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("access") !== null) {
      // 로그인 했다면
      fetchdata();
    } else {
      // 로그인 안 했다면
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
              <SearchDiv>
                <Search
                  type="text"
                  placeholder="종목명을 입력하세요."
                  onSearchChange={handleSearchChange}
                  style={searchInputStyle}
                />
                <Sort onSortChange={handleSortChange} />
              </SearchDiv>
              {loginCheck() && (
                <ZbtiBox>
                  {/* <Zbti
                    userZbti={userZbtiState}
                    width="50px"
                    className="ZbtiImg"
                  ></Zbti> */}
                  <Character3d
                    name={userZbtiState}
                    characterScale={0.5}
                    action="turn"
                    canvasHeight={50}
                    canvasWidth={40}
                    toBelow={23}
                  />
                  내 유형만 보기
                  <ToggleContainer
                    // 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행
                    onClick={toggleHandler}
                  >
                    {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
                    {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
                    <div
                      className={`toggle-container ${
                        isOn ? "toggle--checked" : null
                      }`}
                    />
                    <div
                      className={`toggle-circle ${
                        isOn ? "toggle--checked" : null
                      }`}
                    />
                  </ToggleContainer>
                </ZbtiBox>
              )}
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
            zbti={isOn}
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

const ZbtiBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
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

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin: 8px;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
  }

  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0, 200, 102);
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  }
  > .toggle--checked {
    left: 27px;
    transition: 0.5s;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
