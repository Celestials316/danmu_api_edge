import { catchAllPath, onApiRequest } from './api-handler.js';

export const onRequest = (context) => onApiRequest(context, catchAllPath(context.params));
