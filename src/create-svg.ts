import { Canvg } from 'canvg';
import { arc, create, pie } from 'd3';

import { sortBy } from '../../../../helpers';

export type Slice = {
    color: string;
    value: number;
    showLabel?: boolean;
};
const TEXT_COLOR = 'white';
const STROKE_COLOR = 'white';
const TEXT_VALUE_THRESHOLD = 7;
const PI2 = 2 * Math.PI;
const SIZE = 240;

export const createSVG = (data: Slice[]) => {
    sortBy(data, ({ value }) => value, false);
    const svg = create('svg').attr('width', SIZE).attr('height', SIZE);
    const group = svg
        .append('g')
        .attr('transform', `translate(${SIZE / 2}, ${SIZE / 2})`);

    const pieChart = pie<Slice>().value(({ value }) => value);

    const slicesArc = arc<d3.PieArcDatum<Slice>>()
        .startAngle(({ startAngle }) => PI2 - startAngle)
        .endAngle(({ endAngle }) => PI2 - endAngle)
        .innerRadius(45)
        .outerRadius((_, i) => SIZE / 2 - i * 5);

    const textArc = arc<d3.PieArcDatum<Slice>>()
        .startAngle(({ startAngle }) => PI2 - startAngle)
        .endAngle(({ endAngle }) => PI2 - endAngle)
        .innerRadius(45)
        .outerRadius(SIZE / 2);

    group
        .selectAll('path')
        .data(pieChart(data))
        .enter()
        .append('path')
        .attr('d', slicesArc)
        .attr('stroke', STROKE_COLOR)
        .attr('stroke-width', '2px')
        .attr('fill', ({ data: { color } }) => color);

    group
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr(
            'transform',
            (d, i) => `translate(${textArc.centroid(pieChart(data)[i])})`,
        )
        .text(({ showLabel, value }) => (showLabel === false || value <= TEXT_VALUE_THRESHOLD
            ? ''
            : `${value}%`))
        .style('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-family', 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif')
        .attr('font-weight', 400)
        .attr('fill', TEXT_COLOR);

    const svgContent = svg.node()?.outerHTML ?? '';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return '';

    Canvg.fromString(ctx, svgContent).start();

    const image = canvas.toDataURL('img/png');

    return image ?? '';
};
