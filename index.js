// import { saveSettingsDebounced, getRequestHeaders } from '../../../../script.js';
// import { getContext, extension_settings, ModuleWorkerWrapper } from '../../../extensions.js';
// import { isDataURL } from '../../../utils.js';
// import { registerSlashCommand } from '../../../slash-commands.js';

import modalCreator from "./libs/modal.js";
import { GetAssets } from "./utils/assets.js";
import { tryCatch } from "./utils/erros.js";

import { DynamicAmbientAudio } from "./systems/dynamicAmbientAudio.js";

import { Logger } from "./utils/logger.js";
import { WorkshopAPI } from "./utils/workshop.js";
import { MODAL_WORKSHOP_UI } from "./systems/moda.workshop.js";

// import { err } from '../../../../lib/svg-inject.js';
export { MODULE_NAME };
const DEBUG_PREFIX = '<Advanced Dynamic Audio>';

const log = new Logger(DEBUG_PREFIX);
// const workshop = new WorkshopAPI('https://workshop.alexveebee.nl');

const MODULE_NAME = 'Advanced Dynamic Audio';
const extensionName = 'Advanced-Dynamic-Audio';
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

let mainhtml = null;

const buttonClick = async (el, fn) => {
    el.on('click', async () => {
        tryCatch(async () => {
            fn();
        }, (error) => {
            log.error("Button click error:", error);
        });
    });
};

const ambientAudio = new DynamicAmbientAudio();

jQuery(async () => {
    const windowHtml = $(await $.get(`${extensionFolderPath}/window.html`));
    $('#extensions_settings').append(windowHtml);
    mainhtml = $('#advanced-dynamic-audio');
    ambientAudio.init();

    log.info('Starting Advanced Dynamic Audio');

    // tryCatch(() => {
    //     throw new AdvancedDynamicAudioError('This extension is not yet supported');
    // });
    const a = await GetAssets("ambient");

    buttonClick(mainhtml.find('#open_workshop'), async () => {
        const modal = new modalCreator(
            "workshop-modal",
            "Workshop",
            $(`
            <div id="workshop-modal-ui">
                <div class="card fillwidth lazy-load"></div>
            </div>`),
            $(`<div>
                <input type="text" id="workshop-url" placeholder="Workshop URL">
                <button id="workshop-ping">Ping</button>
            </div>`),
            { showclosebutton: true }
        );
        modal.create();
        modal.show();

        const workshopUI = new MODAL_WORKSHOP_UI(extensionFolderPath, 'http://localhost:8080');
        $(`#${modal.id} .content .inner`).html(workshopUI.root);
    });
    buttonClick(mainhtml.find('#test-button'), async () => {
        log.info(a);

        const modal = new modalCreator(
            "debug-modal",
            "debug",
            $(`<div>
                <table>
                <thead>
                    <tr>
                    <th>Path</th>
                    </tr>
                </thead>
                <tbody>
                    ${a.map((asset) => `<tr data-path="${asset}">
                    <td>${asset}</td>
                    <td><button>Play</button></td>
                    </tr>`).join('')}
                </tbody>
                </table>
            </div>`),
            $(`<div></div>`).css({ 'text-align': 'center' }),
            { showclosebutton: true }
        );

        modal.create();
        modal.show();

        // asign event listener
        $(`#${modal.id} tbody tr button`).on('click', (e) => {
            const path = $(e.target).closest('tr').data('path');
            log.info('Playing', path);
            ambientAudio.play(path);
        });
    });
});
