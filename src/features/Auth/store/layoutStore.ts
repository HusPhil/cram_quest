import { create } from 'zustand';

interface LayoutState {
	activeTab: 'signIn' | 'signUp';
	setActiveTab: (tab: 'signIn' | 'signUp') => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
	activeTab: 'signIn',
	setActiveTab: (tab: 'signIn' | 'signUp') => set({ activeTab: tab }),
}));
