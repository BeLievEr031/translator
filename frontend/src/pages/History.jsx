import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getHistory } from "../http/api";
import Table from "../components/Table";
import * as XLSX from "xlsx";

function History() {
  const { user } = useUser();
  const [historyData, setHistoryData] = useState([]);
  const [dFiletype, setDfileType] = useState("text");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    sort: "asc",
    totalPage: 0,
  });

  const downloadText = (data, fileName) => {
    const textContent = data.map((item) => JSON.stringify(item)).join("\n");
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.txt`;
    link.click();
  };

  const downloadJSON = (data, fileName) => {
    const jsonString = JSON.stringify(data, null, 2); // Pretty print
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.json`;
    link.click();
  };

  const downloadExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data); // Convert JSON to worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Append the worksheet

    XLSX.writeFile(workbook, `${fileName}.xlsx`); // Save the file
  };

  const handleDownload = () => {
    if (dFiletype === "text") {
      downloadText(historyData, "translate-history-TEXT");
    } else if (dFiletype === "json") {
      downloadJSON(historyData, "translate-history-JSON");
    } else {
      downloadExcel(historyData, "translate-history-EXCEL");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getHistory(
          user.id,
          pagination.page,
          pagination.limit,
          pagination.sort
        );

        // console.log(data);
        const { data } = result;
        console.log(data);
        setHistoryData([...data.histories]);

        if (pagination.totalPage === 0) {
          setPagination({
            ...pagination,
            totalPage: Math.ceil(data.totalCount / pagination.limit),
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [user, pagination]);

  const columns = [
    { key: "id", label: "ID" },
    { key: "from", label: "FROM WORD" },
    { key: "to", label: "TRANSLATED WORD" },
  ];

  return (
    <div className="container">
      <div className="history-box">
        <h1 style={{ padding: "10px" }}>History</h1>
        <div className="download-action">
          <select
            defaultValue={"text"}
            value={dFiletype}
            onChange={(e) => setDfileType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="excel">Excel</option>
            <option value="json">JSON</option>
          </select>

          <button onClick={handleDownload}>Download</button>
        </div>
        {historyData.length === 0 ? (
          "No Data found."
        ) : (
          <Table data={historyData} columns={columns} rowsPerPage={3} />
        )}

        <div className="pagination-cont">
          <button
            className="page-btn"
            disabled={pagination.page === 1}
            onClick={() =>
              setPagination({
                ...pagination,
                page: pagination.page - 1,
              })
            }
          >
            Prev
          </button>
          <div>{pagination.page}</div>
          <button
            className="page-btn"
            disabled={pagination.page === pagination.totalPage}
            onClick={() =>
              setPagination({
                ...pagination,
                page: pagination.page + 1,
              })
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default History;
