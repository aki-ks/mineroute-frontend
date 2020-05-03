import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServerComponent } from './add-server.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AddServerComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule
  ]
})
export class AddServerModule {}
