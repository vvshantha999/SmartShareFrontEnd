import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-user-tree',
  templateUrl: './user-tree.component.html',
  styleUrls: ['./user-tree.component.less']
})
export class UserTreeComponent implements OnChanges {

  @Input() data;
  @Input() width;
  @Input() height;
  // @ts-ignore
  @ViewChild('userTree')
  private userTreeElementReference: ElementRef;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.length !== 0) {
      this.createChart();
    }
  }

  private createChart() {

    const element = this.userTreeElementReference.nativeElement;
    const data = this.data;

    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    const customForceDirectedTree = this.forceDirectedTree().width(this.width).height(this.height);
    d3.select(element).datum(data).call(customForceDirectedTree);
  }

  private forceDirectedTree() {
    let margin = {top: 10, right: 10, bottom: 10, left: 10};
    let width = 700;
    let height = 700;

    function chart(selection) {
      const data = selection.datum();
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      const root = d3.hierarchy(data);
      const links = root.links();
      const nodes = root.descendants();
      // @ts-ignore
      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links)
          // .id(d => d.id)
            .distance(10)
            .strength(0.8)
        )
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter());

      let previousColour = null;
      const access = ['Read', 'Write', 'Delete'];

      let isDragging = false;

      // adding tool tip

      const Tooltip = selection
        .append('div')
        .attr('class', 'tooltip')
        .style('pointer-events', 'none')
        .style('border', '2px solid #666')
        .style('border-radius', '8px')
        .style('color', 'white');


      const duration = 300;


      const pulse = () => {
        let circle = d3.selectAll('.blink');
        (function repeat() {
          // @ts-ignore
          circle = circle.transition()
            .duration(duration)
            .attr('r', 6)
            .transition()
            .duration(duration * 3)
            .attr('r', 12)
            .ease(d3.easeElasticIn)
            .delay((d, i) => i * 20)
            // .style("fill", d3.interpolateTurbo(Math.random()))
            .on('end', repeat);
        })();
      };
      // tslint:disable-next-line:no-shadowed-variable
      const drag = (simulation) => {
        function dragstarted(d) {
          isDragging = true;
          if (!d3.event.active) {
            simulation.alphaTarget(0.3).restart();
          }
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function dragended(d) {
          if (!d3.event.active) {
            simulation.alphaTarget(0);
          }
          d.fx = null;
          d.fy = null;
          isDragging = false;
        }

        return d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended);
      };

      const mouseover = (d) => {
        Tooltip.transition()
          .duration(duration)
          .style('opacity', () => (!isDragging) ? 0.97 : 0);

        Tooltip.html(() => {

          let innerColumns =
            '<div class=\'col\'>Object:</div>' +
            '<div class=\'col\'>' + d.data.name + '</div>';

          if (!d.children && access.indexOf(d.data.name) in ['Read', 'Write', 'Delete']) {
            innerColumns =
              '<div class=\'col\'>Access:</div>' +
              '<div class=\'col\'>' + d.data.name + '</div>';
          }
          if (d.children && d.depth === 0) {
            innerColumns =
              '<div class=\'col\'>Bucket:</div>' +
              '<div class=\'col\'>' + d.data.name + '</div>';
          }
          return '<div class=\'card bg-dark opacity-1\'>' + '<div class=\'card-body\'>' +
            '<div class = \'row\'>' +
            innerColumns +
            '</div>' +
            '</div></div>';
        }).style('left', (d3.event.pageX - 270) + 'px')
          .style('top', (d3.event.pageY - 160) + 'px');
      };

      const mouseout = () => {
        Tooltip.transition()
          .duration(duration)
          .style('opacity', 0);
      };


      // Building svg
      let svg = selection
        .selectAll('svg')
        .data([data])
        .enter()
        .append('svg')
        .attr('width', chartWidth)
        .attr('height', chartHeight)
        .style('cursor', 'move');
      svg = svg.merge(svg);

      const g = svg.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);


      const link = g.append('g')
        .attr('fill', 'none')
        .attr('stroke', '#666')
        .attr('stroke-width', '1.5px')
        .selectAll('path')
        .data(links)
        .join('path');


      const defs = g.append('svg:defs');
      defs.append('svg:pattern')
        .attr('id', 'image')
        .attr('width', 34)
        .attr('height', 34)
        .attr('x', -16)
        .attr('y', -16)
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('patternUnits', 'userSpaceOnUse')
        .append('svg:image')
        .attr('xlink:href', 'https://user-images.githubusercontent.com/18228016/68896905-56851200-0724-11ea-8a31-b5723aea30fa.png')
        .attr('width', 34)
        .attr('height', 34)
        .attr('x', 0)
        .attr('y', 0);


      const node = g.append('g')
        .attr('class', 'node')
        .style('cursor', 'pointer')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('fill', d => {

          if (d.depth === 0) {
            return 'url(#image)';
          }
          if (d.children) {
            if (1 === d.depth) {
              // tslint:disable-next-line:no-bitwise
              previousColour = '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
              d.data.color = previousColour;
              return previousColour;
            } else if (d.depth > 1) {
              d.data.color = d.parent.data.color;
              return d.parent.data.color;
            }
          } else {
            switch (d.data.name) {
              case 'Read':
                return '#48d146';
              case 'Write':
                return '#33bbff';
              case 'Delete':
                return '#ff3332';
              // default: return
            }
          }
        })
        .attr('class', (d) => (!d.children && access.indexOf(d.data.name) === -1) ? 'blink' : null)
        .attr('stroke', d => (d.depth === 0) ? null : (!d.children) ? 'grey' : 'white')
        .attr('stroke-width', 2)
        .attr('r', d => (d.depth === 0) ? 18 : (!d.children) ? 6 : 12)
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .each(pulse)
        .call(drag(simulation));

      simulation.on('tick', () => {
        link.attr('d', (d) => {
          // tslint:disable-next-line:one-variable-per-declaration
          const dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
          return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 1 0,1 ' + d.target.x + ',' + d.target.y;
        });

        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
      });

      // add zoom capabilities
      const zoomHandler = d3.zoom()
        .on('zoom', zoomAction);

      // Zoom functions
      function zoomAction() {
        // tslint:disable-next-line:max-line-length
        g.attr('transform', `translate(${width / 2 + d3.event.transform.x}, ${height / 2 + d3.event.transform.y})` + 'scale(' + d3.event.transform.k + ')');
      }

      zoomHandler(svg);
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
    return chart;
  }

}
