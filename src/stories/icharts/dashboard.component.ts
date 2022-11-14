import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {
  chart,
  ChartOptions,
  ChartType,
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
  // colors: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#EE7B27'],
  theme: themeName,
};

const chartDefinitions = [
  {
    type: 'pie',
    data: pieDataSmall,
    width: '50%',
  },
  {
    type: 'pie',
    data: pieDataLarge,
    width: '50%',
    options: {
      variant: 'donut',
    },
  },
  {
    type: 'pie',
    data: pieDataSmall,
    width: '50%',
    options: {
      variant: 'nightingale-rose',
    },
  },
  {
    type: 'pie',
    data: pieDataSmall,
    width: '50%',
    options: {
      variant: 'half-donut',
      outerRadius: '50%',
      legend: {
        show: true,
      },
      label: { show: false },
    } as PieChartOptions,
  },
  {
    type: 'line',
    data: DATA_XY_CHART,
    width: '100%',
    options: {
      dataKey: 'xKey',
    }
  },
];

@Component({
  selector: 'storybook-dashboard',
  template: ``,
  styles: [
    `
      :host {
        color: #efefef;
        display: block;
        height: 1000px;
        padding: 1rem;
        margin: 0rem;
        background-color: #000000;
        background-image: url(/d-bg.jpg);
      }

      ::ng-deep .chart {
        box-sizing: border-box;
        float: left;
        height: 300px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.2);
        /* border: solid 1px #dedede; */
        margin: 1rem;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  constructor(private root: ElementRef) {}

  ngOnInit(): void {
    chartDefinitions.forEach((cd) => {
      const container = document.createElement('div');
      container.classList.add('chart');
      container.style.width = `calc(${cd.width || '50%'} - 2rem)`;
      (this.root.nativeElement as HTMLElement).appendChild(container);

      console.log('dddd', cd.data);
      const chartInstance = chart(
        container,
        cd.type as ChartType,
        cd.data,
        merge({}, options, cd.options)
      );
      chartInstance.render();
    });
  }
}
