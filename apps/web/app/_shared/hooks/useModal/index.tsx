import { useCallback, useState } from 'react';

export const useModal = (): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [isOpen, handleModalOpen, handleModalClose];
};
