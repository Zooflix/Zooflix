import { useState } from "react";
import styled from "styled-components";
import MySubscribeList from "./MySubscribeList";
import PredictList from "../../components/Predict/PredictList";
import { useRecoilState } from "recoil";
import { myPagePredictListState } from "../../Store/MyPageState";

function ContentHeader() {
  const [selectedTab, setSelectedTab] = useState<string>("my-predictions");
  const [myPagePredictList, setMyPagePredictList] = useRecoilState(
    myPagePredictListState
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
                onClick={() => handleTabClick("my-predictions")}
                selected={selectedTab === "my-predictions"}
              >
                <Button>내가 쓴 예측 글</Button>
              </ContentTabListItemSpan>
            </ContentTabListItem>
            <ContentTabListItem>
              <ContentTabListItemSpan
                onClick={() => handleTabClick("my-subscriptions")}
                selected={selectedTab === "my-subscriptions"}
              >
                <Button>내 구독 정보</Button>
              </ContentTabListItemSpan>
            </ContentTabListItem>
          </ContentTabList>
        </ContentHeaderTab>
      </ContentTabHeader>
      <List>
        {selectedTab === "my-predictions" && (
          <PredictList currentPage={myPagePredictList} />
        )}
      </List>
      {selectedTab === "my-subscriptions" && <MySubscribeList />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 30px;
`;
const ContentTabHeader = styled.div`
  display: flex;
  border: 1px solid black;
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
`;

const Button = styled.button`
  margin: 0 10px;
  border: 2px solid black;
  border-bottom: none;
  padding: 10px 7px;
  border-radius: 10px 10px 0 0;
  background-color: transparent;
`;

export default ContentHeader;
