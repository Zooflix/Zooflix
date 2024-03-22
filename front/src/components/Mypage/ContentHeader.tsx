import React, { useState } from "react";
import styled from "styled-components";
import MyPredictList from "./MyPredictList";
import MySubscriptions from "./MySubscription";
import MySubscribeList from "./MySubscribeList";

interface ContentHeaderProps {}

function ContentHeader(props: ContentHeaderProps) {
    const [selectedTab, setSelectedTab] = useState<string>("my-predictions"); // 선택된 탭 상태 추가

    const handleTabClick = (tabName: string) => {
        setSelectedTab(tabName); // 클릭된 탭의 이름을 상태로 설정
    };

    return (
        <Wrapper>
            <ContentTabHeader>
                <ContentHeaderTab>
                    <ContentTabList>
                        <ContentTabListItem>
                            <ContentTabListItemSpan
                                onClick={() => handleTabClick("my-predictions")} // 클릭 이벤트 처리
                                selected={selectedTab === "my-predictions"} // 선택된 탭 여부에 따라 스타일 적용
                            >
                                내가 쓴 예측 글
                            </ContentTabListItemSpan>
                        </ContentTabListItem>
                        <ContentTabListItem>
                            <ContentTabListItemSpan
                                onClick={() => handleTabClick("my-subscriptions")} // 클릭 이벤트 처리
                                selected={selectedTab === "my-subscriptions"} // 선택된 탭 여부에 따라 스타일 적용
                            >
                                내 구독 정보
                            </ContentTabListItemSpan>
                        </ContentTabListItem>
                    </ContentTabList>
                </ContentHeaderTab>
            </ContentTabHeader>
            
            {selectedTab === "my-predictions" && <MyPredictList />}
            {selectedTab === "my-subscriptions" && <MySubscribeList />}
        </Wrapper>
    );
}

const Wrapper = styled.div``;
const ContentTabHeader = styled.div`
    display: flex;
    padding: 15px 20px;
`;
const ContentHeaderTab = styled.nav`
    flex: 1;
    display: block;
`;
const ContentTabList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-block-style: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
`;
const ContentTabListItem = styled.li`
    position: relative;
    display: list-item;
    text-align: -webkit-match-parent;
    margin: 0;
    padding: 0;
`;
const ContentTabListItemSpan = styled.span<{ selected: boolean }>`
    display: inline-block;
    line-height: 23px;
    font-weight: 800;
    vertical-align: top;
    color: ${({ selected }) =>
        selected ? "black" : "rgba(8, 8, 8, 0.5)"};
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
`;

export default ContentHeader;
