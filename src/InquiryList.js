import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";  // 추가

function InquiryList() {
  const navigate = useNavigate();
  const [inquires, setInquires] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    totalPages: 0,
  });

  const fetchInquiries = (page = 0) => {
    fetch(
        `http://localhost:8080/inq/page?page=${page}&offset=10`)
    .then((data) => data.json())
    .then((res) => {
      setInquires(res.content);
      setPageInfo({
        pageNumber: res.pageable.pageNumber,
        totalPages: res.totalPages
      })

    })
    .catch((err) => console.error("문의 목록 불러오기 실패:", err));
  }

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
  }

  return (
      <div className="container mt-4">
        <div
            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">문의 목록</h1>
          <button className="btn btn-primary" onClick={goToCreatePage}>
            문의 등록
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>이름</th>
              <th>수정일</th>
              <th>생성일</th>
            </tr>
            </thead>
            <tbody>
            {inquires.map((inquiry, index) => (
                <tr key={inquiry.inquiryId} style={{cursor: "pointer"}}
                    onClick={() => viewInquiry(inquiry.inquiryId)}>
                  <td>{index + 1 + pageInfo.pageNumber * 10}</td>
                  <td>{inquiry.title}</td>
                  <td>{inquiry.name}</td>
                  <td>{dayjs(inquiry.updatedAt).format('YYYY-MM-DD HH:mm')}</td>
                  <td>{dayjs(inquiry.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        {/* 페이지네이션 */}
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination" style={{ width: "100%", maxWidth: "800px", justifyContent: "center" }}>
            {/* 이전 버튼 */}
            <li className={`page-item ${pageInfo.pageNumber === 0 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => fetchInquiries(pageInfo.pageNumber - 1)}>
                &lt;
              </button>
            </li>

            {/* 동적 페이지 번호 */}
            {renderPageNumbers().map((page) => (
                <li key={page} className={`page-item ${pageInfo.pageNumber === page ? "active" : ""}`}>
                  <button className="page-link" onClick={() => fetchInquiries(page)}>
                    {page + 1}
                  </button>
                </li>
            ))}

            {/* 다음 버튼 */}
            <li className={`page-item ${pageInfo.pageNumber === pageInfo.totalPages - 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => fetchInquiries(pageInfo.pageNumber + 1)}>
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
  );
}

export default InquiryList;
