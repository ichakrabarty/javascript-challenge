function init() {

  d3.json('data.json').then((data => {
    let name = data.names;
    let dropDownMenu = d3.select("#selDataset");
    name.forEach((id) => {dropDownMenu.append("option").text(id).property("value", id)});
    
    initial_value = name[0]
    Chart(initial_value)
    MetaData(initial_value)

  })


  )
}

function Chart(id) {
  d3.json('data.json').then((data => {
   
    let sampleID = data.samples.filter(samples => samples.id == id)
    
    let values = sampleID[0].sample_values
    let labels = sampleID[0].otu_ids
    let hover_text = sampleID[0].otu_labels


    let BarChartData = [

      {
        x: values.slice(0,10).reverse(),
        y: labels.slice(0, 10).map(id => `OTU ${id}`).reverse(),
        text: hover_text.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
  
      }
    ];
    
    Plotly.newPlot("bar", BarChartData);

    let BubbleChartData = [
      {
      x: values,
      y: labels,
      text: hover_text,
      mode: "markers",
      marker: {
        color: labels,
        size: values,
        }
      }
    ];
    
    Plotly.newPlot("bubble", BubbleChartData);

  }))

}


function MetaData(meta) {
  d3.json('data.json').then((data => {
    let metadata = data.metadata;
    let array = metadata.filter(meta_obj => meta_obj.metadata == meta);
    inital_val = array[0];
    let panel = d3.select('#sample-metadata');
    panel.html('')
    Object.entries(array).forEach(([label, value]) => {
      panel.append("h3").text(`${label}: ${value}`);
    });
  }))


}


function update(updated_value) {
  
  Chart(updated_value);
  MetaData(updated_value)
}





init();