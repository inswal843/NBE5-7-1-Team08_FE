import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";  // 추가

function InquiryDetail() {
  const navigate = useNavigate();
  const {inquiryId} = useParams(); // URL에서 inquiryId 받아오기
  const [inquiry, setInquiry] = useState(null);
  // const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/inq?inquiryId=${inquiryId}`)
    .then((res) => res.json())
    .then((data) => {
      setInquiry(data);
    })
    .catch((err) => console.error("문의 불러오기 실패:", err));
  }, [inquiryId]);

  // const handleEditClick = () => {
  //   navigate(`/inq/edit/${inquiryId}`);
  // };

  if (!inquiry) {
    return <div>Loading...</div>;
  }

  return (
      <><h5>{inquiry.title}</h5>
        <table className="table">
          <tbody>
          <tr>
            <th style={{width: "120px"}}>이름</th>
            <td>{inquiry.name}</td>
          </tr>
          <tr>
            <th>질문</th>
            <td>{inquiry.question}</td>
          </tr>
          <tr>
            <th>등록일</th>
            <td>{dayjs(inquiry.createdAt).format('YYYY-MM-DD HH:mm')}</td>
          </tr>
          <tr>
            <th>수정일</th>
            <td>{dayjs(inquiry.updatedAt).format('YYYY-MM-DD HH:mm')}</td>
          </tr>
          <tr>
            <th>답변</th>
            <td>{inquiry.answer || "아직 답변이 없습니다."}</td>
          </tr>
          </tbody>
        </table>
      </>
  );
}

export default InquiryDetail;
