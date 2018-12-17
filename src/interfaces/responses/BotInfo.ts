interface BotInfo {
    _comments: string[];
    _ownerTag: string;
    online: boolean;
    likeCount: number;
    id: string;
    createdAt: number;
    invite: string;
    inviteClicks: number;
    longDescription: string;
    name: string;
    ownerID: string;
    pageViews: number;
    prefix: string;
    shortDescription: string;
    verified: boolean;
    github?: string;
    library?: string;
    website?: string;
}

export { BotInfo };