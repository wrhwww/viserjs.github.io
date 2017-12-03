export const template =
`import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { ViserModule } from 'viser-ng';

const data = [
  { label: 'Mon.', series1: 2800, series2: 2260 },
  { label: 'Tues.', series1: 1800, series2: 1300 },
  { label: 'Wed.', series1: 950, series2: 900 },
  { label: 'Thur.', series1: 500, series2: 390 },
  { label: 'Fri.', series1: 170, series2: 100 },
];

const dataPre = {
  transform: {
    type: 'fold',
    fields: [ 'series1', 'series2' ],
    key: 'type',
    value: 'value',
  },
};

const label = { offset: 12 };
const adjust = [{ type: 'dodge', marginRatio: 1 / 32 }];

@Component({
  selector: '#mount',
  template: \`
  <div>
    <Chart [forceFit]="forceFit" [height]="height" [data]="data" [dataPre]="dataPre">
      <Coord type="rect" direction="LT"></Coord>
      <Tooltip></Tooltip>
      <Legend></Legend>
      <Axis dataKey="coutry" position="right"></Axis>
      <Axis dataKey="label" [label]="label"></Axis>
      <Bar position="label*value" [adjust]="adjust"></Bar>
    </Chart>
  </div>
  \`
})

class AppComponent {
  forceFit: boolean= true;
  height: number = 400;
  data = data;
  dataPre = dataPre;
  label = label;
  adjust = adjust;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViserModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
`;