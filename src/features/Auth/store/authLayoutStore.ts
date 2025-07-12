import { create } from 'zustand';
import { AuthTab } from '../types';

interface AuthLayoutState {
	activeTab: AuthTab;
	setActiveTab: (tab: AuthTab) => void;
}

export const useAuthLayoutStore = create<AuthLayoutState>((set) => ({
	activeTab: 'signIn',
	setActiveTab: (tab: AuthTab) => set({ activeTab: tab }),
}));
