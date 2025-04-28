import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import CustomAlert from './CustomAlert';  // CustomAlert 컴포넌트 import

function InquiryDetail() {
  const navigate = useNavigate();
  const { inquiryId } = useParams(); // URL에서 inquiryId 받아오기
  const [inquiry, setInquiry] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);  // alert 메시지 상태 추가

  useEffect(() => {
    fetch(`http://localhost:8080/inq?inquiryId=${inquiryId}`)
      .then((res) => res.json())
      .then((data) => {
        setInquiry(data);
      })
      .catch((err) => {
        console.error("문의 불러오기 실패:", err);
        setAlertMessage("문의 불러오기 실패!");  // 오류 메시지
      });
  }, [inquiryId]);

  if (!inquiry) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: "#ddd", minHeight: "100vh", padding: "2rem" }}>
      <div className="container">
        {/* CustomAlert 컴포넌트 사용 */}
        {alertMessage && <CustomAlert message={alertMessage} onClose={() => setAlertMessage(null)} />}

        <div className="d-flex justify-content-between align-items-center mb-4" style={{ position: 'relative' }}>
          <h1 className="m-0 mx-auto text-center" style={{ flexGrow: 1 }}>문의 상세</h1>
          <div className="d-flex align-items-center" style={{ position: 'absolute', right: 0 }}>
            <button className="btn btn-outline-secondary me-2" onClick={() => navigate('/inq/page')}>문의 게시판</button>
            <button className="btn btn-dark" onClick={() => navigate('/')}>홈으로</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <table className="table table-bordered table-hover">
              <tbody>
                <tr>
                  <th style={{ textAlign: "center" }}>제목</th>
                  <td colSpan={5} style={{ textAlign: "center" }}>{inquiry.title}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>질문</th>
                  <td colSpan={5} style={{ textAlign: "center" }}>{inquiry.question}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>이름</th>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>{inquiry.name}</td>
                  <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>등록일</th>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {dayjs(inquiry.createdAt).format('YYYY-MM-DD HH:mm')}
                  </td>
                  <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>수정일</th>
                  <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                    {dayjs(inquiry.updatedAt).format('YYYY-MM-DD HH:mm')}
                  </td>
                </tr>
                <tr>
                  <th style={{ textAlign: "center" }}>답변</th>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    {inquiry.answer || "아직 답변이 없습니다."}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InquiryDetail;
