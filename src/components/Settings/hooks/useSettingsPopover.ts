import { useState, useCallback } from 'react';

export function useSettingsPopover() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closePopover = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    togglePopover,
    closePopover
  };
}