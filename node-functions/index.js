import { onApiRequest, rootPath } from './api-handler.js';

export const onRequest = (context) => onApiRequest(context, rootPath());
