import { BotInfo } from './BotInfo';

interface MeResponse extends BotInfo {
    apiToken: string;
}

export { MeResponse };