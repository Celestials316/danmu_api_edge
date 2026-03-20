import { onApiRequest, tokenApiPath } from '../../api-handler.js';

export const onRequest = (context) => onApiRequest(context, tokenApiPath(context.params));
