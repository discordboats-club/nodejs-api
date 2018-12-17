import { Endpoint } from './Endpoint';

interface Endpoints {
    [propName: string]: Endpoint | Endpoints;
}

export { Endpoints };