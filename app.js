const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.";

// Fetch the JSON data and console log it
//d3.json(url).then(function(data) {
//console.log(data);
//});

//Read sampes.json
//Code from ChatGPT
d3.json("samples.json").then(function (data) {
  var sample_values = data.samples[0].sample_values
  console.log(data.samples[0].sample_values)
  var otu_ids = data.samples[0].otu_ids
  otu_ids_named = otu_ids.map((x) => "OTU " + x )

  console.log(otu_ids_named);

  var otu_labels = data.samples[0].otu_labels

  //Dropdown
  var dropdownMenu = d3.selectAll("#selDataset");
  // Populate the dropdown menu with sample IDs
  //From ChatGPT
  data.names.forEach(function (sampleId) {
    dropdownMenu.append("option").text(sampleId).property("value", sampleId);
  });
  dropdownMenu.on("change", function () {
    // Get the selected sample ID
    var selectedSampleId = dropdownMenu.property("value");
    console.log("Selected Sample ID:", selectedSampleId);
  });
  console.log(data);

  //Create a horizontal bar chart with dropdown menu to display top 10 OTU
  //https://plotly.com/javascript/bar-charts/
  //sample_values as the values for the bar chart
  //otu_ids as the labels for the bar chart
  //otu_labels as the hovertext for the chart
  //DATA

  var datasample = [
    {
      x: sample_values.slice(0,10),
      y: otu_ids_named.slice(0,10),
      text: otu_labels,
      type: 'bar',
      orientation: 'h'
    }
  ];
  //LAYOUT
  //ChatGPT
  var layout = {
    title: 'Top 10 OTUs',
    xaxis: { title: 'Sample Values' },
    yaxis: { title: 'OTU IDs' }
  };
  // Event listener for changes in the dropdown menu
  //From ChatGPT

  //CREATE PLOT
  Plotly.newPlot('bar', datasample, layout);


  //Create a bubble chart that displays each sample
  //https://plotly.com/javascript/bubble-charts/
  //otu_ids for x-values
  //sample_values for y-values
  //sample_values for marker size
  //otu_ids for the marker colors
  //otu_labels for text values
  //var sample_values= data.sample_values.slice().reverse()
  //var otu_ids= data.otu_ids.slice().reverse()
  //var otu_labels= data.otu_labels.slice().reverse()
  //ChatGPT for Marker data
  var bubblechartdata = [
    {
      x: otu_ids.slice(0,10),
      y: sample_values.slice(0,10),
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids
      },
      text: otu_labels
    }
  ];

  //LAYOUT
  //ChatGPT
  var layout = {
    title: 'Bubble Chart of OTU',
    yaxis: { title: 'Sample Values' },
    xaxis: { title: 'OTU IDs' }
  };
  //CREATE PLOT
  Plotly.newPlot('bubble', bubblechartdata, layout);

});






//Display the sample metadeta (individual's demographic information)
d3.json("samples.json").then(function(data) {
  //From ChatGPT
  var metadata = data.metadata[0]; // Assuming you want to display metadata for the first sample
    
  // Select the #sample-metadata panel
  var sampleMetadataPanel = d3.select("#sample-metadata");
  
  // Clear any existing metadata
  sampleMetadataPanel.html("");
  
  // Loop through each key-value pair in the metadata
  Object.entries(metadata).forEach(([key, value]) => {
      // Create a text string for the key-value pair
      var textString = `${key}: ${value}`;
      
      // Append an HTML tag containing the text string to the panel
      sampleMetadataPanel.append("p").text(textString);
  });
});
//Display each key-value pair from the metadata JSON object somewhere on the page

//Update all the plots when a new sample is selected
//Welcome to create any layout you would like for your dashboard

//Deploy your app to a free static page hosting services such as GitHub Pages
//Submit links to your deployment and GitHub repo
//init()