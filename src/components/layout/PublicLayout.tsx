import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * PublicLayout: /saju 등 공개 페이지의 래퍼.
 * Stitch 생성 화면이 자체 헤더/푸터를 포함하므로, 
 * 이 래퍼는 최소한의 투명 컨테이너 역할만 합니다.
 */
export function PublicLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children || <Outlet />}
    </>
  );
}
