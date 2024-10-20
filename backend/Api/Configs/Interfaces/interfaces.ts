export interface bodyMensagem {
    from: string
    body: string

};


export interface userState {
    [key: string]: string
}

export interface flowMessage {
    [key: string]: string
}

export interface ImageResponse {
    type: string;
    data: Buffer;
}