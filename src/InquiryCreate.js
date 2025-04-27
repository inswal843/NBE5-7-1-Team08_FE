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
      navigate('/inq/page');
    })
    .catch((err) => {
      console.error("문의 등록 실패:", err);
      alert("등록 실패!");
    });
  };

  return (
      <div style={{
        backgroundColor: '#ddd',
        minHeight: '100vh',
        padding: '2rem'
      }}>
        <div className="container">
          <div
              className="d-flex justify-content-between align-items-center mb-4"
              style={{position: 'relative'}}>
            <h1 className="m-0 mx-auto text-center" style={{flexGrow: 1}}>문의
              등록</h1>
            <div className="d-flex align-items-center"
                 style={{position: 'absolute', right: 0}}>
              <button className="btn btn-outline-secondary me-2"
                      onClick={() => navigate('/inq/page')}>문의 게시판
              </button>
              <button className="btn btn-dark"
                      onClick={() => navigate('/')}>홈으로
              </button>
            </div>
          </div>


          <div className="card mx-auto"
               style={{maxWidth: '600px', padding: '2rem'}}>
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

              <div className="d-flex justify-content-center mt-4">
                <button
                    type="submit"
                    className="btn btn-dark"
                    style={{width: '200px'}}
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}

export default InquiryCreate;
