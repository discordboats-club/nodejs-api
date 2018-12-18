import { EventEmitter } from 'events';
import express, { json, Request, Response } from 'express';
import { Options } from '../interfaces/webhook/Options';
import { WebhookBody } from '../interfaces/webhook/WebhookBody';

class Webhook extends EventEmitter {
    readonly server = express();
    readonly port: number;
    readonly auth: string;
    readonly path: string = '/';

    constructor(options: Options) {
        super();

        this.port = options.port;
        this.auth = options.auth;
        if (options.path) this.path = options.path;
    }

    private handle = (req: Request, res: Response) => {
        if (!req.get('Authorization')) return res.sendStatus(401);
        if (req.get('Authorization') !== this.auth) return res.sendStatus(403);

        req.body = req.body as WebhookBody;

        this.emit(req.body.event, req.body.botId, req.body.userId);
        res.sendStatus(200);
    };

    start() {
        this.server.use(json());
        this.server.post(this.path, this.handle);

        this.server.listen(this.port);
    }
}

export { Webhook };