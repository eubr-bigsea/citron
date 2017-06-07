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
       dataUrl: "/assets/data/visualizations/pie-chart.json"
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
     map: {
       initials: "Map",
       component: "visualizations/map-chart",
       icon: "fa-map-marker",
       title: "Map",
       subtitle: "Geographic",
       description: "A pie chart (or a circle chart) is a circular statistical graphic which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice (and consequently its central angle and area), is proportional to the quantity it represents.",
       url: "visualization?name=map",
       dataUrl: "/assets/data/visualizations/pie-chart.json"
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
     }



   };
}

export default {
  name: 'visualizations',
  initialize
};
