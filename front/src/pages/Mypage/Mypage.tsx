import styled from "styled-components";
import TemperatureWithImage from "../../components/Mypage/TemperatureWithImage";
import MyInfo from "../../components/Mypage/MyInfo";
import RouteToOtherPage from "../../components/Mypage/RouteToOtherPage";
import ContentHeader from "../../components/Mypage/ContentHeader";
import GotoZbti from "../../assets/img/button/GotoZbti.svg";
import { useRecoilState } from "recoil";
import {
  myPageInfoState,
  myPagePredictListState,
  myPageSubscribeListState,
} from "../../Store/MyPageState";
import { useEffect } from "react";
import {
  getMyInfo,
  getMyPredictList,
  getMyStockList,
  getMySubscribeList,
} from "../../apis/api/MyPage";
import { useNavigate } from "react-router";
import { stockSubListState } from "../../Store/StockSubscribeState";

function Mypage() {
  const info = "내 정보";

  const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);
  const [myPagePredictList, setMyPagePredictList] = useRecoilState(
    myPagePredictListState
  );
  const [myPageSubscribeList, setMyPageSubscribeList] = useRecoilState(
    myPageSubscribeListState
  );

  const [myStockList, setMyStockList] = useRecoilState(stockSubListState);

  const navigate = useNavigate();

  const handleZbti = () => {
    navigate("/zbti");
  };

  // 임의의 인덱스값 userNo 넣음
  const fetchData = async () => {
    //내 정보
    const dataInfo = await getMyInfo()
      .then(resInfo => {
        console.log(resInfo)
        setMyPageInfo(resInfo?.data);
        console.log("마이인포: " + myPageInfo.userName);
      })
      .catch(error => {
        console.log("에러메세지" + error.message);
        console.error(error);
      });

    const dataPredict = await getMyPredictList()
      .then(resPredict => {
        setMyPagePredictList(resPredict);
        console.log("프리딕트: " + myPagePredictList);
      })
      .catch(error => {
        console.log("에러메세지: " + error.message);
        console.error(error);
      });

    const dataSubscribe = await getMySubscribeList()
      .then(resSubscribe => {
        setMyPageSubscribeList(resSubscribe);
        console.log("내가 구독한 사람 목록 : " + myPageSubscribeList)
      })
      .catch(error => {
        console.log("에러메세지: " + error.message);
        console.error(error);
      });

    const dataStock = await getMyStockList(userId)
      .then(resStock => {
        setMyStockList(resStock);
        console.log("내 주식 구독 목록 : " + myStockList);
      })
      .catch(error => {
        console.log("에러메세지: " + error.message);
        console.error(error);
      });

  };

  // const accessToken = localStorage.getItem('accessToken');
  const userId = "user1";

  useEffect(() => {
    // if(!accessToken){
    //     navigate("/main");
    //     return;
    // }

    fetchData();
  }, []);

  // useEffect(() => {
  //   // 임의의 인덱스값 userNo 넣음
  //   const fetchData = async (userId: String) => {
  //     //내 주식 구독 목록
  //     try {
  //       const data = await getMyStockList(userId);
  //       setMyStockList(data);
  //     } catch (error) {
  //       console.log("내 주식 구독 목록 불러오기 실패");
  //       console.error(error);
  //     }
  //   };

  //   fetchData(userId);
  // }, []);

  return (
    <Wrapper>
      <Container>
        <LeftSideMyInfo>
          <h2>내 정보</h2>
          <TemperatureWithImage />
          <MyInfo />
          <RouteToOtherPage />
        </LeftSideMyInfo>
        <RightSideMyInfo>
          <ContentHeader />
          <GotoZbtiButton>
            <img
              src={GotoZbti}
              alt="GotoZbti"
              onClick={() => handleZbti()}
            ></img>
          </GotoZbtiButton>
        </RightSideMyInfo>
      </Container>
    </Wrapper>
  );
}

export default Mypage;

const Wrapper = styled.div`
  display: block;
`;

const Container = styled.div`
  position: static;
  width: 1280px;
  margin: 0 auto;
  padding-bottom: 40px;
`;

const LeftSideMyInfo = styled.div`
  float: left;
  width: 420px;
  height: 785px;
  text-align: center;
  margin: 0 auto;

  background: #ffffff;
  border: 0.77908px solid #e7e7e7;
  box-shadow: 2.63329px 2.63329px 13.1587px -6.58322px rgba(0, 0, 0, 0.4);
  border-radius: 10.9071px;
`;

const RightSideMyInfo = styled.div`
  float: right;
  width: 775px;
  height: 660px;
  margin: 0 auto;
  background: #ffffff;
  border: 0.77908px solid #e7e7e7;
  box-shadow: 2.63329px 2.63329px 13.1587px -6.58322px rgba(0, 0, 0, 0.4);
  border-radius: 10.9071px;
`;

const GotoZbtiButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 695px;
  margin: 0 auto;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
`;
