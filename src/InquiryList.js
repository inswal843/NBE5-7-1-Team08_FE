import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";

function InquiryList() {
  const navigate = useNavigate();
  const [inquires, setInquires] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    totalPages: 0,
  });

  const fetchInquiries = (page = 0) => {
    fetch(`http://localhost:8080/inq/page?page=${page}&offset=10`)
    .then((data) => data.json())
    .then((res) => {
      setInquires(res.content);
      setPageInfo({
        pageNumber: res.pageable.pageNumber,
        totalPages: res.totalPages,
      });
    })
    .catch((err) => console.error("문의 목록 불러오기 실패:", err));
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const renderPageNumbers = () => {
    const total = pageInfo.totalPages;
    const current = pageInfo.pageNumber;
    const pages = [];

    const startPage = Math.max(0, current - 8);
    const endPage = Math.min(total - 1, current + 8);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const viewInquiry = (inquiryId) => {
    navigate(`/inq/${inquiryId}`);
  };

  const goToCreatePage = () => {
    navigate("/inq/create");
  };

  return (
      <div style={{
        backgroundColor: "#ddd",
        minHeight: "100vh",
        padding: "2rem"
      }}>
        <div className="container">
          <div
              className="d-flex justify-content-between align-items-center mb-4"
              style={{position: 'relative'}}>
            <h1 className="m-0 mx-auto text-center" style={{flexGrow: 1}}>문의
              게시판</h1>
            <div className="d-flex align-items-center"
                 style={{position: 'absolute', right: 0}}>
              <button className="btn btn-outline-secondary me-2"
                      onClick={() => navigate('/inq/create')}>
                문의하기
              </button>
              <button className="btn btn-dark" onClick={() => navigate('/')}>
                홈으로
              </button>
            </div>
          </div>

          <div className="table-responsive"
               style={{margin: "0 auto"}}>
            <table className="table table-striped table-hover table-sm">
              <thead className="table-dark">
              <tr>
                <th style={{textAlign: "center", width: "60px"}}>번호</th>
                <th style={{textAlign: "center", whiteSpace: "nowrap"}}>제목</th>
                <th style={{textAlign: "center", width: "120px"}}>이름</th>
                <th style={{textAlign: "center", width: "120px"}}>수정일</th>
                <th style={{textAlign: "center", width: "120px"}}>생성일</th>
              </tr>
              </thead>
              <tbody>
              {inquires.map((inquiry, index) => (
                  <tr key={inquiry.inquiryId} style={{cursor: "pointer"}}
                      onClick={() => viewInquiry(inquiry.inquiryId)}>
                    <td style={{
                      textAlign: "center",
                      whiteSpace: "nowrap"
                    }}>{index + 1 + pageInfo.pageNumber * 10}</td>
                    <td style={{
                      textAlign: "center",
                      whiteSpace: "nowrap"
                    }}>{inquiry.title}</td>
                    <td style={{
                      textAlign: "center",
                      whiteSpace: "nowrap"
                    }}>{inquiry.name}</td>
                    <td style={{
                      textAlign: "center",
                      whiteSpace: "nowrap"
                    }}>{dayjs(
                        inquiry.updatedAt).format('YYYY-MM-DD')}</td>
                    <td style={{
                      textAlign: "center",
                      whiteSpace: "nowrap"
                    }}>{dayjs(
                        inquiry.createdAt).format('YYYY-MM-DD')}</td>
                  </tr>
              ))}
              </tbody>

            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination" style={{
                width: "100%",
                maxWidth: "800px",
                justifyContent: "center",
                padding: "0 1rem",  // 좌우 여백을 추가하여 화면 크기 조정에 따라 버튼이 보이도록 함
                boxSizing: "border-box",
              }}>
                {/* 이전 버튼 */}
                <li className={`page-item ${pageInfo.pageNumber === 0
                    ? "disabled" : ""}`}>
                  <button
                      className="page-link"
                      style={{
                        color: "#555",
                        border: "1px solid #ddd",
                        borderRadius: "5px", // 버튼 모서리 둥글게
                        padding: "6px 12px", // 여백 추가
                        margin: "0 3px", // 버튼 사이 간격
                      }}
                      onMouseOver={(e) => (e.target.style.color = "#333")}
                      onMouseOut={(e) => (e.target.style.color = "#555")}
                      onClick={() => fetchInquiries(pageInfo.pageNumber - 1)}
                  >
                    &lt;
                  </button>
                </li>

                {/* 동적 페이지 번호 */}
                {renderPageNumbers().map((page) => (
                    <li
                        key={page}
                        className={`page-item ${pageInfo.pageNumber === page
                            ? "active" : ""}`}
                        style={{
                          borderRadius: "5px", // 버튼 모서리 둥글게
                        }}
                    >
                      <button
                          className="page-link"
                          style={{
                            color: pageInfo.pageNumber === page ? "#fff"
                                : "#555",
                            backgroundColor: pageInfo.pageNumber === page
                                ? "#333" : "transparent",
                            border: "1px solid #ddd", // 테두리 추가
                            borderRadius: "5px", // 버튼 모서리 둥글게
                            padding: "6px 12px", // 여백 추가
                            margin: "0 3px", // 버튼 사이 간격
                          }}
                          onMouseOver={(e) => {
                            if (pageInfo.pageNumber
                                !== page) {
                              e.target.style.color = "#333";
                            }
                          }}
                          onMouseOut={(e) => {
                            if (pageInfo.pageNumber
                                !== page) {
                              e.target.style.color = "#555";
                            }
                          }}
                          onClick={() => fetchInquiries(page)}
                      >
                        {page + 1}
                      </button>
                    </li>
                ))}

                {/* 다음 버튼 */}
                <li className={`page-item ${pageInfo.pageNumber
                === pageInfo.totalPages - 1 ? "disabled" : ""}`}>
                  <button
                      className="page-link"
                      style={{
                        color: "#555",
                        border: "1px solid #ddd",
                        borderRadius: "5px", // 버튼 모서리 둥글게
                        padding: "6px 12px", // 여백 추가
                        margin: "0 3px", // 버튼 사이 간격
                      }}
                      onMouseOver={(e) => (e.target.style.color = "#333")}
                      onMouseOut={(e) => (e.target.style.color = "#555")}
                      onClick={() => fetchInquiries(pageInfo.pageNumber + 1)}
                  >
                    &gt;
                  </button>
                </li>
              </ul>
            </nav>
          </div>


        </div>
      </div>
  );
}

export default InquiryList;
