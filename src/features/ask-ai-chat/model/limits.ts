// Shared between the client (input validation) and the server (route.ts) so
// the two can never drift apart — the client checks this before sending so
// the visitor sees the problem immediately, the server checks it again
// because client-side validation is never trustworthy on its own.
export const MAX_MESSAGE_LENGTH = 500;
