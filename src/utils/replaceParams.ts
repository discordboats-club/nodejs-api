import { Parameters } from '../interfaces/params/Parameters';

const replaceParams = (url: string, params: Parameters): string => url.replace(/:(\w+)/g, (m, name) => params[name] || m);

export { replaceParams };