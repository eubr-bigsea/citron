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
     graph: {
       initials: "Graph",
       component: "visualizations/graph-canvas",
       icon: "fa-sitemap",
       title: "Graph",
       subtitle: "Distri",
       description: "In mathematics, and more specifically in graph theory, a graph is a structure amounting to a set of objects in which some pairs of the objects are in some sense 'related'. The objects correspond to mathematical abstractions called vertices (also called nodes or points) and each of the related pairs of vertices is called an edge (also called an arc or line).",
       url: "visualization?name=graph",
       dataUrl: "/assets/data/visualizations/graph-canvas.json"
     },
     wordtree: {
       initials: "WrdT",
       component: "visualizations/wordtree-diagram",
       icon: "fa-sitemap",
       title: "Wordtree",
       subtitle: "Word Occurence Hierarchy",
       description: "A Wordtree Diagram is a way of visually representing hierarchy in a tree-like structure.",
       url: "visualization?name=wordtree",
       dataUrl: "/assets/data/visualizations/wordtree.json"
     },
     line: {
       initials: "Line",
       component: "visualizations/line-chart",
       icon: "fa-line-chart",
       title: "Line Chart",
       subtitle: "Time Series",
       description: "Line Graphs are used to display quantitative value over a continuous interval or time span. It is most frequently used to show trends and relationships (when grouped with other lines).",
       url: "visualization?name=line",
       dataUrl: "/assets/data/visualizations/line-chart-date.json" // change line-chart-date.json for date 'x'
     },
     area: {
       initials: "Area",
       component: "visualizations/area-chart",
       icon: "fa-area-chart",
       title: "Area Chart",
       subtitle: "Time Series",
       description: "Area Graphs are Line Graphs but with the area below the line filled in with a certain colour or texture. Area Graphs are drawn by first plotting data points on a Cartesian coordinate grid, joining a line between the points and finally filling in the space below the completed line.",
       url: "visualization?name=area",
       dataUrl: "/assets/data/visualizations/area-chart.json" // change area-chart-date.json for date 'x'
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
     barchart: {
       initials: "Bar Chart",
       component: "visualizations/bar-chart",
       icon: "fa-bar-chart",
       title: "Bar Chart",
       subtitle: "Distribution",
       description: `A bar chart or bar graph is a chart or graph that presents
        grouped data with rectangular bars with lengths proportional to the
        values that they represent. `,
       url: "visualization?name=barchart",
       dataUrl: "/assets/data/visualizations/bar-chart.json"
     },
     histogram: {
       initials: "Hist",
       component: "visualizations/histogram-chart",
       icon: "fa-bar-chart",
       title: "Histogram",
       subtitle: "Distribution",
       description: "Histogram visualises the distribution of data over a continuous interval or certain time period. Each bar in a histogram represents the tabulated frequency at each interval/bin. The total area of the histogram is equal to the number of data.",
       url: "visualization?name=histogram",
       dataUrl: "/assets/data/visualizations/histogram.json"
     }
   };
}

export default {
  name: 'visualizations',
  initialize
};
