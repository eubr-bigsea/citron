import ENV from 'lemonade-ember/config/environment';

export function initialize(/* application */) {
   ENV.APP.visualizations = {
     list: {
       component: "visualizations/list-view",
       icon: "list",
       title: "Visualizations",
       subtitle: "Available visualizations.",
       description: "List of available visualizations for the Lemonade framework.",
       dataUrl: "/assets/data/visualizations/pie-chart.json"
     },
     pie: {
       component: "visualizations/pie-chart",
       icon: "pie-chart",
       title: "Pie Chart",
       subtitle: "Part to whole",
       description: "A pie chart (or a circle chart) is a circular statistical graphic which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice (and consequently its central angle and area), is proportional to the quantity it represents.",
       dataUrl: "/assets/data/visualizations/pie-chart.json"
     }
   };
}

export default {
  name: 'visualizations',
  initialize
};
