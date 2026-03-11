import { useState } from 'react';
import { SajuFormData } from '@/components/public/types';
import { calculateFourPillars } from 'manseryeok';
import { getAllSipsung } from '@/lib/sipsung';
import { calculateDaeun } from '@/lib/daeun';
import { estimateYongsin } from '@/lib/yongsin';

export function usePublicSajuSubmit() {
  const [formData, setFormData] = useState<SajuFormData | null>(null);
  const [sajuResult, setSajuResult] = useState<any>(null);

  const handleComplete = (data: SajuFormData) => {
    setFormData(data);
    
    try {
      if (data.birth_year && data.birth_month && data.birth_day) {
        let h = 0, m = 0;
        if (data.birth_time) {
          const params = data.birth_time.split(':');
          h = parseInt(params[0], 10) || 0;
          m = parseInt(params[1], 10) || 0;
        }

        const result = calculateFourPillars({
          year: data.birth_year,
          month: data.birth_month,
          day: data.birth_day,
          hour: h,
          minute: m,
          isLunar: data.calendar_type === 'lunar' || data.calendar_type === 'lunar_leap',
          isLeapMonth: data.calendar_type === 'lunar_leap',
        });

        const hanjaObj = result.toHanjaObject();
        const sipsung = getAllSipsung(hanjaObj);
        const yongsin = estimateYongsin(hanjaObj);
        const daeunList = calculateDaeun(hanjaObj, data.gender || '남성', data.birth_year);

        setSajuResult({
          fourPillars: result,
          hanja: hanjaObj,
          dayElement: result.dayElement,
          dayYinYang: result.dayYinYang,
          sipsung,
          yongsin,
          daeunList,
          daeun: daeunList.length > 0 ? daeunList[0].startAge : '확인불가',
          ...data
        });
      }
    } catch(err) {
      console.error(err);
    }
  };

  const resetResult = () => setSajuResult(null);

  return {
    formData,
    sajuResult,
    handleComplete,
    resetResult
  };
}
