import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent]
})
export class ComponentsModule {}
