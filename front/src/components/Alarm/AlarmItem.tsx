import styled from "styled-components";
import { useEffect, useState } from "react";

interface userProps {
  senderId: number;
  nickname: string;
  type: string;
  time: string;
}

function AlarmItem({ senderId, nickname, type, time }: userProps) {
  const [timediff, setTimediff] = useState("");
  useEffect(() => {
    if (time !== null && time !== undefined) {
      calcTimeDiff();
    }
  }, [time]);

  function calcTimeDiff() {
    const date = new Date(time.substring(0, 19));
    const now = new Date();
    const diff = Math.abs(date.getTime() - now.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) {
      if (days < 7) {
        setTimediff(`${days}일 전`);
      } else {
        setTimediff(`${date}`);
      }
    } else if (hours > 0) {
      setTimediff(`${hours}시간 전`);
    } else if (minutes > 0) {
      setTimediff(`${minutes}분 전`);
    } else {
      setTimediff(`${seconds}초 전`);
    }
  }

  return <div></div>;
}

export default AlarmItem;
