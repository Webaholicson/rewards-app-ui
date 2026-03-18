export const isAuthenticated = (): boolean => {
    return getSessionId() !== null;
}

export const setSessionId = (sessionId: string): void => {
    localStorage.setItem('session_id', sessionId);
}

export const getSessionId = (): string | null => {
    return localStorage.getItem('session_id');
}

export const removeSessionId = (): void => {
    localStorage.removeItem('session_id');
}