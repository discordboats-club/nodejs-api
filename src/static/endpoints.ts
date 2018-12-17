import { Endpoints } from '../interfaces/http/Endpoints';
import { ServerCountParams } from '../interfaces/params/ServerCountParams';
import { BodyServerCountParams } from '../interfaces/params/BodyServerCountParams';

const endpoints: Endpoints = {
    stats: {
        path: '/stats'
    },

    bot: {
        me: {
            path: '/me'
        },
        info: {
            path: '/:botId'
        },
        liked: {
            path: '/me/liked/:userId'
        },
        stats: {
            method: 'POST',
            path: '/stats',
            body: (data: ServerCountParams): BodyServerCountParams => ({ server_count: data.serverCount })
        }
    },

    user: {
        info: {
            path: '/:userId'
        }
    }
};

export { endpoints };