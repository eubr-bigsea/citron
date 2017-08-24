import ENV from 'lemonade-ember/config/environment';

export function initialize(/* application */) {
   ENV.APP.visualizations = {
     list: {
       initials: "List",
       component: "visualizations/list-view",
       icon: "fa-list",
       title: "Visualizations",
       subtitle: "Available visualizations.",
       description: "List of available visualizations for the Lemonade framework.",
       dataUrl: "/assets/data/visualizations/list-view.json"
     },
     pie: {
       initials: "Pie",
       component: "visualizations/pie-chart",
       icon: "fa-pie-chart",
       title: "Pie Chart",
       subtitle: "Part to whole",
       description: "A pie chart (or a circle chart) is a circular statistical graphic which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice (and consequently its central angle and area), is proportional to the quantity it represents.",
       url: "visualization?name=pie",
       dataUrl: "/assets/data/visualizations/pie-chart.json"
     },
     donut: {
       initials: "Donut",
       component: "visualizations/donut-chart",
       icon: "fa-pie-chart",
       title: "Donut Chart",
       subtitle: "Part to whole",
       description: "A donut chart (or a circle chart) is a circular statistical graphic which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice (and consequently its central angle and area), is proportional to the quantity it represents.",
       url: "visualization?name=donut",
       dataUrl: "/assets/data/visualizations/donut-chart.json"
     },
     map: {
       initials: "Map",
       component: "visualizations/map-chart",
       icon: "fa-map-marker",
       title: "Map",
       subtitle: "Geographic",
       description: "A representation, usually on a flat surface, as of the features of an area of the earth or a portion of the heavens, showing them in their respective forms, sizes, and relationships according to some.",
       url: "visualization?name=map",
       dataUrl: "/assets/data/visualizations/map-chart.json"
     },
     line: {
       initials: "Line",
       component: "visualizations/line-chart",
       icon: "fa-line-chart",
       title: "Line Chart",
       subtitle: "Time Series",
       description: "Line Graphs are used to display quantitative value over a continuous interval or time span. It is most frequently used to show trends and relationships (when grouped with other lines).",
       url: "visualization?name=line",
       dataUrl: "/assets/data/visualizations/line-chart.json" // change line-chart-date.json for date 'x'
     },
     scatter: {
       initials: "Scatter",
       component: "visualizations/scatter-plot",
       icon: "fa-dot-circle-o",
       title: "Scatter Plot",
       subtitle: "Distribution",
       description: "Scatterplots use a collection of points placed using Cartesian Coordinates to display values from two variables. By displaying a variable in each axis, you can detect if a relationship or correlation between the two variables exists.",
       url: "visualization?name=scatter",
       dataUrl: "/assets/data/visualizations/scatter-plot.json"
     },
     verticalbarchart: {
       initials: "Bar Chart Vertical",
       component: "visualizations/vertical-bar-chart",
       icon: "fa-bar-chart",
       title: "Vertical Bar Chart",
       subtitle: "Distribution",
       description: `A vertical bar chart or bar graph is a chart or graph that presents
        grouped data with rectangular bars with lengths proportional to the
        values that they represent. `,
       url: "visualization?name=verticalbarchart",
       dataUrl: "/assets/data/visualizations/vertical-bar-chart.json"
     }
   };
}

export default {
  name: 'visualizations',
  initialize
};
