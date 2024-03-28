import { useState } from "react";
import styled from "styled-components";
import MySubscribeList from "../Mypage/MySubscribeList";
import PredictList from "../Predict/PredictList";
import { useRecoilState } from "recoil";
import { userPageInfoState, userPagePredictListState } from "../../Store/UserPageState";

interface ContentHeaderProps {}

function UserContentHeader(props: ContentHeaderProps) {
    const [selectedTab, setSelectedTab] = useState<string>("user-predictions");
    
    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);

    const [userPagePredictList, setUserPagePredictList] = useRecoilState(
        userPagePredictListState
    );

    const handleTabClick = (tabName: string) => {
        setSelectedTab(tabName);
    };

    return (
        <Wrapper>
            <ContentTabHeader>
                <ContentHeaderTab>
                    <ContentTabList>
                        <ContentTabListItem>
                            <ContentTabListItemSpan
                                onClick={() =>
                                    handleTabClick("user-predictions")
                                }
                                selected={selectedTab === "user-predictions"}
                            >
                                {userPageInfo.userName} 님이 쓴 예측글
                            </ContentTabListItemSpan>
                        </ContentTabListItem>
                        <ContentTabListItem>
                            <ContentTabListItemSpan
                                onClick={() =>
                                    handleTabClick("user-subscriptions")
                                }
                                selected={selectedTab === "user-subscriptions"}
                            >
                                {userPageInfo.userName} 님의  구독 정보
                            </ContentTabListItemSpan>
                        </ContentTabListItem>
                    </ContentTabList>
                </ContentHeaderTab>
            </ContentTabHeader>

            {selectedTab === "user-predictions" && (
                <PredictList currentPage={userPagePredictList} />
            )}
            {selectedTab === "user-subscriptions" && <MySubscribeList />}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-bottom: 30px;
`;
const ContentTabHeader = styled.div`
    display: flex;
`;
const ContentHeaderTab = styled.nav`
    flex: 1;
    display: block;
`;
const ContentTabList = styled.ul`
    display: flex;
    list-style: none;
    //   margin-block-style: 1em;
    //   margin-block-end: 1em;
    //   margin-inline-start: 0px;
    //   margin-inline-end: 0px;
    // padding-inline-start: 40px;
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
    color: ${({ selected }) => (selected ? "black" : "rgba(8, 8, 8, 0.5)")};
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
`;

export default UserContentHeader;
