'use client';

import { Button } from "../../../components/Button";

export const SettingsButton = () => {

  // 설정 페이지로 이동하는 함수
  const handleSettings = () => {
    console.log('환경설정 버튼 클릭')
    // 여기는 페이지 이동말고 팝업 등으로 설정을 보여주면 될듯.
    // 모달 열기 (컴포넌트 추가 필요)
  };

  return (
    <Button text="Settings" onClick={handleSettings} />
  );
}