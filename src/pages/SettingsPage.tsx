import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KeyRound, Sparkles, Files, ShieldCheck, Eye, EyeOff, Save } from 'lucide-react';

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

  return (
    <div className="bg-[#F8F9FA] min-h-full font-display flex flex-col items-center">
      <div className="w-full max-w-[1520px] px-4 md:px-8 py-5 flex flex-col flex-1 gap-6">
        
        <header className="flex flex-col gap-1 mb-2 mt-2">
          <h1 className="text-3xl font-black text-[#1A2B3C] tracking-tight">시스템 설정</h1>
          <p className="text-gray-500 text-sm">인공지능 모델, 프롬프트 규칙 및 템플릿, 사용자 권한 등을 통합 관리합니다.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column (7 cols) - Main Content Tabs */}
          <div className="xl:col-span-7 space-y-6">
            <Tabs defaultValue="api" className="w-full">
              <TabsList className="w-full justify-start h-12 bg-transparent border-b border-gray-200 p-0 gap-8 rounded-none mb-6">
                <TabsTrigger value="api" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E67E22] data-[state=active]:bg-transparent data-[state=active]:text-[#1A2B3C] text-gray-500 px-0 text-sm font-bold">
                  <KeyRound className="w-4 h-4 mr-2" /> API & Models
                </TabsTrigger>
                <TabsTrigger value="prompt" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E67E22] data-[state=active]:bg-transparent data-[state=active]:text-[#1A2B3C] text-gray-500 px-0 text-sm font-bold">
                  <Sparkles className="w-4 h-4 mr-2" /> Prompts
                </TabsTrigger>
                <TabsTrigger value="template" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E67E22] data-[state=active]:bg-transparent data-[state=active]:text-[#1A2B3C] text-gray-500 px-0 text-sm font-bold">
                  <Files className="w-4 h-4 mr-2" /> Templates
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="api" className="space-y-6 m-0 animate-in fade-in duration-300">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#1A2B3C]">AI API 설정</h2>
                    <p className="text-sm text-gray-500 mt-1">OpenAI 또는 연동된 AI 모델의 API 키를 관리합니다.</p>
                  </div>
                  <div className="p-6 space-y-6 bg-gray-50/30">
                    <div className="space-y-2">
                      <label htmlFor="openai_key" className="text-sm font-semibold text-[#1A2B3C]">OpenAI API Key</label>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1">
                          <input
                            id="openai_key"
                            type={showApiKey ? 'text' : 'password'}
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full h-11 px-4 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] outline-none font-mono text-sm"
                          />
                          <button
                            type="button"
                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <button className="h-11 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-sm font-bold text-[#1A2B3C] transition-colors">
                          테스트 연결
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        발급받은 비밀 키를 입력하세요. 환경 변수 적용보다 우선순위가 높습니다.
                      </p>
                    </div>
                    
                    <button className="w-full sm:w-auto h-11 px-6 rounded-lg bg-[#E67E22] hover:bg-[#D35400] text-white font-bold text-sm shadow-sm transition-colors flex items-center justify-center">
                      <Save className="w-4 h-4 mr-2" /> API 변경사항 저장
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="prompt" className="m-0 space-y-6 animate-in fade-in duration-300">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#1A2B3C]">프롬프트 버전 관리</h2>
                    <p className="text-sm text-gray-500 mt-1">리포트 생성 시나리오에 적용될 시스템 프롬프트 규격을 정의합니다.</p>
                  </div>
                  <div className="p-6 bg-gray-50/30">
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-[#F1F5F9] border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 font-semibold text-[#1A2B3C]">버전</th>
                            <th className="px-4 py-3 font-semibold text-[#1A2B3C]">설명</th>
                            <th className="px-4 py-3 font-semibold text-[#1A2B3C]">상태</th>
                            <th className="px-4 py-3 text-right font-semibold text-[#1A2B3C]">액션</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-mono text-[#1A2B3C]">v1.2.0</td>
                            <td className="px-4 py-3 text-gray-600">2026년 신년운세 템플릿 포함</td>
                            <td className="px-4 py-3"><span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold">Active</span></td>
                            <td className="px-4 py-3 text-right"><button className="text-[#E67E22] font-semibold hover:underline">편집</button></td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-mono text-gray-500">v1.1.0</td>
                            <td className="px-4 py-3 text-gray-500">기본 직업/성격 프롬프트 개편</td>
                            <td className="px-4 py-3"><span className="text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full text-xs font-semibold">Archived</span></td>
                            <td className="px-4 py-3 text-right"><button className="text-gray-500 font-semibold hover:underline">조회</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="template" className="m-0 space-y-6 animate-in fade-in duration-300">
                 <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#1A2B3C]">문서 템플릿</h2>
                    <p className="text-sm text-gray-500 mt-1">PDF 퍼블리셔에 쓰일 HTML 레이아웃/스타일 템플릿 파일을 업로드하고 관리합니다.</p>
                  </div>
                  <div className="p-12 text-center text-gray-400 bg-gray-50/50 m-6 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
                    <Files className="w-10 h-10 mb-3 text-gray-300" />
                    <p className="font-semibold text-gray-500">준비 중인 기능입니다</p>
                    <p className="text-xs mt-1">다양한 디자인의 PDF 출력을 지원할 예정입니다.</p>
                  </div>
                </div>
              </TabsContent>

            </Tabs>
          </div>

          {/* Right Column (5 cols) - Roles & Permissions */}
          <div className="xl:col-span-5 space-y-6 xl:mt-[72px]">
            <div className="rounded-xl border border-[#1A2B3C]/10 shadow-sm bg-gradient-to-b from-white to-[#F8F9FA] overflow-hidden">
              <div className="p-6 border-b border-[#1A2B3C]/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#E67E22]/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#E67E22]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1A2B3C] mb-1">사용자 권한</h2>
                  <p className="text-sm text-gray-500">팀원의 접근 수준(Admin, Editor, Viewer)을 갱신합니다.</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {[
                  { name: '김어드민', email: 'admin@example.com', role: 'Admin' },
                  { name: '박에디터', email: 'editor1@example.com', role: 'Editor' },
                  { name: '이뷰어', email: 'viewer@example.com', role: 'Viewer' },
                ].map((user, i) => (
                  <div key={user.email} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-gray-300 transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#1A2B3C] truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                    </div>
                    <select 
                      className="ml-4 h-9 text-sm font-semibold text-[#1A2B3C] border border-gray-200 rounded-md px-3 bg-gray-50 w-28 focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-[#E67E22] cursor-pointer"
                      defaultValue={user.role}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>
                ))}
                
                <button className="w-full h-11 mt-4 rounded-lg border-2 border-dashed border-gray-200 text-gray-500 font-bold text-sm hover:border-[#E67E22] hover:text-[#E67E22] transition-colors bg-white">
                  + 새로운 사용자 추가
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
