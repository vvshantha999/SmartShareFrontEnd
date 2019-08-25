import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-file-tree-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './file-tree-list.component.html',
  styleUrls: ['./file-tree-list.component.less']
})
export class FileTreeListComponent implements OnInit {


  @Input() data;
  // @ts-ignore
  @ViewChild('fileTree')
  private fileTreeReference: ElementRef;

  @Output() selectedFileOrFolderEmitter = new EventEmitter();


  constructor() {
  }

  ngOnInit() {
    this.createChart();
  }

  private createChart() {
    const element = this.fileTreeReference.nativeElement;
    const data = this.data;
    // @ts-ignore
    const fileStructureChart = this.treeList().eventEmitter(this.selectedFileOrFolderEmitter);
    d3.select(element).datum(data).call(fileStructureChart);

  }

  private treeList() {
    let margin = {top: 30, right: 20, bottom: 30, left: 30};
    let width = 1000;
    const barHeight = 20;
    let i = 0;
    const duration = 500;
    const nodeEnterTransition = d3.transition()
      .duration(duration)
      .ease(d3.easeLinear);
    let eventEmitter;

    function chart(selection) {

      const data = selection.datum();
      const root = d3.hierarchy(data);
      const intialHeight = root.descendants().length * barHeight + margin.top + margin.bottom;

      // Building svg

      let svg = selection
        .selectAll('svg')
        .data([data])
        .enter().append('svg').attr('height', intialHeight);

      svg.append('g')
        .attr('width', width)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      svg = svg.merge(svg);
      // const root = d3.hierarchy(data);
      // @ts-ignore
      root.x0 = 0;
      // @ts-ignore
      root.y0 = 0;
      update(root);

      function update(source) {

        // Compute the flattened node list.
        const nodes = root.descendants();

        const height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);

        d3.select('svg').transition()
          .attr('height', height);

        let index = 0;
        root.eachBefore((n) => {
          // @ts-ignore
          n.x = ++index * barHeight;
          // @ts-ignore
          n.y = n.depth * barHeight + 20;
        });

        // Update the nodes…
        const node = svg.selectAll('.node')
          .data(nodes, (d) => d.id || (d.id = ++i));

        const nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr('transform', `translate(${source.y0}, ${source.x0})`)
          .on('click', click)
          .on('mouseover', function(d) {
            d3.select(this).style('cursor', 'pointer');
          });

        // adding arrows
        nodeEnter.append('text')
          .attr('x', -20)
          .attr('y', 2)
          .attr('fill', 'grey')
          .attr('class', 'arrow')
          .attr('class', 'fas')
          .attr('font-size', '12px')
          .text((d) => d.children ? '\uf107' : d._children ? '\uf105' : '');

        // adding file or folder
        nodeEnter.append('text')
          .attr('x', -10)
          .attr('y', 2)
          .attr('fill', (d) => d.children || d._children ? '#e60000' : '#ff4d4d')
          .attr('class', 'fas')
          .attr('font-size', '12px')
          .text((d) => d.children || d._children ? '\uf07b' : '\uf15b');

        // adding file or folder names
        nodeEnter.append('text')
          .attr('dy', 3.5)
          .attr('dx', 5.5)
          .text((d) => d.data.name)
          .on('mouseover', function(d) {
            d3.select(this).classed('selected', true);
          })
          // tslint:disable-next-line:only-arrow-functions
          .on('mouseout', function(d) {
            d3.selectAll('.selected').classed('selected', false);
          });


        // Transition nodes to their new position.
        nodeEnter.transition(nodeEnterTransition)
          .attr('transform', (d) => 'translate(' + d.y + ',' + d.x + ')')
          .style('opacity', 1);

        node.transition()
          .duration(duration)
          .attr('transform', (d) => 'translate(' + d.y + ',' + d.x + ')')
          .style('opacity', 1);


        // Transition exiting nodes to the parent's new position.
        node.exit().transition()
          .duration(duration)
          .attr('transform', () => 'translate(' + source.y + ',' + source.x + ')')
          .style('opacity', 0)
          .remove();


        // Stash the old positions for transition.
        root.each((d) => {
          // @ts-ignore
          d.x0 = d.x;
          // @ts-ignore
          d.y0 = d.y;
        });
      }

      // Toggle children on click.
      function click(d) {
        eventEmitter.emit(d.data.name);
        // if (d.children) {
        //   d._children = d.children;
        //   d.children = null;
        // } else {
        //   d.children = d._children;
        //   d._children = null;
        // }
        // d3.select(this).remove();
        // update(d);
      }
    }

    // tslint:disable-next-line:only-arrow-functions
    chart.width = function(_) {
      return arguments.length ? ((width = _) , chart) : width;
    };
    // tslint:disable-next-line:only-arrow-functions
    chart.margin = function(_) {
      return arguments.length ? ((margin = _) , chart) : margin;
    };
    // tslint:disable-next-line:only-arrow-functions
    chart.eventEmitter = function(_) {
      return arguments.length ? ((eventEmitter = _) , chart) : eventEmitter;
    };
    return chart;
  }


}
