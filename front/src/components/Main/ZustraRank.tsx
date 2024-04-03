import React, {
    DetailedHTMLProps,
    HTMLAttributes,
    useEffect,
    useState,
} from "react";
import Character3d from "../Character/Character3d";
import styled, { css, keyframes } from "styled-components";
import first from "../../assets/img/rank/first.svg";
import second from "../../assets/img/rank/second.svg";
import third from "../../assets/img/rank/third.svg";
import { useRecoilState } from "recoil";
import {
    deleteMySubscribe,
    getMySubscribeList,
    subscribeUser,
} from "../../apis/api/MyPage";
import { getJwtUserNo } from "../../apis/utils/jwt";
import { selectUserNoState } from "../../Store/PredictState";
import { useNavigate } from "react-router-dom";
import { loginCheck } from "../../components/User/IsLoginCheck";
import { userPageInfoState } from "../../Store/UserPageState";
import { getUserInfo } from "../../apis/api/UserPage";
import { myPageSubscribeListState } from "../../Store/MyPageState";

interface InnerGraphProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    color: string;
    width: number;
}

interface Props {
    rankData: any[];
    zbti: Map<string, string>;
}

function ZustraRank({ rankData, zbti }: Props) {
    const rankArr = [first, second, third];
    const color = [
        "linear-gradient(90deg, rgba(255, 124, 124, 0.95) 0%, rgba(255, 161, 108, 0.95) 36%, rgba(255, 172, 74, 0.95) 54.5%, rgba(255, 190, 89, 0.95) 69.5%, rgba(255, 225, 120, 0.95) 100%)",
        "linear-gradient(90deg, rgba(104, 183, 255, 0.95) 0%, rgba(128, 194, 255, 0.95) 36%, rgba(164, 211, 255, 0.95) 54.5%, rgba(185, 222, 255, 0.95) 69.5%, rgba(228, 242, 255, 0.95) 100%)",
        "linear-gradient(90deg, rgba(251, 77, 161, 0.95) 0%, rgba(255, 113, 182, 0.95) 35%, rgba(255, 165, 209, 0.95) 54.5%, rgba(255, 184, 218, 0.95) 68.5%, rgba(255, 217, 235, 0.95) 100%)",
    ];

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [selectUserNo, setSelectUserNo] = useRecoilState(selectUserNoState);
    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);
    // 추가 변수
    const [mySubscribeList, setMySubscribeList] = useRecoilState(
        myPageSubscribeListState
    );
    const [isSubscribe, setIsSubscribe] = useState(false); // 구독 체크

    const navigate = useNavigate();

    useEffect(() => {
    }, [linkProfile, moreBtnClick, deleteSubscribe]);

    function moreBtnClick(index: number, subscribeUserName: string) {
        if (expandedIndex === index) {
            setExpandedIndex(null); // 이미 확장된 경우 접기
        } else {
            setExpandedIndex(index); // 그 외의 경우 확장
        }

        if (loginCheck()) {
            // 내 구독 리스트의 유저 닉네임과 들어온 유저의 닉네임 비교
            for (let i = 0; i < mySubscribeList.length; i++) {
                if (mySubscribeList[i].subscribeName === subscribeUserName) {
                    setIsSubscribe(true);
                    break;
                } else {
                    setIsSubscribe(false);
                }
            }
        }
    }

    async function subscribe(subscribeUserNo: number) {
        if (!loginCheck()) {
            alert("로그인이 필요한 기능입니다.");
            navigate("/login");
        } else {
            subscribeUser(getJwtUserNo(), subscribeUserNo);
            alert("유저 구독이 완료되었습니다.");
            getMySubscribeList();
            setIsSubscribe(!isSubscribe);
        }
    }

    // 구독 취소
    async function deleteSubscribe(subscribeUserName: string) {
        for (let i = 0; i < mySubscribeList.length; i++) {
            if (mySubscribeList[i].subscribeName === subscribeUserName) {
                deleteMySubscribe(mySubscribeList[i].subscribeNo);

                alert("유저 구독이 취소되었습니다.");

                getMySubscribeList();
                setIsSubscribe(!isSubscribe);
                break;
            }
        }
    }

    function linkProfile(userNo: number) {
        navigate(`/user-page/${userNo}`);
    }

    return (
        <RankWrapper>
            <RankHeader>주스트라다무스 랭킹</RankHeader>
            {rankData ? (
                <RankDiv>
                    {rankData.map((item, index) => {
                        const isExpanded = expandedIndex === index;
                        return (
                            <UserDiv key={index} expanded={isExpanded}>
                                <UserRank>
                                    <img src={rankArr[index]} height="50px" />
                                    {index === 0 ? (
                                        <Character3d
                                            name={item.userZbti || "Bear"}
                                            characterScale={0.35}
                                            canvasWidth={50}
                                            canvasHeight={100}
                                        />
                                    ) : (
                                        <Character3d
                                            name={item.userZbti || "Bear"}
                                            characterScale={0.35}
                                            canvasWidth={50}
                                            canvasHeight={100}
                                            action="turn"
                                        />
                                    )}

                                    <Margin>
                                        <div>
                                            <Name>{item.userName}</Name>
                                            {item.predictCount !== 0 && (
                                                <SmallText>
                                                    {Math.round(
                                                        (item.successCount /
                                                            item.predictCount) *
                                                            100
                                                    )}
                                                    % 예측 성공률
                                                </SmallText>
                                            )}
                                        </div>
                                        {zbti.get(item.userZbti) === null ||
                                        zbti.get(item.userZbti) === "Bear" ? (
                                            <Zbti>
                                                주bti 검사 결과가 없습니다.
                                            </Zbti>
                                        ) : (
                                            <Zbti>
                                                {zbti.get(item.userZbti)} 유형
                                            </Zbti>
                                        )}
                                    </Margin>
                                    <Graph>
                                        <InnerGraph
                                            color={color[index]}
                                            width={item.userTemperature * 4}
                                        >
                                            {item.userTemperature} °C
                                        </InnerGraph>
                                    </Graph>
                                    {!isExpanded ? (
                                        <ToggleButton
                                            onClick={() =>
                                                moreBtnClick(
                                                    index,
                                                    item.userName
                                                )
                                            }
                                        >
                                            더보기
                                        </ToggleButton>
                                    ) : (
                                        <ToggleButton
                                            onClick={() =>
                                                moreBtnClick(
                                                    index,
                                                    item.userName
                                                )
                                            }
                                        >
                                            접기
                                        </ToggleButton>
                                    )}
                                </UserRank>
                                {isExpanded && (
                                    <InfoDiv expanded={isExpanded}>
                                        <div>
                                            <div>총 예측횟수</div>
                                            <div>예측 성공 횟수 </div>
                                            <div>예측 실패 횟수</div>
                                        </div>
                                        <div>
                                            <Num>{item.predictCount}</Num>
                                            <Num>{item.successCount}</Num>
                                            <Num>{item.failCount}</Num>
                                        </div>
                                        <ButtonDiv>
                                            <Button
                                                onClick={() =>
                                                    linkProfile(item.userNo)
                                                }
                                            >
                                                프로필 가기
                                            </Button>
                                            {isSubscribe ? (
                                                <Button
                                                    onClick={() =>
                                                        deleteSubscribe(
                                                            item.userName
                                                        )
                                                    }
                                                >
                                                    구독 취소
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        subscribe(item.userNo)
                                                    }
                                                >
                                                    구독하기
                                                </Button>
                                            )}
                                        </ButtonDiv>
                                    </InfoDiv>
                                )}
                            </UserDiv>
                        );
                    })}
                </RankDiv>
            ) : (
                <div>Loading...</div>
            )}
        </RankWrapper>
    );
}

