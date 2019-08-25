import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-flower-chart',
  templateUrl: './flower-chart.component.html',
  styleUrls: ['./flower-chart.component.less']
})
export class FlowerChartComponent  {

  @Input() data;
  // @ts-ignore
  @ViewChild('flowerChart')
  private flowerChartReference: ElementRef;

  constructor() {
  }

  private createChart() {

    const element = this.flowerChartReference.nativeElement;
    const data = this.data;
    // @ts-ignore
    const bucketsChart = this.flowerChart().width(400).height(250).colorSchemeValue(0.8);
    d3.select(element).datum(data).call(bucketsChart);

  }

   private flowerChart() {

    let margin = {top: 1, right: 1, bottom: 1, left: 0};
    let width = 1000;
    let height = 1000;
    let colorScheme = d3.interpolatePuRd;
    let colorSchemeValue = 0.6;


    function chart(selection) {

      const data = selection.datum();
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      // Building svg

      let svg = selection
        .selectAll('svg')
        .data([data])
        .enter().append('svg');

      svg.append('g')
        .attr('class', 'flower-chart');

      svg = svg.merge(svg);


      // Defining margins for the chart
      svg.attr('width', (d) => {
        return chartWidth + margin.left + margin.right;
      })
        .attr('height', chartHeight + margin.top + margin.bottom);


      // flower chart core logic begins..

      const flowerChartRadius = Math.min(width, height) / 4;
      const lengthOfInputData = data.length;

      svg.append('g').attr('class', 'petal');

      svg.append('g').attr('class', 'labels');

      svg.append('g').attr('class', 'lines');

      svg.selectAll('g').attr('transform', `translate(${width / 2},${(height) / 2})`);


      const flower = d3.arc()
        .outerRadius(flowerChartRadius * 0.8)
        .innerRadius(10)
        .cornerRadius(10)
        .padRadius((flowerChartRadius * 0.8) / 2);

      const invisibleOuterCircle = d3.arc()
        .innerRadius(flowerChartRadius * 0.9)
        .outerRadius(flowerChartRadius * 0.9);


      function customPie(dataForPie) {
        return d3.pie()
          .startAngle(() => 0)
          .endAngle(() => 2 * Math.PI)
          .padAngle(lengthOfInputData)(dataForPie);
      }

      // Draw Flower Chart

      drawFlowerChart(customPie(data));

      function drawFlowerChart(dataForPetalChart) {
        drawPetals(dataForPetalChart);
        drawPolyLine(dataForPetalChart);
        drawLabels(dataForPetalChart);
      }


      //   creating petals ///

      function drawPetals(dataForPetals) {

        const petals = svg.select('.petal').selectAll('path')
          .data(dataForPetals)
          .join('path')
          .transition().delay(0.4 * (lengthOfInputData * 1000))
          .duration(1000)
          .ease(d3.easeLinear)
          .delay((d, i) => i * lengthOfInputData * 20).style('fill', colorScheme(colorSchemeValue))
          .attr('d', flower);

        // adding stretching effect of each petal
        petals.attrTween('d', (d) => {
          const start = {startAngle: 0, endAngle: 0};
          const interpolate = d3.interpolate(start, d);
          return (t) => flower(interpolate(t));
        });


      }


      function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }

      //   creating lines ///


      function drawPolyLine(dataForPolyline) {
        const polyline = svg.select('.lines').selectAll('polyline')
          .data(dataForPolyline)
          .join('polyline')
          .transition()  // Making the polyline to start triggering after the completion of sectors
          .delay(0.55 * (lengthOfInputData * 1000))
          .transition()
          .duration(1000);

        // Triggering individual line

        polyline.delay((d, i) => i * lengthOfInputData * 10);

        // creating line by joining points from inner arc centroid to outer arc centroid

        polyline.attr('points', (d) => {
          const pos = invisibleOuterCircle.centroid(d);
          pos[0] = flowerChartRadius * (midAngle(d) < Math.PI ? 1 : -1);
          return [flower.centroid(d), invisibleOuterCircle.centroid(d), pos];
        });

        // Adding css styles
        polyline.style('opacity', 0.3)
          .attr('stroke', 'grey')
          .attr('stroke-width', '2px')
          .attr('fill', 'none');
      }


      //   creating labels ///

      function drawLabels(dataForLabels) {

        const label = svg.select('.labels').selectAll('text')
          .data(dataForLabels)
          .join('text').transition()
          .delay(0.8 * (lengthOfInputData * 1000))
          .attr('dy', `${lengthOfInputData * 0.015}em`)
          .text((d) => d.data)
          .transition().duration((d, i) => i * 0.2 * (lengthOfInputData * 100));

        // Moving the label next to the created line

        label.attr('transform', (d) => {
          const pos = invisibleOuterCircle.centroid(d);
          const decidingSide = (midAngle(d) < Math.PI ? 1 : -1);
          pos[0] = ((flowerChartRadius) * 1.05 * decidingSide);
          return 'translate(' + pos + ')';
        });

        // Aligning the label next to the created line
        label.styleTween('text-anchor', (d) => {
          return (t) => midAngle(d) < Math.PI ? 'start' : 'end';
        });
      }

    }

     // tslint:disable-next-line:only-arrow-functions
    chart.width = function(_) {
      return arguments.length ? ((width = _) , chart) : width;
    };
     // tslint:disable-next-line:only-arrow-functions
    chart.height = function(_) {
      return arguments.length ? ((height = _) , chart) : height;
    };
     // tslint:disable-next-line:only-arrow-functions
    chart.margin = function(_) {
      return arguments.length ? ((margin = _) , chart) : margin;
    };
     // tslint:disable-next-line:only-arrow-functions
    chart.colorScheme = function(_) {
      return arguments.length ? ((colorScheme = _) , chart) : colorScheme;
    };
     // tslint:disable-next-line:only-arrow-functions
    chart.colorSchemeValue = function(_) {
      return arguments.length ? ((colorSchemeValue = _) , chart) : colorSchemeValue;
    };

    return chart;
  }


}
