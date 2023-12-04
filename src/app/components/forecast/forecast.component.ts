import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
})
export class ForecastComponent implements AfterViewInit, OnDestroy {
  @Input() country: Country | undefined;
  private chart: am5xy.XYChart | undefined;
  private readonly SMOOTH_ANIMATION_DURATION = 1000;
  private readonly SMOOTH_ANIMATION_DELAY = 100;

  darkGrey = '#8ca0b4';
  midGrey = '#b4c8dc';
  lightGrey = '#e8eef4';
  black = '#2c343c';
  fontFamily = 'Fredoka';
  fontSize = 18;

  ngAfterViewInit(): void {
    if (this.chart) {
      this.chart.dispose();
    }
    this.initializeChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  private initializeChart(): void {
    const data = this.country?.fiveDayForecast?.forecast;
    if (!data) {
      return;
    }

    let root = am5.Root.new('chartdiv');
    this.chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'zoomX',
        layout: root.verticalLayout,
        paddingBottom: 30,
        paddingLeft: 0,
        paddingRight: 10,
        paddingTop: 0,
      })
    );

    const yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.labels.template.set('visible', false);
    yRenderer.grid.template.setAll({
      strokeOpacity: 0,
      strokeWidth: 0,
    });
    const yAxis = this.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
      })
    );

    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.set('visible', true);
    xRenderer.labels.template.set('fill', am5.color(this.black));
    xRenderer.labels.template.set('fontSize', this.fontSize);
    xRenderer.labels.template.set('fontFamily', this.fontFamily);
    xRenderer.grid.template.setAll({
      strokeOpacity: 0,
      strokeWidth: 0,
    });
    const xAxis = this.chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: 'day',
      })
    );

    yAxis.data.setAll(data);
    xAxis.data.setAll(data);

    const maxTempSeries = this.chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'maxTempSeries',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'temp_max',
        categoryXField: 'day',
        stroke: am5.color(this.darkGrey),
      })
    );
    const minTempSeries = this.chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'minTempSeries',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'temp_min',
        categoryXField: 'day',
        stroke: am5.color(this.midGrey),
      })
    );

    maxTempSeries.data.setAll(data);
    minTempSeries.data.setAll(data);

    maxTempSeries.bullets.push(() => {
      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: am5.Circle.new(root, {
          radius: 3,
          strokeOpacity: 0,
          fill: am5.color(this.darkGrey),
        }),
      });
    });
    minTempSeries.bullets.push(() => {
      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: am5.Circle.new(root, {
          radius: 3,
          strokeOpacity: 0,
          fill: am5.color(this.midGrey),
        }),
      });
    });

    maxTempSeries.appear(this.SMOOTH_ANIMATION_DURATION);
    minTempSeries.appear(this.SMOOTH_ANIMATION_DURATION);
    this.chart.appear(this.SMOOTH_ANIMATION_DELAY);
  }
}
