export type FocusEntry = {
    id: string;
    timestamp: string;
    focusLevel: number;
    activity: string;
    distractions: string[];
    notes?: string;
};