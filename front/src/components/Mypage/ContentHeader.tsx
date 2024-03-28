import { useState } from "react";
import styled from "styled-components";
import MyPredictList from "./MyPredictList";
import MySubscribeList from "./MySubscribeList";
import PredictList from "../../components/Predict/PredictList";
import { useRecoilState } from "recoil";
import { myPagePredictListState } from "../../Store/MyPageState";

interface ContentHeaderProps {}

function ContentHeader(props: ContentHeaderProps) {
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
                내가 쓴 예측 글
              </ContentTabListItemSpan>
            </ContentTabListItem>
            <ContentTabListItem>
              <ContentTabListItemSpan
                onClick={() => handleTabClick("my-subscriptions")}
                selected={selectedTab === "my-subscriptions"}
              >
                내 구독 정보
              </ContentTabListItemSpan>
            </ContentTabListItem>
          </ContentTabList>
        </ContentHeaderTab>
      </ContentTabHeader>

      {selectedTab === "my-predictions" && <PredictList currentPage={myPagePredictList} />}
      {selectedTab === "my-subscriptions" && <MySubscribeList />}
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

export default ContentHeader;
