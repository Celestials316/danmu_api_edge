import { apiPath, onApiRequest } from '../api-handler.js';

export const onRequest = (context) => onApiRequest(context, apiPath(context.params));
