import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { calculateFourPillars } from "manseryeok";

export interface FormData {
  name: string;
  gender: string;
  birth_date: string;
  birth_time: string;
  calendar_type: string;
  birth_place: string;
  phone: string;
  email: string;
  memo: string;
}

const initialForm: FormData = {
  name: "",
  gender: "",
  birth_date: "",
  birth_time: "",
  calendar_type: "solar",
  birth_place: "",
  phone: "",
  email: "",
  memo: "",
};

export function useCustomerForm(userId: string | undefined, onSuccess: (customerId: string) => void) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [saving, setSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [sajuResult, setSajuResult] = useState<any>(null);
  const [sajuLoading, setSajuLoading] = useState(false);
  
  const autoSaveRef = useRef<ReturnType<typeof setTimeout>>();

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (["birth_date", "birth_time", "calendar_type", "gender"].includes(key)) {
      setSajuResult(null);
    }
  };

  const handleCalculateSaju = () => {
    if (!form.birth_date || !form.birth_time || !form.gender) {
      toast({ title: "입력 오류", description: "생년월일, 시각, 성별을 모두 입력해주세요.", variant: "destructive" });
      return;
    }

    setSajuLoading(true);
    try {
      const [year, month, day] = form.birth_date.split("-").map(Number);
      const [hour, minute] = form.birth_time.split(":").map(Number);

      const result = calculateFourPillars({
        year, month, day, hour, minute,
        isLunar: form.calendar_type === "lunar" || form.calendar_type === "lunar_leap",
        isLeapMonth: form.calendar_type === "lunar_leap",
      });

      setSajuResult({
        fourPillars: result,
        hanja: result.toHanjaObject(),
        dayElement: result.dayElement,
        dayYinYang: result.dayYinYang,
        input: {
          year, month, day, hour, minute,
          isLunar: form.calendar_type === "lunar" || form.calendar_type === "lunar_leap",
          isLeapMonth: form.calendar_type === "lunar_leap",
        },
      });
      toast({ title: "정규화 완료", description: "간지 데이터 추출이 완료되었습니다." });
    } catch (e: any) {
      toast({ title: "실패", description: "명식 추출 중 오류가 발생했습니다: " + e.message, variant: "destructive" });
      setSajuResult({ error: "데이터를 계산할 수 없는 생년월일시입니다." });
    } finally {
      setSajuLoading(false);
    }
  };

  const autoSave = useCallback(() => {
    setAutoSaveStatus("saving");
    localStorage.setItem("customer_draft", JSON.stringify(form));
    setTimeout(() => setAutoSaveStatus("saved"), 500);
  }, [form]);

  useEffect(() => {
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
    autoSaveRef.current = setTimeout(autoSave, 15000);
    return () => { if (autoSaveRef.current) clearTimeout(autoSaveRef.current); };
  }, [form, autoSave]);

  useEffect(() => {
    const draft = localStorage.getItem("customer_draft");
    if (draft) {
      try { setForm(JSON.parse(draft)); } catch {}
    }
  }, []);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) errs.name = "고객명을 입력하세요.";
    if (!form.gender) errs.gender = "성별을 선택하세요.";
    if (!form.birth_date) errs.birth_date = "생년월일을 입력하세요.";
    if (!form.birth_time) errs.birth_time = "출생시각을 입력하세요.";
    if (!form.birth_place?.trim()) errs.birth_place = "출생지를 입력하세요.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || !userId) return;
    setSaving(true);

    const { data, error } = await supabase
      .from("customers")
      .insert({
        created_by: userId,
        name: form.name.trim(),
        gender: form.gender,
        birth_date: form.birth_date,
        birth_time: form.birth_time || null,
        calendar_type: form.calendar_type as any,
        birth_place: form.birth_place?.trim() || null,
        phone: form.phone?.trim() || null,
        email: form.email?.trim() || null,
        memo: form.memo?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "저장 실패", description: error.message, variant: "destructive" });
    } else {
      localStorage.removeItem("customer_draft");
      toast({ title: "고객 등록 완료", description: `${form.name}님이 등록되었습니다.` });
      onSuccess(data.id);
    }
    setSaving(false);
  };

  return {
    form, update, errors, saving, autoSaveStatus, hasErrors: Object.keys(errors).length > 0,
    sajuResult, setSajuResult, sajuLoading, handleCalculateSaju, handleSubmit
  };
}
