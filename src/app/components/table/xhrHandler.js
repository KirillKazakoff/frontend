export default class XhrHandler {
    constructor() {
        this.url = null;
        this.params = null;
        this.method = null;
        this.xhr = null;
    }

    sendRequest(method, data) {
        return new Promise((resolve) => {
            this.xhr = new XMLHttpRequest();

            this.method = method;
            this.params = new URLSearchParams();
            this.params.append('method', method);
            // this.url = `http://localhost:9091/?${this.params}`;
            this.url = `https://http-first.herokuapp.com/?${this.params}`;

            this.post(data);
            this.get();

            this.xhr.addEventListener('load', () => {
                resolve(JSON.parse(this.xhr.response));
            });
        })
    }

    get() {
        const { method, url, xhr } = this;

        if (method === 'allTickets' || method === 'initTable') {
            xhr.open('GET', url);
            xhr.send();
        }
    }

    post(data) {
        const { method, url, xhr } = this;
        const methods = ['createTicket', 'removeTicket', 'updateTicket', 'updateStatus'];

        if (methods.some((m) => m === method)) {
            xhr.open('POST', url);
            const formData = this.getFormData(data);
            xhr.send(formData);
        }
    }

    getFormData(data) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        })

        return formData;
    }
}