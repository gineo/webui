import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FieldConfig } from 'app/pages/common/entity/entity-form/models/field-config.interface';
import helptext from 'app/helptext/system/ssh-keypairs';
import { AppLoaderService } from '../../../../services/app-loader/app-loader.service';
import { EntityUtils } from '../../../common/entity/utils';
import { WebSocketService, DialogService } from '../../../../services';

@Component({
    selector: 'app-ssh-keypairs-form',
    template: `<entity-form [conf]='this'></entity-form>`
})
export class SshKeypairsFormComponent {

    protected queryCall = 'keychaincredential.query';
    protected queryCallOption = [["id", "="]];
    protected addCall = 'keychaincredential.create';
    protected editCall = 'keychaincredential.update';
    protected route_success: string[] = ['system', 'sshkeypairs'];
    protected isEntity = true;
    protected entityForm: any;

    protected fieldConfig: FieldConfig[] = [
        {
            type: 'input',
            name: 'name',
            placeholder: helptext.name_placeholder,
            tooltip: helptext.name_tooltip,
            required: true,
            validation: [Validators.required]
        }, {
            type: 'textarea',
            name: 'private_key',
            placeholder: helptext.private_key_placeholder,
            tooltip: helptext.private_key_tooltip,
            required: true,
            validation: [Validators.required]
        }, {
            type: 'textarea',
            name: 'public_key',
            placeholder: helptext.public_key_placeholder,
            tooltip: helptext.public_key_tooltip,
            required: true,
            validation: [Validators.required]
        }
    ]

    protected custActions = [
        {
            id: 'generate_key',
            name: helptext.generate_key_button,
            function: () => {
                this.loader.open();
                this.ws.call('keychaincredential.generate_ssh_key_pair').subscribe(
                    (res) => {
                        this.loader.close();
                        this.entityForm.formGroup.controls['private_key'].setValue(res.private_key);
                        this.entityForm.formGroup.controls['public_key'].setValue(res.public_key);
                    },
                    (err) => {
                        this.loader.close();
                        new EntityUtils().handleWSError(this, err, this.dialogService);
                    }
                )
            }
        },
    ];

    constructor(private aroute: ActivatedRoute, private ws: WebSocketService, private loader: AppLoaderService,
        private dialogService: DialogService) { }

    preInit() {
        this.aroute.params.subscribe(params => {
            if (params['pk']) {
                this.queryCallOption[0].push(params['pk']);
            }
        });
    }

    afterInit(entityForm) {
        this.entityForm = entityForm;
    }

    resourceTransformIncomingRestData(wsResponse) {
        for (const item in wsResponse.attributes) {
            wsResponse[item] = wsResponse.attributes[item];
        }
        return wsResponse;
    }

    beforeSubmit(data) {
        if (this.entityForm.isNew) {
            data['type'] = 'SSH_KEY_PAIR';
        }

        data['attributes'] = {
            'private_key': data['private_key'],
            'public_key': data['public_key'],
        }

        delete data['private_key'];
        delete data['public_key'];
        return data;
    }
}