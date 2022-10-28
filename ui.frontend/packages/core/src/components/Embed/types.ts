export interface EmbedProps {
    type: string; // URL, EMBEDDABLE, HTML
    url: string;
    html: string;
    result?: EmbedResult;
}

export interface EmbedResult {
    processor: string;
    options?: EmbedResultOptions;
    unsafeContext: boolean;
}

export interface EmbedResultOptions {
    provider: string;
    response?: EmbedResultResponse;
}

export interface EmbedResultResponse {
    type: string;
    version: string;
    title: string;
    authorName: string;
    authorUrl: string;
    providerName: string;
    providerUrl: string;
    thumbnailUrl: string;
    thumbnailWidth: string;
    thumbnailHeight: string;
    width: string;
    height: string;
    html: string;
}


