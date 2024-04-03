import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { getJwtUserNo } from "../../apis/utils/jwt";
import {
  selectedPdNoState,
  selectUserNoState,
  selectStockNameState,
  selectUserNameState,
  ModalUserNoState,
  ModalUserNameState,
} from "../../Store/PredictState";
import { useNavigate } from "react-router-dom";

import Deletebtn from "../../assets/img/button/Deletebtn.svg";
import Reportbtn from "../../assets/img/button/Reportbtn.svg";
import Feedbtn from "../../assets/img/button/Feedbtn.svg";
import FeedOpenbtn from "../../assets/img/button/FeedOpenbtn.svg";
import UserDetailModal from "./UserDetailModal";
import ReportModal from "./ReportModal";
import DeleteModal from "./DeleteModal";

interface FeedProps {
  pdUpDown: boolean;
  pdResult: string;
}

type PredictProps = {
  currentPage: any[];
};

const Click = styled.div`
  display: none;
  padding: 20px 30px 20px 30px;
  flex-direction: column;
`;

const ClickWithOpen = styled(Click)<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
`;

function PredictList(props: PredictProps) {
  const navigate = useNavigate();
  const [userNo, setUserNo] = useState(0);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [deletePdResult, setDeletePdResult] = useState(true);
  const [selectUserNo, setSelectUserNo] = useRecoilState(selectUserNoState);
  const [selectStockName, setSelectStockName] =
    useRecoilState(selectStockNameState);
  const [selectUserName, setSelectUserName] =
    useRecoilState(selectUserNameState);

  const [ModalUserNo, setModalUserNo] = useRecoilState(ModalUserNoState);
  const [ModalUserName, setModalUserName] = useRecoilState(ModalUserNameState);

  const [selectedPdNo, setSelectedPdNo] = useRecoilState(selectedPdNoState);

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

  useEffect(() => {
    setOpenItems([]);
    let no = 0;
    try {
      no = getJwtUserNo();
    } catch (error) {
      no = 0;
    }
    setUserNo(no);
  }, [props.currentPage]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (userName: string, userNo: number) => {
    setModalUserName(userName);
    setModalUserNo(userNo);
    setIsModalOpen(true);
  };

  //신고모달 : 2
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const openModal2 = (userNo: number, pdNo: number) => {
    let no = 0;
    try {
      no = getJwtUserNo();
    } catch (error) {
      no = 0;
    }
    if (no === 0) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    setIsModalOpen2(true);
  };

  //삭제 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteModal = (pdNo: number, pdResult: string) => {
    setSelectedPdNo(pdNo);
    if (pdResult === null) {
      setDeletePdResult(false);
    } else {
      setDeletePdResult(true);
    }
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const closeModal2 = () => setIsModalOpen2(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

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
              <p style={{ width: "150px" }}>{item.stockName}</p>
              <p
                style={{ width: "120px", cursor: "pointer" }}
                onClick={() => openModal(item.userName, item.userNo)}
              >
                <b>{item.userName}</b>
              </p>
              <p style={{ width: "110px" }}>{item.pdDate}</p>
              <p style={{ width: "130px" }}>
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
              <Result
                style={{
                  color: item.pdResult === "성공" ? "#00D208" : "#B7B7B7",
                  borderColor:
                    item.pdResult === "성공"
                      ? "rgba(115, 227, 105, 0.3)"
                      : "rgba(183, 183, 183, 0.3)",
                  borderStyle:
                    item.pdResult === "성공" || item.pdResult === "실패"
                      ? "solid"
                      : "none",
                  backgroundColor:
                    item.pdResult === "성공" || item.pdResult === "실패"
                      ? "white"
                      : "transparent",
                }}
              >
                {item.pdResult}
              </Result>

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
            <ClickWithOpen isOpen={openItems.includes(item.pdNo)}>
              <Content>{item.pdContent}</Content>
              <FeedIcon>
                {userNo === item.userNo ? (
                  <img
                    src={Deletebtn}
                    alt="삭제"
                    onClick={() => deleteModal(item.pdNo, item.pdResult)}
                  />
                ) : (
                  <img
                    src={Reportbtn}
                    alt="신고"
                    onClick={() => openModal2(item.userNo, item.pdNo)}
                  />
                )}
              </FeedIcon>
            </ClickWithOpen>
          </Feed>
        ))}
      {/* 모달 */}
      {props.currentPage && (
        <>
          <UserDetailModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            userName={ModalUserName}
            userNo={ModalUserNo}
          />
          <ReportModal
            isModalOpen={isModalOpen2}
            closeModal={closeModal2}
            userNo={selectUserNo}
            pdNo={selectedPdNo}
          />
          <DeleteModal
            isModalOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            pdNo={selectedPdNo}
            pdResult={deletePdResult}
          />
        </>
      )}
    </Wrapper>
  );
}

export default PredictList;
const Wrapper = styled.div`
  padding: 20px;
`;

const Feed = styled.div<FeedProps>`
  width: 45vw;
  border-radius: 15px;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  padding: 3px;
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
  align-items: center;
  justify-content: space-evenly;
  p {
    width: "100px";
    text-align: center;
  }
`;

const FeedIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  img {
    cursor: pointer;
  }
`;

const Content = styled.div`
  overflow: hidden;
`;

const Result = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  margin-right: 10px;
  font-size: 13px;
  border-radius: 9px;
  height: 20px;
  border-width: 2px;
  font-weight: bold;
`;
