'use client';

import clsx from 'clsx';
import { TransitionEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

type Props = {
  isOpen?: boolean;
  onRequestClose?: () => void;
  children?: React.ReactNode;
};

export const Modal = ({ isOpen, onRequestClose, children }: Props) => {
  const [beforeOpen, setBeforeOpen] = useState(false);
  const [afterOpen, setAfterOpen] = useState(false);
  const body = useRef<HTMLBodyElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleAfterOpen = useCallback(() => {
    if (ref.current) {
      setAfterOpen(true);
      return;
    }

    requestAnimationFrame(handleAfterOpen);
  }, []);

  const handleTransitionEnd: TransitionEventHandler<HTMLDivElement> = useCallback((event) => {
    if (parseFloat(window.getComputedStyle(event.currentTarget).opacity) === 0) {
      setBeforeOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setBeforeOpen(true);
      handleAfterOpen();
    } else {
      setAfterOpen(false);
    }
  }, [isOpen, handleAfterOpen]);

  useEffect(() => {
    body.current = document.body as HTMLBodyElement;
  }, []);

  if (!beforeOpen || !body.current) return null;

  return createPortal(
    <div
      ref={ref}
      onTransitionEnd={handleTransitionEnd}
      className={clsx(
        {
          'visible opacity-100': afterOpen,
          'invisible opacity-0': !afterOpen,
        },
        'fixed left-0 top-0 z-[500000] h-full w-full transition-all duration-500',
      )}
    >
      <div
        className='fixed left-0 top-0 h-full w-full bg-gray-900 opacity-50'
        onClick={onRequestClose}
      />
      <div
        className={clsx(
          'fixed left-1/2 top-1/2 max-w-screen-sm -translate-x-1/2 -translate-y-1/2 overflow-auto rounded bg-white py-4 px-2 md:py-8 md:px-6',
          styles.content,
        )}
      >
        {children}
      </div>
    </div>,
    body.current,
  );
};
