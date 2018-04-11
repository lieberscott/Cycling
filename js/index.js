document.addEventListener("DOMContentLoaded",function(){
  req=new XMLHttpRequest();
  req.open("GET",'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json',true);
  req.send();
  req.onload=function(){
    const data = JSON.parse(req.responseText);
    const w = 800;
    const h = 600;
    const padding = 60;
    
    const svg = d3.select(".main")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
        
    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.Seconds - 2210)])
    .range([padding, w - padding - padding - 10]);
    
    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.Place)])
    .range([h - padding, padding]);
      
    let tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip");
    
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.Seconds - 2210))
      .attr("cy",(d) => yScale(d.Place))
      .attr("r", 4)
      .attr("class", "circ")
      .attr("fill", (d) => {
      if (d.Doping == "") { return "blue" }
      else { return "red" }
    })
      .on("mousemove", (d) => {
      
        tooltip
          .style("left", d3.event.pageX - 200 + "px")
          .style("top", d3.event.pageY - 50 + "px")
          .style("display", "inline-block")
          .html("<span><strong>" +
            d.Place + ". " + d.Name + "</strong>, " + d.Nationality + "<br/>" +
            "Year: " + d.Year + ", Time: " + d.Time + "<br/>" +
            d.Doping + "</span>")
       })
        .on("mouseout", (d) => {
           tooltip
             .style("display", "none");
        });
    
    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) =>  (d.Name))
      .attr("x", (d) => xScale(d.Seconds - 2210) + 10)
      .attr("y", (d) => yScale(d.Place) + 6)
      .attr("font-size", "13px");
      
    
    const xAxis = d3.axisBottom(xScale)
                    .tickFormat((d) => {
                      var minutes = Math.floor(d / 60);
                      var seconds = Math.floor(d % 60);
                      return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    });
    
    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis);
    
    const yAxis = d3.axisLeft(yScale);
    
    svg.append("g")
       .attr("transform", "translate(" + padding + ", 0)")
       .call(yAxis);
    
    svg.append("text")             
      .attr("transform", "translate(" + (w/2) + " ," + (h - 20) + ")")
      .style("text-anchor", "middle")
      .text("Minutes Behind Fastest Time");
    
    svg.append("text")             
      .attr("transform", "rotate(-90)")
      .attr("y", 20)
      .attr("x", 0 - h/2)
      .style("text-anchor", "middle")
      .text("Time Rank");
    
    svg.append("circle")
      .attr("cx", 95)
      .attr("cy", 95)
      .attr("r", 4)
      .attr("fill", "red");
    
    svg.append("text")             
      .attr("x", 100)
      .attr("y", 100)
      .text("Doping allegation");
    
    svg.append("circle")
      .attr("cx", 95)
      .attr("cy", 115)
      .attr("r", 4)
      .attr("fill", "blue");
    
    svg.append("text")             
      .attr("x", 100)
      .attr("y", 120)
      .text("No doping allegation");
    
    svg.append("text") // subhead
      .attr("x", w/2)
      .attr("y", 20)
      .attr("font-size", "20px")
      .style("text-anchor", "middle")
      .text("35 Fastest Times up Alpe d'Huez");
    
    svg.append("text") // subhead
      .attr("x", w/2)
      .attr("y", 40)
      .attr("font-size", "15px")
      .style("text-anchor", "middle")
      .text("Normalized to 13.8km distance");
    
  }
});