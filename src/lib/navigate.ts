let navigateFn: ((path: string) => void) | null = null;

export const setGlobalNavigate = (fn: (path: string) => void) => {
  navigateFn = fn;
};

export const globalNavigate = (path: string) => {
  if (navigateFn) navigateFn(path);
};
