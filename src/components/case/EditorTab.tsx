import { useState, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { TableOfContents } from '@/components/editor/TableOfContents';
import { PropertyPanel } from '@/components/editor/PropertyPanel';

interface EditorTabProps {
  caseId: string;
  caseData: any;
  onUpdate: () => void;
}

export function EditorTab({ caseId, caseData, onUpdate }: EditorTabProps) {
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const initialContent = caseData?.final_content?.html || 
                         caseData?.draft_content?.text?.replace(/\n/g, '<br>') || 
                         `<h1>1. 성격 및 기질 분석</h1><p>사주 명리학 분석 내용입니다...</p><p>(이곳에 AI가 생성한 초안이 위치하게 되며 블록 단위 에디터로 작동합니다.)</p>`;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '사주 명리학 분석 내용을 입력하세요...',
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[600px]',
      },
    },
    onUpdate: () => {
      setSaveStatus('saving');
    },
  });

  const saveContent = async () => {
    if (!editor) return;
    try {
      setSaveStatus('saving');
      const html = editor.getHTML();
      const { error } = await supabase
        .from('cases')
        .update({ final_content: { html } })
        .eq('id', caseId);

      if (error) throw error;
      setSaveStatus('saved');
      onUpdate();
    } catch (e) {
      console.error(e);
      setSaveStatus('error');
    }
  };

  // 자동 저장 로직 (입력 멈추고 2초 뒤 저장)
  useEffect(() => {
    if (saveStatus === 'saving') {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
      autosaveTimerRef.current = setTimeout(() => {
        saveContent();
      }, 2000);
    }
    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [saveStatus]);

  const handleManualSave = () => {
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    saveContent();
    toast({ title: '저장 완료', description: '수동 저장이 완료되었습니다.' });
  };



  return (
    <div className="flex h-[800px] border border-border rounded-md overflow-hidden bg-background">
      {/* 1. Left Panel (Table of Contents) */}
      <TableOfContents editor={editor} />

      {/* 2. Center Panel (Editor) */}
      <div className="flex-1 flex flex-col min-w-[500px]">
        {/* Editor Toolbar */}
        <EditorToolbar 
          editor={editor} 
          onSave={handleManualSave}
          saveStatus={saveStatus}
        />

        {/* Editor Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 relative p-8 editor-container">
          <div className="max-w-[800px] mx-auto min-h-[600px] bg-white shadow-saju-sm border border-border/50 p-12 rounded-sm focus-within:ring-2 focus-within:ring-primary/20 transition-shadow">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      {/* 3. Right Panel (Properties & Comments) */}
      <PropertyPanel editor={editor} />
    </div>
  );
}
