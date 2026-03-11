import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCustomerForm } from "@/hooks/useCustomerForm";
import { ArrowLeft, Clock, Save, AlertCircle } from "lucide-react";
import { NormalizationResultPanel } from "@/components/NormalizationResultPanel";
import { SiganSelector } from "@/components/SiganSelector";

export default function CustomerNew() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSuccess = (customerId: string) => {
    navigate(`/cases/new?customer=${customerId}`);
  };

  const {
    form, update, errors, saving, autoSaveStatus, hasErrors,
    sajuResult, setSajuResult, sajuLoading, handleCalculateSaju, handleSubmit
  } = useCustomerForm(user?.id, onSuccess);

  return (
    <div className="bg-[#F8F9FA] min-h-full font-display flex flex-col items-center">
      <div className="w-full max-w-[1520px] px-4 md:px-8 py-5 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 pb-6 mb-8 mt-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center justify-center rounded-xl h-10 w-10 bg-white text-[#1A2B3C] border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-[#1A2B3C] text-2xl font-bold leading-tight tracking-tight">신규 고객 등록</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {autoSaveStatus === "saving" ? "저장 중..." : autoSaveStatus === "saved" ? "임시 저장됨" : ""}
            </span>
            <button 
              onClick={handleSubmit}
              disabled={saving}
              className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-[#E67E22] text-white text-sm font-semibold leading-normal tracking-wide shadow-sm hover:bg-[#D35400] transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "저장 중..." : "Save"}
            </button>
          </div>
        </header>

        {hasErrors && (
          <div className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-3 w-full">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span className="text-sm font-medium text-rose-700">
              필수 입력 항목을 확인해 주세요. (이름, 성별, 생년월일, 출생시각, 출생지)
            </span>
          </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 w-full">
          {/* Basic & 출생 정보 Card */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-[#1A2B3C] text-xl font-bold leading-tight tracking-tight mb-6 pb-4 border-b border-gray-200">Basic & 출생 정보rmation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col flex-1">
                  <p className="text-[#1A2B3C] text-sm font-semibold leading-normal mb-2">Name *</p>
                  <input 
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={`form-input flex w-full rounded-lg text-[#1A2B3C] focus:ring-1 focus:ring-[#E67E22] focus:border-[#E67E22] border ${errors.name ? 'border-rose-500' : 'border-gray-300'} bg-white h-12 placeholder:text-gray-400 px-4 text-sm font-medium transition-shadow`} 
                    placeholder="Enter full name" 
                  />
                </label>
                <label className="flex flex-col flex-1">
                  <p className="text-[#1A2B3C] text-sm font-semibold leading-normal mb-2">Gender *</p>
                  <div className="relative">
                    <select 
                      value={form.gender}
                      onChange={(e) => update("gender", e.target.value)}
                      className={`form-select flex w-full rounded-lg text-[#1A2B3C] focus:ring-1 focus:ring-[#E67E22] focus:border-[#E67E22] border ${errors.gender ? 'border-rose-500' : 'border-gray-300'} bg-white h-12 px-4 pr-10 text-sm font-medium transition-shadow`}
                    >
                      <option disabled value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </label>
                <label className="flex flex-col flex-1">
                  <p className="text-[#1A2B3C] text-sm font-semibold leading-normal mb-2">Phone</p>
                  <input 
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="form-input flex w-full rounded-lg text-[#1A2B3C] focus:ring-1 focus:ring-[#E67E22] focus:border-[#E67E22] border border-gray-300 bg-white h-12 placeholder:text-gray-400 px-4 text-sm font-medium transition-shadow" 
                    placeholder="010-0000-0000" 
                  />
                </label>
                <label className="flex flex-col flex-1">
                  <p className="text-[#1A2B3C] text-sm font-semibold leading-normal mb-2">Email</p>
                  <input 
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="form-input flex w-full rounded-lg text-[#1A2B3C] focus:ring-1 focus:ring-[#E67E22] focus:border-[#E67E22] border border-gray-300 bg-white h-12 placeholder:text-gray-400 px-4 text-sm font-medium transition-shadow" 
                    placeholder="email@example.com" 
                  />
                </label>
                
                <label className="flex flex-col flex-1">
                  <p className="text-[#1A2B3C] text-sm font-semibold leading-normal mb-2">생년월일 *</p>
                  <input 
                    type="date"
                    value={form.birth_date}
                    onChange={(e) => update("birth_date", e.target.value)}
                    className={`form-input flex w-full rounded-lg text-[#1A2B3C] focus:ring-1 focus:ring-[#E67E22] focus:border-[#E67E22] border ${errors.birth_date ? 'border-rose-500' : 'border-gray-300'} bg-white h-12 placeholder:text-gray-400 px-4 text-sm font-medium transition-shadow`} 
                  />
                </label>
                <label className="flex flex-col flex-1">
                  <p className="text-[#1A2B3C] text-sm font-semibold leading-normal mb-2">출생 시간 *</p>
                  <input 
                    type="time"
                    value={form.birth_time}
                    onChange={(e) => update("birth_time", e.target.value)}
                    className={`form-input flex w-full rounded-lg text-[#1A2B3C] focus:ring-1 focus:ring-[#E67E22] focus:border-[#E67E22] border ${errors.birth_time ? 'border-rose-500' : 'border-gray-300'} bg-white h-12 placeholder:text-gray-400 px-4 text-sm font-medium transition-shadow`} 
                  />
                </label>

                <label className="flex flex-col flex-1">
                  <p className="text-[#1A2B3C] text-sm font-semibold leading-normal mb-2">달력 유형</p>
                  <div className="relative">
                    <select 
                      value={form.calendar_type}
                      onChange={(e) => update("calendar_type", e.target.value)}
                      className="form-select flex w-full rounded-lg text-[#1A2B3C] focus:ring-1 focus:ring-[#E67E22] focus:border-[#E67E22] border border-gray-300 bg-white h-12 px-4 pr-10 text-sm font-medium transition-shadow"
                    >
                      <option value="solar">양력 (양력)</option>
                      <option value="lunar">음력 (음력)</option>
                      <option value="lunar_leap">음력 윤달 (음력 윤달)</option>
                    </select>
                  </div>
                </label>
                <label className="flex flex-col flex-1">
                  <p className="text-[#1A2B3C] text-sm font-semibold leading-normal mb-2">출생지 *</p>
                  <input 
                    type="text"
                    value={form.birth_place}
                    onChange={(e) => update("birth_place", e.target.value)}
                    className={`form-input flex w-full rounded-lg text-[#1A2B3C] focus:ring-1 focus:ring-[#E67E22] focus:border-[#E67E22] border ${errors.birth_place ? 'border-rose-500' : 'border-gray-300'} bg-white h-12 placeholder:text-gray-400 px-4 text-sm font-medium transition-shadow`} 
                    placeholder="City, Country" 
                  />
                </label>

                <div className="col-span-1 md:col-span-2 space-y-3 pt-2 pb-2">
                  <p className="text-[#1A2B3C] text-sm font-semibold leading-normal mb-2">십이지신 빠른 시간 선택</p>
                  <SiganSelector value={form.birth_time} onChange={(time) => update('birth_time', time)} />
                  <p className="text-xs text-gray-500 mt-2">정확한 분 단위 시각을 모르는 경우, 해당하는 시진을 선택하면 대표 시각이 자동 입력됩니다.</p>
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-end mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleCalculateSaju}
                    disabled={!form.birth_date || !form.birth_time || !form.birth_place || sajuLoading}
                    className="flex items-center gap-2 bg-white text-[#1A2B3C] border border-gray-300 hover:bg-gray-50 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Clock className="w-4 h-4" />
                    {sajuLoading ? "계산 중..." : "간지 데이터 무결성 검증"}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Saju Result Panel Box */}
            {sajuResult && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                 <NormalizationResultPanel
                   result={sajuResult}
                   onClear={() => setSajuResult(null)}
                 />
              </div>
            )}
          </div>

          {/* Memo Card */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full">
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 flex flex-col h-full shadow-sm lg:sticky lg:top-8">
              <h2 className="text-[#1A2B3C] text-xl font-bold leading-tight tracking-tight mb-6 pb-4 border-b border-gray-200">상담 메모</h2>
              <label className="flex flex-col flex-1 h-full min-h-[400px]">
                <textarea 
                  value={form.memo}
                  onChange={(e) => update("memo", e.target.value)}
                  className="form-textarea flex w-full flex-1 rounded-lg text-[#1A2B3C] focus:ring-1 focus:ring-[#E67E22] focus:border-[#E67E22] border border-gray-300 bg-white p-4 placeholder:text-gray-400 text-sm font-medium resize-none transition-shadow" 
                  placeholder="Enter consultation notes, specific requests, or analytical observations here..."
                ></textarea>
              </label>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
