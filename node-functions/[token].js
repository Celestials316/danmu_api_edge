import { onApiRequest, tokenPagePath } from './api-handler.js';

export const onRequest = (context) => onApiRequest(context, tokenPagePath(context.params));
