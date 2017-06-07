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
       dataUrl: "/assets/data/visualizations/pie-chart.csv"
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
       description: "A Wordtree Diagram is a way of visually representing hierarchy in a tree-like structure. Typically the structure of a Tree Diagram consists of elements such as a root node, a member that has no superior/parent. Then there are the nodes, which are linked together with line connections called branches that represent the relationships and connections between the members. Finally, the leaf nodes (or end-nodes) are members who have no children or child nodes.",
       url: "visualization?name=wordtree",
       dataUrl: "/assets/data/visualizations/wordtree.json"
     }

   };
}

export default {
  name: 'visualizations',
  initialize
};