export default ZustraRank;

const RankWrapper = styled.div`
    margin-left: 6vw;
    padding: 10px;
    width: 65%;
`;

const RankHeader = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
`;

const RankDiv = styled.div`
    background: #ffffff;
    border: 1px solid rgba(109, 125, 147, 0.15);
    box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    padding: 10px;
`;

const UserDiv = styled.div<{ expanded: boolean }>`
    border: 1px solid rgba(109, 125, 147, 0.15);
    box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    margin: 10px;
    padding: 20px 15px;
    position: relative; /* UserDiv 내부의 Button 위치 조정을 위해 필요 */
    img {
        margin-right: 10px;
    }
    ${(props) =>
        props.expanded && "height: 200px;"}/* 확장된 경우 UserDiv의 높이 조정 */
`;

const Name = styled.span`
    margin: 2px;
    font-weight: bold;
`;

const SmallText = styled.span`
    margin: 2px;
    font-weight: semi-bold;
    font-size: 10px;
    color: gray;
`;

const Zbti = styled.div`
    margin: 2px;
    font-weight: bold;
    font-size: 12px;
    color: gray;
    margin-top: 5px;
`;

const Graph = styled.div`
    width: 400px;
    height: 30px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
`;

const InnerGraph = styled.div<InnerGraphProps>`
    height: 100%;
    border-radius: 50px;
    background: ${(props) => props.color};
    color: gray;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: right;
    padding: 0 20px;
    width: ${(props) =>
        props.width}px; // item.userTemperature * 4를 픽셀 단위로 설정
`;

const Margin = styled.div`
    margin-left: 20px;
`;

const ToggleButton = styled.div`
    margin: 20px;
    font-size: 12px;
    color: gray;
    cursor: pointer;
`;

const Button = styled.div`
    margin-right: 50px;
    font-size: 12px;
    color: black;
    width: 80px;
    height: 25px;
    cursor: pointer;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    padding: 10px 30px;
    font-weight: bold;
    text-align: center;
`;

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 20px;
`;

const UserRank = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const InfoDiv = styled.div<{ expanded: boolean }>`
    font-size: 12px;
    font-weight: bold;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    line-height: 27px;
    animation: ${({ expanded }) =>
        expanded
            ? css`
                  ${fadeIn} 0.5s forwards
              `
            : css`
                  ${fadeOut} 0.5s forwards
              `};
`;
const Num = styled.div`
    font-weight: bold;
    font-size: 12px;
    color: #0099e8;
`;
