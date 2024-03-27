import { useEffect, useState } from "react";
import { getAlarmList } from "../../apis/api/Alarm";
import { userNoState } from "../../Store/UserState";
import { useRecoilState } from "recoil";
import styled from "styled-components";

function AlarmList() {
  const [alarmList, setAlarmList] = useState<any[]>([]);
  const [userNo, setUserNo] = useRecoilState(userNoState);

  useEffect(() => {
    handleAlarmList();
  }, []);

  const handleAlarmList = async () => {
    try {
      // const list = await getAlarmList(userNo);
      // setAlarmList(list);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <p>내일은 정기구독일 ㅋㅋ</p>
    </Wrapper>
  );
}

export default AlarmList;

const Wrapper = styled.div`
  p {
    color: white;
    padding: 10px 20px;
  }
`;
