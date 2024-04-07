import { WorkshopError } from "./erros.js";
import { Logger } from './logger.js';

const log = new Logger('<Advanced Dynamic Audio>');

class WorkshopAPI {
    workshopURL = "";

    constructor(url) {
        this.workshopURL = url;
        log.info('WorkshopAPI initialized');
    }

    async ConvertToJSON(response) {
        if (response.ok) {
            return await response.json();
        } else {
            throw new WorkshopError(response.statusText);
        }
    }

    async ConvertToReadableData(response) {
        if (response.ok) {
            const reader = response.body.getReader();
            const readerData = await reader.read();
            const readerDataText = new TextDecoder().decode(readerData.value);
            return readerDataText;
        } else {
            throw new WorkshopError(response.statusText);
        }
    }

    async ping() {
        try {
            return await fetch(`${this.workshopURL}/api/ping`);
        } catch (error) {
            return new Response(null, { status: 500, statusText: 'Workshop API is offline' });
        }
    }

    async Hello(name) {
        try {
            return await fetch(`${this.workshopURL}/api/hello/${name}`);
        } catch (error) {
            return new Response(null, { status: 500, statusText: 'Unable to say hello' });
        }
    }

    async GetAssets() {
        try {
            return await fetch(`${this.workshopURL}/api/assets`);
        } catch (error) {
            return new Response(null, { status: 500, statusText: 'Unable to get assets' });
        }
    }

    async getWorkshopData() {
        return await fetch(`${this.workshopURL}/api/data`);
    }
}

export { WorkshopAPI };
