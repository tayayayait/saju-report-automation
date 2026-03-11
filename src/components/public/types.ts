export interface SajuFormData {
  calendar_type: 'solar' | 'lunar' | 'lunar_leap' | null;
  birth_year: number | null;
  birth_month: number | null;
  birth_day: number | null;
  birth_time: string | null;
  birth_place: string | null;
  gender: 'male' | 'female' | null;
}

export interface StepProps {
  data: SajuFormData;
  updateData: (updates: Partial<SajuFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}
