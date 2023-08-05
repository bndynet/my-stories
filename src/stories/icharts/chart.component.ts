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
  Output,
  EventEmitter,
} from '@angular/core';
import { merge } from 'lodash-es';
import { Chart } from '@bndynet/icharts/dist/types/scripts/core/chart';

@Component({
  selector: 'storybook-ichart',
  standalone: true,
  imports: [CommonModule],
  template: `<div #container [ngStyle]="this.containerStyles"></div>`,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class ChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('container')
  private containerRef!: ElementRef<HTMLDivElement>;

  @Input()
  options?: ChartOptions<any>;

  @Input()
  data?: any;

  @Input()
  type?: string;

  @Input()
  isDark?: boolean;

  @Input()
  size?: {
    width?: number | string;
    height?: number | string;
  };

  @Input()
  styles?: object;

  @Output()
  rendered = new EventEmitter<Chart>();

  get width(): string {
    return typeof this.size?.width === 'number'
      ? this.size.width + 'px'
      : this.size?.width || '100%';
  }

  get height(): string {
    return typeof this.size?.height === 'number'
      ? this.size.height + 'px'
      : this.size?.height || '300px';
  }

  private _chart?: Chart;
  private _viewInit?: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (this._viewInit) {
      this._render();
    }
  }

  ngAfterViewInit(): void {
    this._render();
    this._viewInit = true;
  }

  private _render(): void {
    console.log(`🚀 ~ ChartComponent ~ render ~ render: @input`);
    console.log(this.type);
    console.log(this.data);
    console.log(this.options);
    console.log(this.size);
    console.log(this.isDark);
    if (this._chart) {
      this._chart.dispose();
    }
    this._chart = chart(
      this.containerRef.nativeElement,
      this.type as ChartType,
      this.data,
      merge({}, this.options, {
        theme: this.isDark ? 'dark' : undefined,
      })
    );
    this.rendered.emit(this._chart);
  }

  get containerStyles() {
    const result: any = {
      width: this.width,
      height: this.height,
      ...this.styles,
    };
    if (this.isDark) {
      result['background-image'] = 'url(https://static.bndy.net/images/bg.jpg)';
    }
    return result;
  }
}
