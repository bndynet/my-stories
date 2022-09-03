import { chart, ChartOptions, ChartType } from '@bndynet/icharts';
import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { merge } from 'lodash-es';
import { Chart } from '@bndynet/icharts/dist/types/scripts/core/chart';

@Component({
  selector: 'storybook-ichart',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    #container
    [style.width]="this.size?.width || '100%'"
    [style.height]="this.size?.height || '300px'"
  ></div>`,
})
export class ChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('container')
  private containerRef!: ElementRef<HTMLDivElement>;

  @Input()
  options?: ChartOptions<any>;

  @Input()
  data?: object;

  @Input()
  type?: string;

  @Input()
  isDark?: boolean;

  @Input()
  size?: { width?: number | string; height?: number | string };

  private chart?: Chart;
  private viewInit?: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.viewInit) {
      this.render();
    }
  }

  ngAfterViewInit(): void {
    this.render();
    this.viewInit = true;
  }

  private render(): void {
    console.log(`🚀 ~ IChartsPieComponent ~ render ~ render: @input`, this.type, this.data, this.options);
    if (this.chart) {
      this.chart.dispose();
    }

    this.chart = chart(
      this.containerRef.nativeElement,
      this.type as ChartType,
      this.data,
      merge(
        this.options,
        {
          theme: this.isDark ? 'dark' : undefined,
        },
      )
    );
  }
}
