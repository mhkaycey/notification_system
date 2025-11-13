// --- Main Exchange ---
export const NOTIFICATIONS_EXCHANGE = 'notifications_exchange';

// --- Email Processing ---
export const EMAIL_SEND_ROUTING_KEY = 'email.send';
export const EMAIL_QUEUE = 'email_queue';

// --- Retry & Wait ---
// When a message fails in EMAIL_QUEUE, it goes to this DLX
export const EMAIL_RETRY_DLX = 'email_retry_dlx';
// This key routes failed messages to the wait queue
export const EMAIL_RETRY_ROUTING_KEY = 'email.retry';
// This queue holds messages for a short time (e.g., 30s) before retrying
export const EMAIL_WAIT_QUEUE = 'email_wait_queue';

// --- Final Dead Letter Queue ---
// When a message fails all retries, or has a permanent error, it goes here
export const EMAIL_DLQ_ROUTING_KEY = 'email.dlq';
export const EMAIL_DEAD_LETTER_QUEUE = 'email_dlq';
