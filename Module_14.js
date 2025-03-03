function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // Get the metadata field from the data
    var metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    var result = metadata.filter(sampleObj => sampleObj.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");

    // Clear any existing metadata
    panel.html("");

    // Inside a loop, append new tags for each key-value in the filtered metadata
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}

    // tags for each key-value in the filtered metadata.

  

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    /function buildCharts(sample) {
      d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
        // Get the samples field
        var samples = data.samples;
    
        // Filter the samples for the object with the desired sample number
        var result = samples.filter(sampleObj => sampleObj.id == sample)[0];
    
        // Get the otu_ids, otu_labels, and sample_values
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
    
        // Build the Bubble Chart
        var bubbleData = [{
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: 'markers',
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: 'Earth'
          }
        }];
        
        var bubbleLayout = {
          title: 'Bubble Chart of Microbe Distribution',
          xaxis: { title: 'OTU ID' },
          showlegend: false
        };
    
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    
        // Build the Bar Chart
        var barData = [{
          type: 'bar',
          x: sample_values.slice(0, 10).reverse(),  // Top 10 values
          y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          orientation: 'h'
        }];
        
        var barLayout = {
          title: 'Top 10 Microbes',
          xaxis: { title: 'Sample Values' },
          yaxis: { title: 'OTU IDs' }
        };
    
        Plotly.newPlot('bar', barData, barLayout);
      });
    }
    
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    function init() {
      d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
        // Get the names field (sample IDs)
        var sampleNames = data.names;
    
        // Use d3 to select the dropdown with id of `#selDataset`
        var dropdown = d3.select("#selDataset");
    
        // Use the list of sample names to populate the select options
        sampleNames.forEach((sample) => {
          dropdown.append("option").text(sample).property("value", sample);
        });
    
        // Get the first sample from the list
        var firstSample = sampleNames[0];
    
        // Build charts and metadata panel with the first sample
        buildCharts(firstSample);
        buildMetadata(firstSample);
      });
    }
    

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
