import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelativeTimePipe } from './relative-time.pipe';
import { ExcerptPipe } from "./excerpt.pipe";
import { GetValueByKeyPipe } from './get-value-by-key.pipe';
import {MycurrencyPipe} from './custom.currencypipe';

const pipes = [
  RelativeTimePipe,
  ExcerptPipe,
  GetValueByKeyPipe,
  MycurrencyPipe
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule {}
