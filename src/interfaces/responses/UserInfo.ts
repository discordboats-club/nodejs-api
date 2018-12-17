import { BotInfo } from './BotInfo';

interface UserInfo {
    _bots: BotInfo[];
    _chunked: BotInfo[][];
    _discordAvatarURL: string;
    online: boolean;
    discriminator: string;
    badges: string[];
    id: string;
    createdAt: number;
    username: string;
    admin?: boolean;
    mod?: boolean;
}

export { UserInfo };