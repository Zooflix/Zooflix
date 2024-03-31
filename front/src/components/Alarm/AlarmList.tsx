import { useEffect, useState } from "react";
import { getAlarmList } from "../../apis/api/Alarm";
import { userIdState } from "../../Store/UserState";
import { useRecoilState } from "recoil";
import styled from "styled-components";

interface Alarm {
  content: string;
  createdAt: string;
}

function formatTime(createdAt: string) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime());
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  return `${diffHours}시간 전`;
}

function AlarmList() {
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const [userId, setUserId] = useRecoilState(userIdState);

  useEffect(() => {
    handleAlarmList();
  }, []);

  const handleAlarmList = async () => {
    try {
      const list: Alarm[] = await getAlarmList(userId);
      if (list.length === 0) {
        setAlarmList([]);
      } else {
        setAlarmList(list.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      {alarmList.length === 0 ? (
        <p className="noalarm">📌현재 알람이 존재하지 않습니다!</p>
      ) : (
        alarmList.map((alarm, index) => (
          <Container key={index}>
            <p>{alarm.content}</p>
            <p className="time">{formatTime(alarm.createdAt)}</p>
          </Container>
        ))
      )}
    </Wrapper>
  );
}

export default AlarmList;

const Wrapper = styled.div`
  p {
    color: white;
    padding: 0px 20px;
  }

  .noalarm {
    margin-top: 20%;
    text-align: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .time {
    color: gray;
  }
`;
