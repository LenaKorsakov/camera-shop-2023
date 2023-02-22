import { useState } from 'react';

const useDisableBackgrounsScroll = () => {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  //  FUNCTION TO HANDLE CLOSE ACTION ON SIDEDRAWER/MODAL
  const handleModalClose = () => {
    setIsScroll(false);

    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = 'unset';
  };

  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const disableBackgroundScroll = () => {
    setIsScroll(true);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window !== 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };

  return {
    handleModalClose, disableBackgroundScroll, showSideDrawer: isScroll
  };
};

export default useDisableBackgrounsScroll;
