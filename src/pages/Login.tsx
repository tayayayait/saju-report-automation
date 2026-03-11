import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';

export default function Login() {
  const { session, signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  if (loading) return null;
  if (session) return <Navigate to="/" replace />;

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

  return (
    <div className="flex h-screen w-full font-display bg-[#F8F9FA]">
      {/* Left branding panel - 5fr */}
      <div className="hidden lg:flex lg:flex-[5] bg-[#1A2B3C] flex-col justify-between p-12 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-xl bg-[#E67E22] flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">사주 리포트 자동화</span>
          </div>

          <h1 className="text-5xl font-black text-white leading-[1.1] mb-6">
            The Modern<br />
            Analytics Suite<br />
            for Saju Experts
          </h1>
          <p className="text-lg text-slate-300 max-w-md font-medium leading-relaxed">
            Data Input → Verification → AI 생성 → Refinement → Publishing.<br />
            Complete your 5-step workflow in one unified workspace.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-white/10 w-max px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-semibold text-white/90">All systems operational</span>
          </div>
          <p className="text-sm text-slate-400/60 font-medium">
            © 2026 Saju Report System. Authorized Access Only.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#E67E22]/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
      </div>

      {/* Right login panel - 7fr */}
      <div className="flex-[7] flex flex-col items-center justify-center bg-white relative shadow-[-20px_0_40px_rgba(0,0,0,0.05)]">
        {/* Top status banner */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-gray-50 border-b border-gray-200 flex items-center justify-center px-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Version v2.4.1 (Stable)</p>
        </div>

        <div className="w-full max-w-[440px] px-8 py-12">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-[#1A2B3C] tracking-tight mb-3">다시 오신 것을 환영합니다</h2>
            <p className="text-base text-gray-500 font-medium">
              Enter your credentials to access the workspace.
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span className="text-sm font-bold text-rose-700">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-[#1A2B3C]">업무용 이메일</label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] outline-none text-base placeholder:text-gray-400 bg-white transition-all shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-bold text-[#1A2B3C]">Password</label>
                <a href="#" className="text-xs font-bold text-[#E67E22] hover:underline">비밀번호 찾기</a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] outline-none text-base placeholder:text-gray-400 bg-white transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || (lockedUntil !== null && Date.now() < lockedUntil)}
              className="w-full h-12 mt-4 rounded-lg bg-[#E67E22] hover:bg-[#D35400] active:bg-[#B34700] text-white font-bold text-base shadow-[0_4px_14px_0_rgba(230,126,34,0.39)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : '로그인'}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-xs font-medium text-gray-400">
              By signing in, you agree to our Terms of Service and Privacy Policy.<br />
              도움이 필요하신가요? <a href="#" className="text-[#1A2B3C] font-bold hover:underline">IT 지원팀 문의</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
