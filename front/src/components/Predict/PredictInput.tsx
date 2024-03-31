import styled from "styled-components";

type InputProps = {
    text: string;
    type: string;
    placeholder?: string;
    min?: string;
    max?: string;
    onPriceChange?: (value: number) => void;
    onDateChange?: (value: string) => void;
};

function PredictCostInput(props: InputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, type, min, max } = e.target;
        if (type === "date" && (min || max)) {
            const selectedDate = new Date(value);
            const minDate = min ? new Date(min) : null;
            const maxDate = max ? new Date(max) : null;

            if (
                (minDate && selectedDate < minDate) ||
                (maxDate && selectedDate > maxDate)
            ) {
                e.target.value = "";
                return;
            }
        }

        if (type === "date") {
            props.onDateChange?.(e.target.value);
        } else {
            props.onPriceChange?.(parseInt(e.target.value));
        }
    };

    return (
        <Wrapper>
            <label className="small-title">{props.text}</label>
            <input
                type={props.type}
                min={props.min}
                max={props.max}
                required
                aria-required="true"
                onChange={handleChange}
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
        margin-right: 20px;
    }

    input[type="date"]::before {
        content: attr(data-placeholder);
        width: 100%;
    }

    input[type="date"]:focus::before,
    input[type="date"]:valid::before {
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
