import { create } from 'zustand';
import { AuthTab } from '../types';

interface LayoutState {
	activeTab: AuthTab;
	setActiveTab: (tab: AuthTab) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
	activeTab: 'signIn',
	setActiveTab: (tab: AuthTab) => set({ activeTab: tab }),
}));
