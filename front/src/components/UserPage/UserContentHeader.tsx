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
                                <Button selected={selectedTab === "user-predictions"}>
                                    {userPageInfo.userName} 님이 쓴 예측글
                                </Button>
                            </ContentTabListItemSpan>
                        </ContentTabListItem>
                        <ContentTabListItem>
                            <ContentTabListItemSpan
                                onClick={() =>handleTabClick("user-subscriptions")}
                                selected={selectedTab === "user-subscriptions"}
                            >
                                <Button selected={selectedTab === "user-subscriptions"}>
                                    {userPageInfo.userName} 님의  구독 정보
                                </Button>
                            </ContentTabListItemSpan>
                        </ContentTabListItem>
                    </ContentTabList>
                </ContentHeaderTab>
            </ContentTabHeader>
            <List>
            {selectedTab === "user-predictions" && (
                <PredictList currentPage={userPagePredictList} />
            )}
            {selectedTab === "user-subscriptions" && <UserSubscribeList />}
            </List>
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
const ContentTabList = styled.div`
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
const ContentTabListItemSpan = styled.div<{ selected: boolean }>`
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
  border: 1px solid #e7e7e7;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 10px;
  height: 550px;
  overflow: auto;
`;

const Button = styled.button<{ selected: boolean }>`
  margin: 0 10px;
  border: 1px solid #e7e7e7;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  border-bottom: none;
  padding: 10px 7px;
  border-radius: 10px 10px 0 0;
  background-color: ${({ selected }) => (selected ? "black" : "transparent")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  &:hover {
    background-color: black;
    color: white;
  }
`;

export default UserContentHeader;
