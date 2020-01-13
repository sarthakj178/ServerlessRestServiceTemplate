import { PingHandler } from '../handlers/ping-handler';
const pingHandler = new PingHandler();

export const ping = async (context, req) => {
    context.res = {
        status: 200,
        body: await pingHandler.ping()
    };
};
export const ping_with_input = async (context, req) => {
    context.log('request received', req.query);
    if (req.query.x) {
        context.res = {
            status: 200,
            body: { y: await pingHandler.ping_with_input(req.query.x) }
        };
    } else {
        context.res = {
            status: 400,
            body: 'Query string Parameter `x` is missing or empty'
        };
    }
};
