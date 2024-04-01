import { useState } from "react";
import styled from "styled-components";
import MySubscribeList from "../Mypage/MySubscribeList";
import PredictList from "../Predict/PredictList";
import { useRecoilState } from "recoil";
import { userPageInfoState, userPagePredictListState } from "../../Store/UserPageState";
import UserSubscribeList from "./UserSubscribeList";

function UserContentHeader() {
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
                                onClick={() => handleTabClick("user-predictions")}
                                selected={selectedTab === "user-predictions"}
                            >
                                <Button>{userPageInfo.userName} 님이 쓴 예측글</Button>
                            </ContentTabListItemSpan>
                        </ContentTabListItem>
                        <ContentTabListItem>
                            <ContentTabListItemSpan
                                onClick={() =>handleTabClick("user-subscriptions")}
                                selected={selectedTab === "user-subscriptions"}
                            >
                                <Button>{userPageInfo.userName} 님의  구독 정보</Button>
                            </ContentTabListItemSpan>
                        </ContentTabListItem>
                    </ContentTabList>
                </ContentHeaderTab>
            </ContentTabHeader>
            <List>
            {selectedTab === "user-predictions" && (
                <PredictList currentPage={userPagePredictList} />
            )}
            </List>
            {selectedTab === "user-subscriptions" && <UserSubscribeList />}
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
const List = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin: 0 10px;
  border: 2px solid black;
  border-bottom: none;
  padding: 10px 7px;
  border-radius: 10px 10px 0 0;
  background-color: transparent;
`;

export default UserContentHeader;
