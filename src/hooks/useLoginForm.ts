import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useLoginForm() {
  const { session, signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lockedUntil && Date.now() < lockedUntil) {
      const remainingMinutes = Math.ceil((lockedUntil - Date.now()) / 60000);
      setError(`로그인 실패 초과. ${remainingMinutes}분 후 다시 시도해주세요.`);
      return;
    } else if (lockedUntil && Date.now() >= lockedUntil) {
      setLockedUntil(null);
      setFailedAttempts(0);
    }

    setError('');
    setSubmitting(true);
    const { error } = await signIn(email, password);
    
    if (error) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        const lockTime = Date.now() + 5 * 60 * 1000; // 5 mins
        setLockedUntil(lockTime);
        setError('로그인 3회 실패로 5분간 로그인할 수 없습니다.');
      } else {
        setError(`이메일 또는 비밀번호가 올바르지 않습니다. (${newAttempts}/3)`);
      }
    } else {
      setFailedAttempts(0);
      setLockedUntil(null);
    }
    setSubmitting(false);
  };

  return {
    session,
    loading,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    error,
    submitting,
    lockedUntil,
    handleSubmit
  };
}
