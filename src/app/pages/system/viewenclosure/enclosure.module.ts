import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'app/appMaterial.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { ViewEnclosureComponent } from './view-enclosure.component';
import { EnclosureDisksComponent } from './enclosure-disks/enclosure-disks.component';
import { DiskComponent } from './enclosure-disks/disk.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule, TranslateModule, FlexLayoutModule
  ],
  declarations: [
    ViewEnclosureComponent,
    EnclosureDisksComponent,
    DiskComponent
  ],
  providers: []
})
export class EnclosureModule {}
