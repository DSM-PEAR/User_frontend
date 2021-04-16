import React, { useEffect, useState } from "react";
import { request, useRefresh } from "../../../utils/axios/axios";
import * as S from "../../styled/ViewReport/MainStyle";
import ReportHeader from "./ReportHeader";
import ReportView from "./ReportView";
import ReportComment from "./ReportComment";
import ReportLanguage from "./ReportLanguage";
import Header from "../../Main/Header";
import ReportTeam from "./ReportTeam";

function MainReport(props) {
  const [reportData, setReportData] = useState([]);
  const [loding, setLoding] = useState(null);
  const [error, setError] = useState(null);
  //토큰 검사
  const refreshHandler = useRefresh();

  useEffect(() => {
    //보고서 내용
    const getReportView = async () => {
      try {
        loding(true);
        const data = await request(
          "get",
          `/report/${props.reportId}`,
          { Authorization: `Bearer ${localStorage.getItem("access-token")}` },
          0
        );

        setReportData(data.reportData);
        
      } catch (e) {
        console.error(e);
        switch (e.data.status) {
          case 400:
            alert("프로필 불러오기를 실패했습니다.");
            break;
          case 403:
            refreshHandler().then(() => {
              getReportView();
            });
            break;
          default:
            break;
        }
      }
      setLoding(false);
      setError(null);
    };

    getReportView();
  });

  if (loding) return <div>로딩중</div>;
  if (error) return <div>에러입니다</div>;
  if (!reportData) return <div>서버좀 줘라</div>;

  return (
    <S.Main>
      <Header></Header>
      <S.MainBox>
        <ReportHeader
          team={reportData.type}
          grade={reportData.grade}
          subject={reportData.field}
          title={reportData.title}
          date={reportData.createdAt}
        />
        <ReportView
          title={reportData.title}
          text={reportData.description}
          git="{reportData.github}"
          file={reportData.fileName}
        />
        <ReportTeam />j
        <ReportLanguage languages={reportData.languages} />
        <ReportComment
          name={reportData.comment.userName}
          email={reportData.comment.userEmail}
          content={reportData.comment.content}
          commentId={reportData.comment.commentId}
          isMain={reportData.comment.isMain}
          createdAt={reportData.comment.createdAt}
        />
      </S.MainBox>
    </S.Main>
  );
}

export default MainReport;
