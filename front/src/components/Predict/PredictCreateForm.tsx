import styled from "styled-components";
import PredictInput from "./PredictInput";
import { useState, useEffect } from "react";
import PredictReasonInput from "./PredictReasonInput";

function PredictCreateForm() {
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const minDateString = today.toISOString().split("T")[0];
    const maxDateString = nextMonth.toISOString().split("T")[0];

    setMinDate(minDateString);
    setMaxDate(maxDateString);
  }, []);

  return (
    <Wrapper>
      <PredictInput text="종목" type="text" />
      <PredictInput text="예측날짜" type="date" min={minDate} max={maxDate} />
      <PredictInput text="예측가" type="number" />
      <PredictReasonInput />
    </Wrapper>
  );
}

export default PredictCreateForm;

const Wrapper = styled.div`
  width: 1000px;
  height: 570px;
  border: none;
  border-radius: 30px;
  margin-left: 300px;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
`;
