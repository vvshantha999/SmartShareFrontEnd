import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-owner-tree',
  templateUrl: './owner-tree.component.html',
  styleUrls: ['./owner-tree.component.less']
})
export class OwnerTreeComponent implements OnInit {

  @Input() data;
  @Input() width;
  @Input() height;
  // @ts-ignore
  @ViewChild('ownerTree')
  private ownerTreeElementReference: ElementRef;

  private testData = {
    name: 'bucket975351',
    owner: '',
    accessInfo: null,
    completeName: '/',
    lastModified: null,
    children: [
      {
        name: 'sar.jpeg',
        owner: '',
        user: 'sethuram',
        accessInfo: null,
        completeName: '18228016.jpeg',
        lastModified: 'Apr 2, 2020, 5:18:10 AM'
      },
      {
        name: '18228016.jpeg',
        owner: '',
        user: 'sethuram',
        accessInfo: null,
        completeName: 'test5/18228016.jpeg',
        lastModified: 'Apr 6, 2020, 8:30:13 PM'
      },
      {
        name: 'sample.pdf',
        owner: '',
        accessInfo: null,
        completeName: 'sample.pdf',
        lastModified: 'Mar 7, 2020, 11:49:30 PM'
      },
      {
        name: 'sample',
        owner: '',
        accessInfo: null,
        completeName: 'sample/',
        lastModified: null,
        children: [
          {
            name: 'ibm-blockchain_second-edition_final_XIM12354USEN.pdf',
            owner: '',
            accessInfo: null,
            completeName: 'sample/ibm-blockchain_second-edition_final_XIM12354USEN.pdf',
            lastModified: 'Apr 6, 2020, 8:26:25 PM'
          }
        ]
      },
      {
        name: 'test5',
        owner: '',
        accessInfo: null,
        completeName: 'test5/',
        lastModified: null,
        children: [
          {
            name: '18228016.jpeg',
            owner: '',
            user: 'sethuram',
            accessInfo: null,
            completeName: 'test5/18228016.jpeg',
            lastModified: 'Apr 6, 2020, 8:30:13 PM'
          },
          {
            name: '18228016.jpeg',
            owner: '',
            user: 'ramu',
            accessInfo: null,
            completeName: 'test5/18228016.jpeg',
            lastModified: 'Apr 6, 2020, 8:30:13 PM'
          },
          {
            name: '18228016.jpeg',
            owner: '',
            user: 'reddy',
            accessInfo: null,
            completeName: 'test5/18228016.jpeg',
            lastModified: 'Apr 6, 2020, 8:30:13 PM'
          },
          {
            name: 'ibm-blockchain_second-edition_final_XIM12354USEN.pdf',
            owner: '',
            accessInfo: null,
            completeName: 'sample/ibm-blockchain_second-edition_final_XIM12354USEN.pdf',
            lastModified: 'Apr 6, 2020, 8:26:25 PM'
          }
        ]
      }
    ]
  };


  constructor() {
  }

  ngOnInit() {
    this.data = this.testData;
    this.createChart();
  }

  public createChart() {

    const element = this.ownerTreeElementReference.nativeElement;
    const data = this.data;

    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    const customForceDirectedTree = this.forceDirectedTree().width(this.ownerTreeElementReference.nativeElement.clientWidth).height(this.height);
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
          .distance(0)
          .strength(1)
        )
        .force('charge', d3.forceManyBody().strength(-80))
        .force('x', d3.forceX())
        .force('y', d3.forceY());

      let isDragging = false;
      let previousFill = null;
      let category = null;
      let previousStroke = null;

      // adding tool tip

      const Tooltip = selection
        .append('div')
        .attr('class', 'tooltip')
        .style('font-size', '12px')
        .style('pointer-events', 'none');

      const duration = 300;

      const mouseover = (d) => {
        Tooltip.transition()
          .duration(duration)
          .style('opacity', () => (!isDragging) ? 0.97 : 0);

        Tooltip.html(() => {
          let innerTableContent;
          if (d.children) {
            innerTableContent =
              '<tr>' +
              '<th scope=\'row\'>Owner :</th>' + '<td>' + d.data.owner + '</td>' +
              '</tr>' +
              '<tr>' +
              '<th scope=\'row\'>Folder :</th>' + '<td>' + d.data.completeName + '</td>' +
              '</tr>';

          } else {
            innerTableContent =
              '<tr>' +
              '<th scope=\'row\'>File :</th>' + '<td>' + d.data.name + '</td>' +
              '</tr>' +
              '<tr>' +
              '<th scope=\'row\'>User :</th>' + '<td>' + d.data.user + '</td>' +
              '</tr>' +
              '<tr>' +
              '<th scope=\'row\'>Access Given :</th>' + '<td>' + d.data.accessInfo + '</td>' +
              '</tr>';
          }
          return '<div class=\'card bg-dark\'>' + '<div class=\'card-body\'>' +
            '<table class=\'table table-striped table-dark\'>' +
            '<tbody>' +
            innerTableContent +
            '</tbody>' +
            '</table>' +
            '</div></div>';
        }).style('left', (d3.event.pageX - 270) + 'px')
          .style('top', (d3.event.pageY - 225) + 'px');
      };

      const mouseout = () => {
        Tooltip.transition()
          .duration(duration)
          .style('opacity', 0);
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

      const node = g.append('g')
        .attr('stroke', 'red')
        .style('cursor', 'pointer')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('stroke', d => {
          if (d.children === undefined) {
            if (d.data.name !== category) {
              category = d.data.name;
              previousStroke = '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
              return previousStroke;
            }
            return previousStroke;
          }
          return 'red';
        })
        .attr('fill', d => {
          if (d.children === undefined) {
            if (d.data.name !== category) {
              category = d.data.name;
              previousFill = '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
              return previousFill;
            }
            return previousFill;

          }
          return '#fff';
        })
        .attr('stroke-width', d => d.children ? 1 : 0.5)
        .attr('r', d => d.children ? 8 : 4)
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
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
