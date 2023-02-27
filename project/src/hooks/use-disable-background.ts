import {useEffect} from 'react';
import {createFocusTrap} from 'focus-trap';


export const useDisableBackground = () => {
  useEffect(() => {
    const focusModalTrap = createFocusTrap('.modal', {tabbableOptions: {displayCheck: 'none'}});

    focusModalTrap.activate();
    document.body.style.overflow = 'hidden';

    return () => {
      focusModalTrap.deactivate();
      document.body.style.overflow = 'unset';
    };
  }, []);
};
