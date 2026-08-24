/**
 * Robust device and viewport detection utility
 * Combines User-Agent sniffing and viewport screen width checks
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
  const isMobileUA = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
  const isSmallScreen = window.innerWidth < 768;
  
  return isMobileUA || isSmallScreen;
};
