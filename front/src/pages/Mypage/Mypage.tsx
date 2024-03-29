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
    try {
      const dataInfo = await getMyInfo()
        .then((resInfo) => {
          console.log(resInfo);
          setMyPageInfo(resInfo?.data);

          const dataPredict = getMyPredictList()
            .then((resPredict) => {
              setMyPagePredictList(resPredict);

              const dataSubscribe = getMySubscribeList()
                .then((resSubscribe) => {
                  setMyPageSubscribeList(resSubscribe);

                  const dataStock = getMyStockList(userId)
                    .then((resStock) => {
                      setMyStockList(resStock);
                      console.log("내 주식 구독 목록 : " + myStockList);
                    })
                    .catch((error) => {
                      console.log("내 주식 구독 목록 불러오기 실패");
                      console.error(error);
                    });
                })
                .catch((error) => {
                  console.log("내가 구독한 사람 목록 불러오기 실패");
                  console.error(error);
                });
            })
            .catch((error) => {
              console.log("내 예측 목록 실패");
              console.error(error);
            });
        })
        .catch((error) => {
          console.log("내 정보 불러오기 실패");
          console.error(error);
        });
    } catch (error) {
      console.log("최종실패?");
      console.error(error);
    }
  };

  const userId = "user1";

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper>
      <Container>
        <LeftSideMyInfo>
          <h2>내 정보</h2>
          <TemperatureWithImage />
          <MyInfo />
          <RouteToOtherPage />
        </LeftSideMyInfo>
        <Right>
          <RightSideMyInfo>
            <ContentHeader />
          </RightSideMyInfo>
          <GotoZbtiButton>
            <img
              src={GotoZbti}
              alt="GotoZbti"
              onClick={() => handleZbti()}
            ></img>
          </GotoZbtiButton>
        </Right>
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
  width: 450px;
  margin-bottom: 40px;
  text-align: center;

  background: #ffffff;
  border: 1px solid #e7e7e7;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightSideMyInfo = styled.div`
  float: right;
  width: 775px;
  height: 660px;
  margin: 0 auto;
  background: #ffffff;
  border: 0.77908px solid #e7e7e7;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10.9071px;
`;

const GotoZbtiButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  }
`;
