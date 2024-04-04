import AlarmItem from "./AlarmItem";

interface userProps {
  alarmList: {
    senderId: number;
    nickname: string;
    type: string;
    createdAt: string;
  }[];
}

function AlarmItemList({ alarmList }: userProps) {
  return (
    <>
      {alarmList.map((alarm, index) => (
        <AlarmItem
          key={index}
          senderId={alarm.senderId}
          nickname={alarm.nickname}
          time={alarm.createdAt}
          type={alarm.type}
        />
      ))}
    </>
  );
}

export default AlarmItemList;
