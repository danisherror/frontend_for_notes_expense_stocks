/**
 * Sample for Stock Chart with Default
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme, DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, DateTimeCategory } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { defaultData } from './indicator-data';
import { EmitType } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .charts {
        align :center
    }`;

const Default = () => {

    const load = (args: IStockChartEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,  'Contrast') as ChartTheme;
    }

    const tooltipRender: EmitType<ITooltipRenderEventArgs> = (args: ITooltipRenderEventArgs) => {
        if (args.text.split('<br/>')[4]) {
            let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
            let value: string = (target / 100000000).toFixed(1) + 'B';
            args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <StockChartComponent id='stockchartdefault' primaryXAxis={{ valueType: 'DateTimeCategory', majorGridLines: { width: 0 }, majorTickLines: { color: 'transparent' }, crosshairTooltip: { enable: true } }} primaryYAxis={{ labelFormat: 'n0', lineStyle: { width: 0 }, rangePadding: 'None', majorTickLines: { height: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true }} tooltipRender={tooltipRender} crosshair={{ enable: true }} load={load.bind(this)} title='AAPL Stock Price'>
                    <Inject services={[DateTime, DateTimeCategory, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective dataSource={defaultData} xName='x' type='Candle' animation={{ enable: true }} />
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
            </div>
        </div>
    )
}
export default Default;