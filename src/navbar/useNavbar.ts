import { useResumeStore } from '@/resume/store';
import { useRef } from 'react';

export const useNavbar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importJson, ...actions } = useResumeStore((s) => s.actions.document);

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importJson(file);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal mengimpor data.');
    } finally {
      e.target.value = '';
    }
  };

  return { fileInputRef, handleFileImport, actions };
};
