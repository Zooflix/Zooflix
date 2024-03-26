import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";

import { deletePredict } from "../../apis/api/Predict";
import { selectUserNoState } from "../../Store/PredictState";
import { selectStockNameState } from "../../Store/PredictState";
import { selectUserNameState } from "../../Store/PredictState";

import Deletebtn from "../../assets/img/button/Deletebtn.svg";
import Reportbtn from "../../assets/img/button/Reportbtn.svg";
import Feedbtn from "../../assets/img/button/Feedbtn.svg";
import FeedOpenbtn from "../../assets/img/button/FeedOpenbtn.svg";
import UserDetailModal from "./UserDetailModal";

type FeedProps = {
  pdUpDown: boolean;
  pdResult: string;
};

type PredictProps = {
  currentPage: any[];
};

function PredictList(props: PredictProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectUserNo, setSelectUserNo] = useRecoilState(selectUserNoState);
  const [selectStockName, setSelectStockName] =
    useRecoilState(selectStockNameState);
  const [selectUserName, setSelectUserName] =
    useRecoilState(selectUserNameState);

  const toggleContent = (
    pdNo: number,
    userNo: number,
    stockName: string,
    userName: string
  ) => {
    setSelectUserNo(userNo);
    setSelectStockName(stockName);
    setSelectUserName(userName);

    setOpenItems((prevState) => {
      if (prevState.includes(pdNo)) {
        return prevState.filter((item) => item !== pdNo);
      } else {
        return [pdNo];
      }
    });
  };

  const handleDelete = async (pdNo: number) => {
    const isConfirmed = window.confirm("글을 삭제하시겠습니까?");
    if (!isConfirmed) {
      return;
    }
    try {
      await deletePredict(pdNo);
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  useEffect(() => {
    setOpenItems([]);
  }, [props.currentPage]);

  interface ClickProps {
    isOpen: boolean;
  }

  const Click = styled.div<ClickProps>`
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    padding: 10px 30px 30px 30px;
    flex-direction: column;
  `;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (userName: string) => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <Wrapper>
      {props.currentPage &&
        props.currentPage.map((item) => (
          <Feed
            key={item.pdNo}
            pdUpDown={item.pdUpDown}
            pdResult={item.pdResult}
          >
            <Noncllick>
              {/* 모달 */}
              <UserDetailModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                userName={item.userName}
              />
              <p style={{ width: "100px" }}>{item.stockName}</p>
              <p
                style={{ width: "100px" }}
                onClick={() => openModal(item.userName)}
              >
                {item.userName}
              </p>

              <p style={{ width: "100px" }}>{item.pdDate}</p>
              <p style={{ width: "100px" }}>
                {item.pdValue}
                <span
                  style={{
                    color: item.pdUpDown ? "red" : "blue",
                    marginLeft: "5px",
                  }}
                >
                  {item.pdUpDown ? "▲" : "▼"}
                </span>
              </p>

              <button
                onClick={() =>
                  toggleContent(
                    item.pdNo,
                    item.userNo,
                    item.stockName,
                    item.userName
                  )
                }
              >
                <img
                  src={openItems.includes(item.pdNo) ? FeedOpenbtn : Feedbtn}
                  alt="Feed Button"
                />
              </button>
            </Noncllick>

            <Click isOpen={openItems.includes(item.pdNo)}>
              <Content>{item.pdContent}</Content>
              <FeedIcon>
                <img
                  src={Deletebtn}
                  alt="삭제"
                  style={{ marginRight: "20px" }}
                  onClick={() => handleDelete(item.pdNo)}
                />
                <img src={Reportbtn} alt="신고" />
              </FeedIcon>
            </Click>
          </Feed>
        ))}
    </Wrapper>
  );
}

export default PredictList;
const Wrapper = styled.div``;

const Feed = styled.div<FeedProps>`
  width: 45vw;
  border-radius: 15px;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  background: ${(props) =>
    props.pdResult
      ? "linear-gradient(to bottom, #F0F0F0, #FFFFFF)"
      : props.pdUpDown
      ? "linear-gradient(to bottom, #FFF3F3, #FFFFFF)"
      : "linear-gradient(to bottom, #F3FAFF, #FFFFFF)"};

  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const Noncllick = styled.div`
  display: flex;
  justify-content: space-evenly;
  p {
    width: "100px";
    text-align: center;
  }
`;

const FeedIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  margin-top: 20px;
  img {
    cursor: pointer;
  }
`;

const Content = styled.div`
  overflow: hidden;
`;
