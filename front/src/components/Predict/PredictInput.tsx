import styled from "styled-components";

type InputProps = {
  text: string;
  type: string;
  min?: string;
  max?: string;
};

function PredictCostInput(props: InputProps) {
  return (
    <Wrapper>
      <label className="small-title">{props.text}</label>
      <input
        type={props.type}
        min={props.min}
        max={props.max}
        onChange={(e) => {
          if (props.type === "date" && (props.min || props.max)) {
            const selectedDate = new Date(e.target.value);
            const minDate = props.min ? new Date(props.min) : null;
            const maxDate = props.max ? new Date(props.max) : null;

            if (
              (minDate && selectedDate < minDate) ||
              (maxDate && selectedDate > maxDate)
            ) {
              e.target.value = "";
            }
          }
        }}
      />
    </Wrapper>
  );
}

export default PredictCostInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 10px;

  input {
    width: 300px;
    height: 40px;
    border: none;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    padding-left: 30px;
  }

  .small-title {
    font-weight: bold;
    padding: 5px 30px;
  }
`;
