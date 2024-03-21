import styled from "styled-components";

type InputProps = {
  text: string;
  type: string;
  placeholder: string;
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
        placeholder={props.placeholder}
        required aria-required="true"
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
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding: 0 30px;
  }

  input[type='date']::before {
    content: attr(placeholder);
    width: 100%;
  }

  input[type='date']:focus::before,
  input[type='date']:valid::before {
    display: none;
  }

  .small-title {
    width: 70px;
    font-weight: bold;
    padding: 5px 30px;
    display: flex;
    align-items: center;
  }
`;
