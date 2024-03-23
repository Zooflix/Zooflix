import React, { useState } from "react";
import styled from "styled-components";
import MySubscription from "./MySubscription";
import { useRecoilState } from "recoil";
import { myPageSubscribeListState } from "../../Store/MyPageState";

function MySubscribeList() {
    const [myPageSubscribeList, setMyPageSubScribeList] = useRecoilState(
        myPageSubscribeListState
    );

    const deleteSubscription = (subscribeNo: number) => {
        setMyPageSubScribeList(
            myPageSubscribeList.filter(
                (subscribe) => subscribe.subscribeNo !== subscribeNo
            )
        );
    };

    return (
        <Wrapper>
            <Container>
                <LeftSide>
                    내가 정기 구독 중인 주식
                    <CardSection>
                        <Card>
                            {/* 더미 코드 */}
                            <div>
                                <h3>삼성전자</h3>
                                <p>2020년 12월 1일</p>
                            </div>
                        </Card>
                        <Card>
                            <div>
                                <h3>삼성화재</h3>
                                <p>2020년 12월 1일</p>
                            </div>
                        </Card>
                        <Card>
                            <div>
                                <h3>삼성생명</h3>
                                <p>2020년 12월 1일</p>
                            </div>
                        </Card>
                    </CardSection>
                </LeftSide>
                <RightSide>
                    <div>내가 구독 중인 회원</div>
                    <div>
                        {myPageSubscribeList &&
                            myPageSubscribeList.map((subscribe) => (
                                <MySubscription
                                    key={subscribe.subscribeNo}
                                    onSubscribe={subscribe}
                                    onDelete={deleteSubscription}
                                />
                            ))}
                    </div>
                </RightSide>
            </Container>
        </Wrapper>
    );
}

export default MySubscribeList;

const Wrapper = styled.div``;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    // align-items: center;
    text-align: center;
`;

const LeftSide = styled.div`
    width: 235px;
    margin: 20px 52px;
    flex-direction: column;
`;

const CardSection = styled.div`
    width: 190px;
    margin: 20px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px 0;
    border-radius: 4px;
    border: 1px solid;
`;

const RightSide = styled.div`
    width: 330px;
    margin: 20px 52px;
    flex-direction: column;
`;
