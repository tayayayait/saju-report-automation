import { type Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Underline, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Undo, Redo, Save
} from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor | null;
  onSave?: () => void;
  saveStatus?: 'saved' | 'saving' | 'error';
}

export function EditorToolbar({ editor, onSave, saveStatus = 'saved' }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  const act = () => editor.chain().focus() as any;
  const can = () => editor.can().chain().focus() as any;

  return (
    <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-card shrink-0">
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 bg-muted/30 p-1 border border-border rounded-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => act().toggleBold().run()}
            disabled={!can().toggleBold().run()}
            className={`w-8 h-8 p-0 ${editor.isActive('bold') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
            title="굵게 (Cmd+B)"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => act().toggleItalic().run()}
            disabled={!can().toggleItalic().run()}
            className={`w-8 h-8 p-0 ${editor.isActive('italic') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
            title="기울임 (Cmd+I)"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => act().toggleStrike().run()}
            disabled={!can().toggleStrike().run()}
            className={`w-8 h-8 p-0 ${editor.isActive('strike') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
            title="취소선"
          >
            <Strikethrough className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-1 bg-muted/30 p-1 border border-border rounded-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => act().toggleHeading({ level: 1 }).run()}
            className={`w-8 h-8 p-0 ${editor.isActive('heading', { level: 1 }) ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
            title="제목 1"
          >
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => act().toggleHeading({ level: 2 }).run()}
            className={`w-8 h-8 p-0 ${editor.isActive('heading', { level: 2 }) ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
            title="제목 2"
          >
            <Heading2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => act().toggleHeading({ level: 3 }).run()}
            className={`w-8 h-8 p-0 ${editor.isActive('heading', { level: 3 }) ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
            title="제목 3"
          >
            <Heading3 className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-1 bg-muted/30 p-1 border border-border rounded-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => act().toggleBulletList().run()}
            className={`w-8 h-8 p-0 ${editor.isActive('bulletList') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
            title="기호 목록"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => act().toggleOrderedList().run()}
            className={`w-8 h-8 p-0 ${editor.isActive('orderedList') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
            title="번호 목록"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => act().toggleBlockquote().run()}
            className={`w-8 h-8 p-0 ${editor.isActive('blockquote') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
            title="인용구"
          >
            <Quote className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => act().undo().run()}
            disabled={!can().undo().run()}
            className="w-8 h-8 p-0 text-muted-foreground"
            title="실행 취소 (Cmd+Z)"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => act().redo().run()}
            disabled={!can().redo().run()}
            className="w-8 h-8 p-0 text-muted-foreground"
            title="다시 실행 (Cmd+Shift+Z)"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {onSave && (
          <>
            <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
              {saveStatus === 'saved' ? (
                <>저장됨</>
              ) : saveStatus === 'error' ? (
                <span className="text-destructive">저장 실패</span>
              ) : (
                '저장 중...'
              )}
            </div>
            <Button 
              onClick={onSave} 
              disabled={saveStatus === 'saving'} 
              size="sm" 
              className="h-8 bg-primary text-white"
            > 
              <Save className="w-4 h-4 mr-2" /> 저장
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
