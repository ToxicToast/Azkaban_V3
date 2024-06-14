export type Toast = {
    id: string;
    type: 'success' | 'danger' | 'warning' | 'info' | 'default';
    text: string[];
};
