export const isAuthenticated = (): boolean => {
    return getSessionId() !== null && getSessionId() !== undefined;
}

export const setSessionId = (sessionId: string): void => {
    localStorage.setItem('session_id', sessionId);
}

export const getSessionId = (): string | null | undefined => {
    let sessionId: string | null | undefined = null;

    if (localStorage.hasItem('session_id')) {
        sessionId = localStorage.getItem('session_id');
    }

    if (sessionId === null || sessionId === undefined) {
        localStorage.removeItem('session_id');
        return null;
    }

    return sessionId;
}

export const removeSessionId = (): void => {
    localStorage.removeItem('session_id');
}