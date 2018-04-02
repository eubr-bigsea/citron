import Route from '@ember/routing/route';

export default Route.extend({

  init(){
    this._super(...arguments);
    this.set('allVisualizations', [

      {
        'id': 'barchart',
        'name': 'BarCharts',
        'visualizations': [
          {
            'id': 'barchart-single',
            'icon': '',
            'image': 'assets/images/visualizations/barchart-single.png',
            'title': 'BarChart',
            'subtitle': '',
            'description': '',
            'component': 'visualizations/vertical-bar-chart',
            'url': '',
            'dataUrl': 'assets/data/visualizations/barchart-single.json'
          },

          {
            'id': 'barchart-multi',
            'icon': '',
            'image': 'assets/images/visualizations/barchart-multi.png',
            'title': 'Multi-Series BarChart',
            'subtitle': '',
            'description': '',
            'component': 'visualizations/vertical-bar-chart',
            'url': '',
            'dataUrl': 'assets/data/visualizations/barchart-multiple.json'
          }
        ]
      },

      {
        'id': 'linechart',
        'name': 'LineCharts',
        'visualizations': [
          {
            'id': 'linechart-single',
            'icon': '',
            'image': 'assets/images/visualizations/linechart-single.png',
            'title': 'LineChart',
            'subtitle': '',
            'description': '',
            'component': 'visualizations/line-chart',
            'url': '',
            'dataUrl': 'assets/data/visualizations/line-chart.json'
          },

          {
            'id': 'linechart-multi',
            'icon': '',
            'image': 'assets/images/visualizations/linechart-multi.png',
            'title': 'Multi-Series LineChart',
            'subtitle': '',
            'description': '',
            'component': 'visualizations/line-chart',
            'url': '',
            'dataUrl': 'assets/data/visualizations/line-chart-multi.json'
          }
        ]
      },

      {
        'id': 'areachart',
        'name': 'Area Charts',
        'visualizations': [
          {
            'id': 'area-chart',
            'icon': '',
            'image': 'assets/images/visualizations/area-chart.png',
            'title': 'AreaChart',
            'subtitle': '',
            'description': '',
            'component': 'visualizations/area-chart',
            'url': '',
            'dataUrl': 'assets/data/visualizations/area-chart.json'
          }
        ]
      },

      {
        'id': 'map',
        'name': 'Maps',
        'visualizations': [
          {
            'id': 'map-points',
            'icon': '',
            'image': 'assets/images/visualizations/map-chart-points.png',
            'title': 'Leaflet Map with Points',
            'subtitle': '',
            'description': '',
            'component': 'visualizations/map-chart',
            'url': '',
            'dataUrl': 'assets/data/visualizations/map-chart-geojson-points.json'
          },
          {
            'id': 'map-polygons',
            'icon': '',
            'image': 'assets/images/visualizations/map-chart-lines.png',
            'title': 'Leaflet Map with Polygons',
            'subtitle': '',
            'description': '',
            'component': 'visualizations/map-chart',
            'url': '',
            'dataUrl': 'assets/data/visualizations/map-chart-geojson-lines.json'
          },
          {
            'id': 'map-lines',
            'icon': '',
            'image': 'assets/images/visualizations/map-chart-polygon.png',
            'title': 'Leaflet Map with Lines',
            'subtitle': '',
            'description': '',
            'component': 'visualizations/map-chart',
            'url': '',
            'dataUrl': 'assets/data/visualizations/map-chart-geojson-polygon.json'
          },
        ]
      },

      {
        'id': 'piechart',
        'name': 'Pie Charts',
        'visualizations': [
          {
            'id': 'piechart',
            'icon': '',
            'image': 'assets/images/visualizations/piechart.png',
            'title': 'Pie Chart',
            'subtitle': '',
            'description': '',
            'component': 'visualizations/pie-chart',
            'url': '',
            'dataUrl': 'assets/data/visualizations/pie-chart.json'
          }
        ]
      },

      {
        'id': 'donuchart',
        'name': 'Donut Charts',
        'visualizations': [
          {
            'id': 'donutchart',
            'icon': '',
            'image': 'assets/images/visualizations/donutchart.png',
            'title': 'Donut Chart',
            'subtitle': '',
            'description': '',
            'component': 'visualizations/donut-chart',
            'url': '',
            'dataUrl': 'assets/data/visualizations/donut-chart.json'
          }
        ]
      },

      {
        'id': 'scatterplot',
        'name': 'Scatterplot',
        'visualizations': [
          {
            'id': 'scatterplot',
            'icon': '',
            'image': 'assets/images/visualizations/scatterplot.png',
            'title': 'Scatterplot',
            'subtitle': '',
            'description': '',
            'component': 'visualizations/scatter-plot',
            'url': '',
            'dataUrl': 'assets/data/visualizations/scatter-plot.json'
          },
        ]
      }

    ]);

  },

  model(params) {

    const visName = params.vis;
    const visualizations = this.get('allVisualizations');
    let visualization;

    visualizations.forEach(visType => {
      visType.visualizations.forEach(vis => {
        if(visName === vis.id) { visualization = vis; }
      });
    });

    this.set('visualization', visualization)

    const model = {
      'allVisualizations': visualizations,
      'chosenVis': visualization
    };

    return model;

  },

  actions: {
    reloadModel() {
      this.refresh()
    }
  }

});
