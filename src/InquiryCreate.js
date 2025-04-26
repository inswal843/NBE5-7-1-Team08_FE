import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function InquiryCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const inquiryData = {
      title,
      name,
      question
    };

    fetch("http://localhost:8080/inq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inquiryData),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("서버에 문의 등록 실패");
      }
      alert("문의가 성공적으로 등록되었습니다!");
      // 성공하면 목록으로 이동하거나 초기화
      navigate('/inq/page')
    })
    .catch((err) => {
      console.error("문의 등록 실패:", err);
      alert("등록 실패!");
    });
  };

  return (
      <div className="container mt-4">
        <h2>문의 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">제목</label>
            <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">이름</label>
            <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">질문</label>
            <textarea
                className="form-control"
                rows="5"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">등록</button>
        </form>
      </div>
  );
}

export default InquiryCreate;
