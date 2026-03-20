import { handleRequest } from '../danmu_api/worker.js';

function getClientIp(request) {
  const eoIp = request.headers?.get?.('eo-connecting-ip');
  if (eoIp) return eoIp;

  const forwardedFor = request.headers?.get?.('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  return 'unknown';
}

function joinRouteParam(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join('/');
  }
  return String(value || '').replace(/^\/+|\/+$/g, '');
}

function rebuildRequest(request, pathname) {
  const method = (request?.method || 'GET').toUpperCase();
  const url = new URL(request.url);
  url.pathname = pathname;
  const body = (method === 'GET' || method === 'HEAD') ? undefined : request.body;

  return new Request(url.toString(), {
    method,
    headers: request.headers,
    body,
    duplex: body ? 'half' : undefined,
    redirect: request.redirect,
    credentials: request.credentials,
    cache: request.cache,
    mode: request.mode
  });
}

export async function onApiRequest(context, pathname = null) {
  const { request, env } = context;
  const targetRequest = pathname ? rebuildRequest(request, pathname) : request;
  return handleRequest(targetRequest, env, 'edgeone', getClientIp(request));
}

export function tokenPagePath(params = {}) {
  const token = joinRouteParam(params.token);
  return token ? `/${token}` : '/';
}

export function apiPath(params = {}) {
  const rest = joinRouteParam(params.default);
  return rest ? `/api/${rest}` : '/api';
}

export function tokenApiPath(params = {}) {
  const token = joinRouteParam(params.token);
  const rest = joinRouteParam(params.default);
  if (!token) return apiPath(params);
  return rest ? `/${token}/api/${rest}` : `/${token}/api`;
}
