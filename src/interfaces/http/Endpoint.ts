interface Endpoint {
    method?: string;
    path: string;
    body?: (data: any) => object;

    [propName: string]: any;
}

export { Endpoint };