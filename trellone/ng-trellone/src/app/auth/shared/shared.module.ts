import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  imports: [CommonModule, ComponentsModule, ServicesModule],
  exports: [ComponentsModule]
})
export class SharedModule {}
