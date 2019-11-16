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

  private testData =
    {
      name: 'flare',
      children: [
        {
          name: 'analytics',
          children: [
            {
              name: 'cluster',
              children: [
                {name: 'AgglomerativeCluster', size: 3938},
                {name: 'CommunityStructure', size: 3812},
                {name: 'HierarchicalCluster', size: 6714},
                {name: 'MergeEdge', size: 743}
              ]
            },
            {
              name: 'graph',
              children: [
                {name: 'BetweennessCentrality', size: 3534},
                {name: 'LinkDistance', size: 5731},
                {name: 'MaxFlowMinCut', size: 7840},
                {name: 'ShortestPaths', size: 5914},
                {name: 'SpanningTree', size: 3416}
              ]
            },
            {
              name: 'optimization',
              children: [
                {name: 'AspectRatioBanker', size: 7074}
              ]
            }
          ]
        },
        {
          name: 'animate',
          children: [
            {name: 'Easing', size: 17010},
            {name: 'FunctionSequence', size: 5842},
            {
              name: 'interpolate',
              children: [
                {name: 'ArrayInterpolator', size: 1983},
                {name: 'ColorInterpolator', size: 2047},
                {name: 'DateInterpolator', size: 1375},
                {name: 'Interpolator', size: 8746},
                {name: 'MatrixInterpolator', size: 2202},
                {name: 'NumberInterpolator', size: 1382},
                {name: 'ObjectInterpolator', size: 1629},
                {name: 'PointInterpolator', size: 1675},
                {name: 'RectangleInterpolator', size: 2042}
              ]
            },
            {name: 'ISchedulable', size: 1041},
            {name: 'Parallel', size: 5176},
            {name: 'Pause', size: 449},
            {name: 'Scheduler', size: 5593},
            {name: 'Sequence', size: 5534},
            {name: 'Transition', size: 9201},
            {name: 'Transitioner', size: 19975},
            {name: 'TransitionEvent', size: 1116},
            {name: 'Tween', size: 6006}
          ]
        },
        {
          name: 'data',
          children: [
            {
              name: 'converters',
              children: [
                {name: 'Converters', size: 721},
                {name: 'DelimitedTextConverter', size: 4294},
                {name: 'GraphMLConverter', size: 9800},
                {name: 'IDataConverter', size: 1314},
                {name: 'JSONConverter', size: 2220}
              ]
            },
            {name: 'DataField', size: 1759},
            {name: 'DataSchema', size: 2165},
            {name: 'DataSet', size: 586},
            {name: 'DataSource', size: 3331},
            {name: 'DataTable', size: 772},
            {name: 'DataUtil', size: 3322}
          ]
        },
        {
          name: 'display',
          children: [
            {name: 'DirtySprite', size: 8833},
            {name: 'LineSprite', size: 1732},
            {name: 'RectSprite', size: 3623},
            {name: 'TextSprite', size: 10066}
          ]
        },
        {
          name: 'flex',
          children: [
            {name: 'FlareVis', size: 4116}
          ]
        },
        {
          name: 'physics',
          children: [
            {name: 'DragForce', size: 1082},
            {name: 'GravityForce', size: 1336},
            {name: 'IForce', size: 319},
            {name: 'NBodyForce', size: 10498},
            {name: 'Particle', size: 2822},
            {name: 'Simulation', size: 9983},
            {name: 'Spring', size: 2213},
            {name: 'SpringForce', size: 1681}
          ]
        },
        {
          name: 'query',
          children: [
            {name: 'AggregateExpression', size: 1616},
            {name: 'And', size: 1027},
            {name: 'Arithmetic', size: 3891},
            {name: 'Average', size: 891},
            {name: 'BinaryExpression', size: 2893},
            {name: 'Comparison', size: 5103},
            {name: 'CompositeExpression', size: 3677},
            {name: 'Count', size: 781},
            {name: 'DateUtil', size: 4141},
            {name: 'Distinct', size: 933},
            {name: 'Expression', size: 5130},
            {name: 'ExpressionIterator', size: 3617},
            {name: 'Fn', size: 3240},
            {name: 'If', size: 2732},
            {name: 'IsA', size: 2039},
            {name: 'Literal', size: 1214},
            {name: 'Match', size: 3748},
            {name: 'Maximum', size: 843},
            {
              name: 'methods',
              children: [
                {name: 'add', size: 593},
                {name: 'and', size: 330},
                {name: 'average', size: 287},
                {name: 'count', size: 277},
                {name: 'distinct', size: 292},
                {name: 'div', size: 595},
                {name: 'eq', size: 594},
                {name: 'fn', size: 460},
                {name: 'gt', size: 603},
                {name: 'gte', size: 625},
                {name: 'iff', size: 748},
                {name: 'isa', size: 461},
                {name: 'lt', size: 597},
                {name: 'lte', size: 619},
                {name: 'max', size: 283},
                {name: 'min', size: 283},
                {name: 'mod', size: 591},
                {name: 'mul', size: 603},
                {name: 'neq', size: 599},
                {name: 'not', size: 386},
                {name: 'or', size: 323},
                {name: 'orderby', size: 307},
                {name: 'range', size: 772},
                {name: 'select', size: 296},
                {name: 'stddev', size: 363},
                {name: 'sub', size: 600},
                {name: 'sum', size: 280},
                {name: 'update', size: 307},
                {name: 'variance', size: 335},
                {name: 'where', size: 299},
                {name: 'xor', size: 354},
                {name: '_', size: 264}
              ]
            },
            {name: 'Minimum', size: 843},
            {name: 'Not', size: 1554},
            {name: 'Or', size: 970},
            {name: 'Query', size: 13896},
            {name: 'Range', size: 1594},
            {name: 'StringUtil', size: 4130},
            {name: 'Sum', size: 791},
            {name: 'Variable', size: 1124},
            {name: 'Variance', size: 1876},
            {name: 'Xor', size: 1101}
          ]
        },
        {
          name: 'scale',
          children: [
            {name: 'IScaleMap', size: 2105},
            {name: 'LinearScale', size: 1316},
            {name: 'LogScale', size: 3151},
            {name: 'OrdinalScale', size: 3770},
            {name: 'QuantileScale', size: 2435},
            {name: 'QuantitativeScale', size: 4839},
            {name: 'RootScale', size: 1756},
            {name: 'Scale', size: 4268},
            {name: 'ScaleType', size: 1821},
            {name: 'TimeScale', size: 5833}
          ]
        },
        {
          name: 'util',
          children: [
            {name: 'Arrays', size: 8258},
            {name: 'Colors', size: 10001},
            {name: 'Dates', size: 8217},
            {name: 'Displays', size: 12555},
            {name: 'Filter', size: 2324},
            {name: 'Geometry', size: 10993},
            {
              name: 'heap',
              children: [
                {name: 'FibonacciHeap', size: 9354},
                {name: 'HeapNode', size: 1233}
              ]
            },
            {name: 'IEvaluable', size: 335},
            {name: 'IPredicate', size: 383},
            {name: 'IValueProxy', size: 874},
            {
              name: 'math',
              children: [
                {name: 'DenseMatrix', size: 3165},
                {name: 'IMatrix', size: 2815},
                {name: 'SparseMatrix', size: 3366}
              ]
            },
            {name: 'Maths', size: 17705},
            {name: 'Orientation', size: 1486},
            {
              name: 'palette',
              children: [
                {name: 'ColorPalette', size: 6367},
                {name: 'Palette', size: 1229},
                {name: 'ShapePalette', size: 2059},
                {name: 'SizePalette', size: 2291}
              ]
            },
            {name: 'Property', size: 5559},
            {name: 'Shapes', size: 19118},
            {name: 'Sort', size: 6887},
            {name: 'Stats', size: 6557},
            {name: 'Strings', size: 22026}
          ]
        },
        {
          name: 'vis',
          children: [
            {
              name: 'axis',
              children: [
                {name: 'Axes', size: 1302},
                {name: 'Axis', size: 24593},
                {name: 'AxisGridLine', size: 652},
                {name: 'AxisLabel', size: 636},
                {name: 'CartesianAxes', size: 6703}
              ]
            },
            {
              name: 'controls',
              children: [
                {name: 'AnchorControl', size: 2138},
                {name: 'ClickControl', size: 3824},
                {name: 'Control', size: 1353},
                {name: 'ControlList', size: 4665},
                {name: 'DragControl', size: 2649},
                {name: 'ExpandControl', size: 2832},
                {name: 'HoverControl', size: 4896},
                {name: 'IControl', size: 763},
                {name: 'PanZoomControl', size: 5222},
                {name: 'SelectionControl', size: 7862},
                {name: 'TooltipControl', size: 8435}
              ]
            },
            {
              name: 'data',
              children: [
                {name: 'Data', size: 20544},
                {name: 'DataList', size: 19788},
                {name: 'DataSprite', size: 10349},
                {name: 'EdgeSprite', size: 3301},
                {name: 'NodeSprite', size: 19382},
                {
                  name: 'render',
                  children: [
                    {name: 'ArrowType', size: 698},
                    {name: 'EdgeRenderer', size: 5569},
                    {name: 'IRenderer', size: 353},
                    {name: 'ShapeRenderer', size: 2247}
                  ]
                },
                {name: 'ScaleBinding', size: 11275},
                {name: 'Tree', size: 7147},
                {name: 'TreeBuilder', size: 9930}
              ]
            },
            {
              name: 'events',
              children: [
                {name: 'DataEvent', size: 2313},
                {name: 'SelectionEvent', size: 1880},
                {name: 'TooltipEvent', size: 1701},
                {name: 'VisualizationEvent', size: 1117}
              ]
            },
            {
              name: 'legend',
              children: [
                {name: 'Legend', size: 20859},
                {name: 'LegendItem', size: 4614},
                {name: 'LegendRange', size: 10530}
              ]
            },
            {
              name: 'operator',
              children: [
                {
                  name: 'distortion',
                  children: [
                    {name: 'BifocalDistortion', size: 4461},
                    {name: 'Distortion', size: 6314},
                    {name: 'FisheyeDistortion', size: 3444}
                  ]
                },
                {
                  name: 'encoder',
                  children: [
                    {name: 'ColorEncoder', size: 3179},
                    {name: 'Encoder', size: 4060},
                    {name: 'PropertyEncoder', size: 4138},
                    {name: 'ShapeEncoder', size: 1690},
                    {name: 'SizeEncoder', size: 1830}
                  ]
                },
                {
                  name: 'filter',
                  children: [
                    {name: 'FisheyeTreeFilter', size: 5219},
                    {name: 'GraphDistanceFilter', size: 3165},
                    {name: 'VisibilityFilter', size: 3509}
                  ]
                },
                {name: 'IOperator', size: 1286},
                {
                  name: 'label',
                  children: [
                    {name: 'Labeler', size: 9956},
                    {name: 'RadialLabeler', size: 3899},
                    {name: 'StackedAreaLabeler', size: 3202}
                  ]
                },
                {
                  name: 'layout',
                  children: [
                    {name: 'AxisLayout', size: 6725},
                    {name: 'BundledEdgeRouter', size: 3727},
                    {name: 'CircleLayout', size: 9317},
                    {name: 'CirclePackingLayout', size: 12003},
                    {name: 'DendrogramLayout', size: 4853},
                    {name: 'ForceDirectedLayout', size: 8411},
                    {name: 'IcicleTreeLayout', size: 4864},
                    {name: 'IndentedTreeLayout', size: 3174},
                    {name: 'Layout', size: 7881},
                    {name: 'NodeLinkTreeLayout', size: 12870},
                    {name: 'PieLayout', size: 2728},
                    {name: 'RadialTreeLayout', size: 12348},
                    {name: 'RandomLayout', size: 870},
                    {name: 'StackedAreaLayout', size: 9121},
                    {name: 'TreeMapLayout', size: 9191}
                  ]
                },
                {name: 'Operator', size: 2490},
                {name: 'OperatorList', size: 5248},
                {name: 'OperatorSequence', size: 4190},
                {name: 'OperatorSwitch', size: 2581},
                {name: 'SortOperator', size: 2023}
              ]
            },
            {name: 'Visualization', size: 16540}
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
        .force('charge', d3.forceManyBody().strength(-50))
        .force('x', d3.forceX())
        .force('y', d3.forceY());

      let isDragging = false;

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
              '<th scope=\'row\'>Owner :</th>' + '<td>' + d.data.name + '</td>' +
              '</tr>' +
              '<tr>' +
              '<th scope=\'row\'>File :</th>' + '<td> sample/</td>' +
              '</tr>';

          } else {
            innerTableContent =
              '<tr>' +
              '<th scope=\'row\'>User :</th>' + '<td>' + d.data.name + '</td>' +
              '</tr>' +
              '<tr>' +
              '<th scope=\'row\'>Access Given :</th>' + '<td> Read </td>' +
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
        .attr('fill', d => d.children ? '#fff' : '#000')
        .attr('stroke', d => d.children ? null : 'red')
        .attr('stroke-width', d => d.children ? 1 : 2)
        .attr('r', d => d.children ? 6 : 3)
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
