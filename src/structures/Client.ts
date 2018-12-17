import fetch from 'node-fetch';
import { Endpoint } from '../interfaces/http/Endpoint';
import { Options } from '../interfaces/http/Options';
import { APIResponse } from '../interfaces/responses/APIResponse';
import { replaceParams } from '../utils/replaceParams';
import { bases } from '../static/bases';
import { endpoints } from '../static/endpoints';

import { ListStats } from '../interfaces/responses/ListStats';
import { MeResponse } from '../interfaces/responses/MeResponse';
import { BotInfo } from '../interfaces/responses/BotInfo';
import { UserInfo } from '../interfaces/responses/UserInfo';

import { BotIDParams } from '../interfaces/params/BotIDParams';
import { UserIDParams } from '../interfaces/params/UserIDParams';
import { ServerCountParams } from '../interfaces/params/ServerCountParams';

class Client {
    readonly basePath = '/api/public';

    constructor(private apiKey: string, readonly baseURL: string = 'https://discordboats.club') { }

    private async request<DataType extends object, ReturnType extends any>(endpoint: string, data?: DataType): Promise<ReturnType> {
        const splitEndpoint = endpoint.split('.');
        const routeBase = splitEndpoint.length > 1 ? splitEndpoint[0] : null;
        const route = splitEndpoint[1] || splitEndpoint[0];

        const endpointObject: Endpoint = routeBase ? endpoints[routeBase][route] : endpoints[route];

        const base = replaceParams(`${this.baseURL}${this.basePath}${routeBase ? bases[routeBase] : ''}${endpointObject.path}`, data || {});

        const options: Options = {
            method: endpointObject.method || 'GET',
            headers: {
                'Authorization': this.apiKey
            }
        };

        if (endpointObject.body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(endpointObject.body(data));
        }

        const response = await fetch(base, options);
        const json: APIResponse = await response.json();

        if (json.error) throw new Error(json.error);

        return (typeof json.data === 'undefined' ? true : json.data) as ReturnType;
    }

    async stats(): Promise<ListStats> {
        const stats = await this.request<object, ListStats>('stats');

        return stats;
    }

    async me(): Promise<MeResponse> {
        const info = await this.request<object, MeResponse>('bot.me');

        return info;
    }

    async botInfo(botId: string): Promise<BotInfo> {
        const info = await this.request<BotIDParams, BotInfo>('bot.info', { botId });

        return info;
    }

    async botLiked(userId: string): Promise<number | boolean> {
        const liked = await this.request<UserIDParams, number | boolean>('bot.liked', { userId });

        return liked;
    }

    async postServers(serverCount: number): Promise<boolean> {
        const servers = await this.request<ServerCountParams, boolean>('bot.stats', { serverCount });

        return servers;
    }

    async userInfo(userId: string): Promise<UserInfo> {
        const info = await this.request<UserIDParams, UserInfo>('user.info', { userId });

        return info;
    }
}

export { Client };