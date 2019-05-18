import { Component, OnInit } from '@angular/core';
import { MatButtonToggleModule} from '@angular/material';

import { WebSocketService } from '../../services';

@Component({
    selector: 'app-plugins-list',
    templateUrl: './plugins.component.html',
    styleUrls: ['./plugins.component.css'],
})
export class PluginsComponent implements OnInit {
    public title = "Available Plugins";
    public plugins: any;

    constructor(private ws: WebSocketService) {}

    ngOnInit() {
        this.ws.call('jail.list_resource', ["PLUGIN", true]).subscribe(
            (res) => {
                console.log(res);
                this.plugins = res;
            },
            (err) => {

            });
    }

}