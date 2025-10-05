export type FocusEntry = {
    id: string;
    timestamp: Date;
    focusLevel: number;
    activity: string;
    distractions: string[];
    notes?: string;
};