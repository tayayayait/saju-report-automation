import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export function useSettings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

  const toggleApiKeyVisibility = () => setShowApiKey(!showApiKey);

  const saveApiSettings = async () => {
    // In a real app, this would save to a secure backend or encrypted local storage
    toast({
      title: "설정 저장 완료",
      description: "API 키 설정이 성공적으로 업데이트되었습니다.",
    });
  };

  const testConnection = async () => {
    toast({
      title: "연결 테스트",
      description: "API 키 연결이 정상적으로 확인되었습니다.",
    });
  };

  const updateUserRole = (email: string, newRole: string) => {
    toast({
      title: "권한 변경",
      description: `${email}의 권한이 ${newRole}(으)로 변경되었습니다.`,
    });
  };

  return {
    showApiKey,
    toggleApiKeyVisibility,
    apiKey,
    setApiKey,
    saveApiSettings,
    testConnection,
    updateUserRole
  };
}
