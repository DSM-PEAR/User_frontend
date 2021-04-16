import React from 'react';
import * as S from '../../styled/ViewReport/style';
import ReportGrade from "../ReportGrade";
import Categorybar from '../Category/Categorybar';
import MainProject from '../MainProject';
import Header from '../../Main/Header';
//import { request } from '../../../utils/axios/axios';

function ReportWeb() {
    return (
      <S.Main>
        <Header></Header>
        <S.Cover>
          <div className="coverCategory">
            <ReportGrade grade="1" />
            <Categorybar/>
          </div>
          <MainProject/>
        </S.Cover>
      </S.Main>
    );
  }
  
  export default ReportWeb;