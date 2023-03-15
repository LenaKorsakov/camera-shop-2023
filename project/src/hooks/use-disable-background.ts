import {useEffect} from 'react';
import {createFocusTrap} from 'focus-trap';

export const useDisableBackground = () => {
  useEffect(() => {
    const focusModalTrap = createFocusTrap('.modal', {tabbableOptions: {displayCheck: 'none'}});

    focusModalTrap.activate();

    if (typeof window !== 'undefined' && window.document) {
      document.body.style.overflow = 'hidden'; //disable scrolling the document body
    }

    return () => {
      focusModalTrap.deactivate();
      document.body.style.overflow = 'unset';
    };
  }, []);
};
