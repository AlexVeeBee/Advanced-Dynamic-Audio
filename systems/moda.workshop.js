import { WorkshopAPI } from "../utils/workshop.js";

class WorkshopAsset {
    name = '';
    description = '';
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

class MODAL_WORKSHOP_UI {
    root = document.createElement('div');
    extensionFolderPath = '';
    workshop = null;
    assets = new Array();

    constructor(extensionFolderPath, workshopURL) {
        this.root.attachShadow({ mode: "open" });
        this.root.classList.add('workshop-ui');
        this.root.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${extensionFolderPath}/styles/workshop.css">
            <div class="inner">
                <style>
                .lazy-load {
                    background-image: linear-gradient(90deg, rgba(40,80,60,1), rgba(60,80,120,0.5), rgba(40,80,60,1));
                    background-size: 200% 200%;
                    animation: lazy-load 1.5s linear infinite;
                }

                @keyframes lazy-load {
                    0% {
                        background-position: 0% 50%;
                    }
                    100% {
                        background-position: 200% 50%;
                    }
                }
                </style>
                <div class="fillwidth card lazy-load">
                    <p>Loading...</p>
                </div>
            </div>
        `;

        const workshop = new WorkshopAPI(workshopURL);
        this.workshop = workshop;

        this.extensionFolderPath = extensionFolderPath;
        this._init();
    }

    async _init() {
        await this._initUI();
        await this._initEvents();
    }

    async _initUI() {
        $(this.root.shadowRoot).find('.inner').html(await $.get(`${this.extensionFolderPath}/templates/workshop.html`).then((res) => {
            return res;
        }));
    }

    async _initEvents() {
        // Add your events here

        // get assets
        const assets = await this.workshop.GetAssets();
        const readerDataJson = await this.workshop.ConvertToJSON(assets);
        console.log(readerDataJson);
        const assetsList = readerDataJson.map((asset) => new WorkshopAsset(asset.name, asset.description));
        this.assets = assetsList;
        const html = $(`
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    ${assetsList.map((asset) => `<tr data-path="${asset.path}">
                        <td>${asset.name}</td>
                        <td>${asset.description}</td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>
        `)

        this.root.shadowRoot.querySelector('.workshop-assets').innerHTML = html.html();
        this.root.shadowRoot.querySelectorAll('.lazy-load').forEach((element) => {
            element.classList.remove('lazy-load');
        });
        // $(`#${modal.id} .content .inner .about-asset`).html( readerDataText );
        // $(`#${modal.id} tbody`).html(assets.map((asset) => `<tr><td>${asset}</td></tr>`).join('')
    }
}

export { MODAL_WORKSHOP_UI };
