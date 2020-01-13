export class PingHandler {
    async ping() {
        return 'Hello world';
    }
    async ping_with_input(input) {
        console.log('Input received', input);
        return Number(input) + 10;
    }
}
