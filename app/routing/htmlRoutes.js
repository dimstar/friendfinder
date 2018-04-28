module.exports = class {
    constructor(app){
        // routes with the process command working director(?) and the path to the approp template
        this.routes = {
            '/': process.cwd() + '/app/public/index.html',
            '/survey': process.cwd() + '/app/public/survey.html'
        }

        // accept inbound from doc root
        app.get('/', (res, req) => this.routing(res, req, this.routes));
        // accept request on survey
        app.get('/survey', (res, req) => this.routing(res, req, this.routes));
    }

    routing(request, response, routes){
        response.sendFile(routes[request.url]);
    }
}