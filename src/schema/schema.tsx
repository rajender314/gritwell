export type PayloadProps = {
    payload: object;
    method: string;
    apiUrl: string;
    headers?: object;
};

export type FilterColumnProps = {
    id: number;
    name: string;
};

type Data = {
    status_code: number,
    message: string,
    data: object | string
}

export type Response = {
    response: Data
}

export type StatusProps = {
    _id: string
    label: string
    value: string
    code: string
  }
