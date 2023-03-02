/**
 * Convert "/api/v1/health-check/:<paramName1>/:<paramName2>/config" to "/api/v1/health-check/<paramValue2>/<paramValue2>/config";
 * @param url: the link endpoint api has param name variable
 * @param params: value list to replace for param name
 * @returns {string}: the endpoint api
 */
export const convertUrlParamToEndpoint = (url: string, ...params: string[]): string => {
  if (!url) return "";
  
  let i = 0;
  const pattern = /:(\w+)/gm;
  return url.replace(pattern, (matched) => matched.replace(matched, params[i++]));
};
