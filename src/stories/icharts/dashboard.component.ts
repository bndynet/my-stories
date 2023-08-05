import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {
  Chart,
  chart,
  ChartOptions,
  ChartType,
  GaugeChart,
  GaugeChartData,
  GaugeChartOptions,
  GaugeChartVariant,
  PieChartOptions,
  registerTheme,
} from '@bndynet/icharts';
import { gPieData, pieData, pieDataLarge, pieDataSmall } from './pie.data';
import { DATA_XY_CHART, gXYData } from './xy.data';
import { merge } from 'lodash-es';
import { generate, generateMonths } from '@bndynet/dator';

const themeName = 'full-screen';
registerTheme(
  themeName,
  {
    textColor: '#888888',
    axisLineColor: '#888888',
  },
  true
);

const options: ChartOptions<any> = {
  // colors: [
  //   '#E03119',
  //   '#2A3685',
  //   '#F4E242',
  //   '#DD8838',
  //   '#3D9749',
  //   '#982687',
  //   '#A3A3A3',
  //   '#A3672D',
  // ],
  // colors: [
  //   '#144DCE',
  //   '#704CB6',
  //   '#318AF4',
  //   '#3D9A68',
  //   '#E0A92C',
  //   '#DC7635',
  //   '#CF5051',
  //   '#D952A8',
  // ],
  // colors: ['#00FFFF', '#32CD32', '#FF4500', '#8A2BE2', '#FF9900', '#FF69B4', '#008080'],
  // colors: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#EE7B27'],
  theme: themeName,
};

const chartDefinitions = [
  [
    {
      type: 'pie',
      data: pieDataSmall,
    },
    {
      type: 'pie',
      data: pieDataLarge,
      options: {
        variant: 'donut',
      },
    },
  ],

  [
    {
      type: 'pie',
      data: pieDataSmall,
      options: {
        variant: 'nightingale-rose',
      },
    },
    {
      type: 'pie',
      data: pieDataSmall,
      options: {
        variant: 'half-donut',
        outerRadius: '50%',
        legend: {
          show: true,
        },
        label: { show: false },
      } as PieChartOptions,
    },
  ],
  [
    {
      type: 'gauge',
      data: {
        value: 123,
        maxValue: 200,
      } as GaugeChartData,
      options: {
        secondaryText: 'km/h'
      } as GaugeChartOptions,
      onReady: (chart: Chart) => {
        setInterval(() => {
          const val = Math.round(Math.random() * 200);
          (<GaugeChart>chart).setValue(val);
        }, 2000);
      },
    },
    {
      type: 'gauge',
      data: {
        value: 123,
        maxValue: 200,
      } as GaugeChartData,
      options: {
        variant: GaugeChartVariant.Percentage,
      } as GaugeChartOptions,
      onReady: (chart: Chart) => {
        setInterval(() => {
          const val = Math.round(Math.random() * 200);
          (<GaugeChart>chart).setValue(val);
        }, 2000);
      },
    },
  ],
  [
    {
      type: 'line',
      width: 2,
      height: 2,
      data: DATA_XY_CHART,
      options: {
        dataKey: 'xKey',
      } as GaugeChartOptions,
    },
  ],
];

@Component({
  selector: 'storybook-dashboard',
  template: ``,
  styles: [
    `
      :host {
        color: #efefef;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 240px;
        /* grid-template-rows: 200px; */
        gap: 16px;
        padding: 16px;
        background-color: #000000;
        background-image: url(/d-bg.jpg);
        background-repeat: repeat-y;
      }

      ::ng-deep .chart {
        /* box-sizing: border-box; */
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.2);
        /* border: solid 1px #dedede; */
        /* height: 200px; */
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  constructor(private root: ElementRef) {}

  ngOnInit(): void {
    let rowNum = 1;
    chartDefinitions.forEach((row, rowIdx) => {
      row.forEach((cd: any, cellIdx) => {
        const container = document.createElement('div');
        container.classList.add('chart');
        container.style.gridRow = `${rowIdx + 1} / span ${cd.height ?? 1}`;
        container.style.gridColumn = `${cellIdx + 1} / span ${cd.width ?? '1'}`;
        (this.root.nativeElement as HTMLElement).appendChild(container);

        console.log('dddd', cd.data);
        // delay for getting container size
        setTimeout(() => {
          const chartInstance = chart(
            container,
            cd.type as ChartType,
            cd.data,
            merge({}, options, cd.options)
          );
          chartInstance.render();
          if (cd.onReady) {
            cd.onReady(chartInstance);
          }
        });
      });
    });
  }
}
