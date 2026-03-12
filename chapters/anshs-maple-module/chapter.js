import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function createChapter() {
  let container, svg, w, h;
  
  let sapScene, assemblyNode, flaskScene, truckScene, leaf;
  let crateGeo, crateBack, crateMid, crateFront;
  let backWall, floor, leftWall, rightWall;
  let frontWallRect, frontLine1, frontLine2, frontText;

  const flaskPath = "M -15 -50 L 15 -50 L 15 -20 Q 40 10 35 40 L -35 40 Q -40 10 -15 -20 Z";
  const mapleLeafPath = "M 0 -25 L 5 -10 L 20 -15 L 12 0 L 25 10 L 10 12 L 0 30 L -10 12 L -25 10 L -12 0 L -20 -15 L -5 -10 Z M -2 30 L -2 40 L 2 40 L 2 30 Z";

  function applyCrateState(state, duration = 0) {
    let t = d3.transition().duration(duration).ease(d3.easeCubicInOut);
    
    if (state === '3D') {
      backWall.transition(t).attr("x", w*0.38).attr("y", h*0.38).attr("width", w*0.24).attr("height", h*0.08);
      floor.transition(t).attr("points", `${w*0.38},${h*0.46} ${w*0.62},${h*0.46} ${w*0.65},${h*0.56} ${w*0.35},${h*0.56}`);
      leftWall.transition(t).attr("points", `${w*0.38},${h*0.38} ${w*0.35},${h*0.48} ${w*0.35},${h*0.56} ${w*0.38},${h*0.46}`);
      rightWall.transition(t).attr("points", `${w*0.62},${h*0.38} ${w*0.65},${h*0.48} ${w*0.65},${h*0.56} ${w*0.62},${h*0.46}`);
      
      // Much bigger bottles filling the space
      crateBack.selectAll(".bottle-back").transition(t)
        .attr("transform", (d, i) => `translate(${w*0.38 + (w*0.24/5)*(i+0.5)}, ${h*0.42}) scale(0.3)`);
        
      crateMid.selectAll(".bottle-front").transition(t)
        .attr("transform", (d, i) => {
           let actualIndex = i >= 2 ? i + 1 : i; 
           return `translate(${w*0.35 + (w*0.3/5)*(actualIndex+0.5)}, ${h*0.48}) scale(0.35)`;
        });

      // Front wall sits low
      frontWallRect.transition(t).attr("y", h*0.48).attr("height", h*0.08);
      frontLine1.transition(t).attr("y1", h*0.51).attr("y2", h*0.51);
      frontLine2.transition(t).attr("y1", h*0.54).attr("y2", h*0.54);
      frontText.transition(t).attr("y", h*0.53).attr("font-size", "11px").text("MAPLE SYRUP");

    } else { 
      // 2D State - Solid Front Plank
      backWall.transition(t).attr("x", w*0.35).attr("y", h*0.38).attr("width", w*0.3).attr("height", h*0.18);
      floor.transition(t).attr("points", `${w*0.35},${h*0.56} ${w*0.65},${h*0.56} ${w*0.65},${h*0.56} ${w*0.35},${h*0.56}`);
      leftWall.transition(t).attr("points", `${w*0.35},${h*0.38} ${w*0.35},${h*0.38} ${w*0.35},${h*0.56} ${w*0.35},${h*0.56}`);
      rightWall.transition(t).attr("points", `${w*0.65},${h*0.38} ${w*0.65},${h*0.38} ${w*0.65},${h*0.56} ${w*0.65},${h*0.56}`);
      
      // Bottles just shrink and hide behind the expanding front wall
      crateBack.selectAll(".bottle-back").transition(t)
        .attr("transform", (d, i) => `translate(${w*0.35 + (w*0.3/5)*(i+0.5)}, ${h*0.48}) scale(0.2)`);
      crateMid.selectAll(".bottle-front").transition(t)
        .attr("transform", (d, i) => {
           let actualIndex = i >= 2 ? i + 1 : i; 
           return `translate(${w*0.35 + (w*0.3/5)*(actualIndex+0.5)}, ${h*0.48}) scale(0.2)`;
        });
      flaskScene.transition(t)
        .attr("transform", `translate(${w*0.35 + (w*0.3/5)*2.5}, ${h*0.48}) scale(0.2)`);
        
      // Front Wall Expands upwards to cover the bottles completely
      frontWallRect.transition(t).attr("y", h*0.38).attr("height", h*0.18);
      frontLine1.transition(t).attr("y1", h*0.42).attr("y2", h*0.42);
      frontLine2.transition(t).attr("y1", h*0.52).attr("y2", h*0.52);
      frontText.transition(t).attr("y", h*0.48).attr("font-size", "16px").text("MAPLE SYRUP!");
    }
  }

  function init(node, { shared, manifest, chapterData }) {
    container = d3.select(node);
    w = container.node().clientWidth;
    h = container.node().clientHeight;

    svg = container.append("svg")
      .attr("width", w).attr("height", h).attr("viewBox", `0 0 ${w} ${h}`)
      .style("background-color", "#FDF8F1");

    // --- SCENE 1: SAP COLLECTION ---
    sapScene = svg.append("g").attr("class", "scene-layer").style("opacity", 1);
    sapScene.append("path").attr("d", `M ${w*0.1} ${h} L ${w*0.25} ${h*0.1} L ${w*0.45} ${h*0.1} L ${w*0.55} ${h} Z`).attr("fill", "#5C4033"); 
      
    for (let i = 0; i < 6; i++) {
      sapScene.append("path").attr("d", `M ${w*(0.15 + i*0.06)} ${h} Q ${w*(0.2 + i*0.05)} ${h*0.5} ${w*(0.28 + i*0.03)} ${h*0.1}`)
        .attr("stroke", "#3E2723").attr("stroke-width", 2 + Math.random()*4).attr("fill", "none").attr("opacity", 0.6);
    }

    sapScene.append("path").attr("d", `M ${w*0.45} ${h*0.45} L ${w*0.53} ${h*0.47} L ${w*0.53} ${h*0.49} L ${w*0.45} ${h*0.5} Z`).attr("fill", "#90A4AE");
    sapScene.append("rect").attr("x", w*0.52).attr("y", h*0.46).attr("width", 6).attr("height", 6).attr("fill", "#607D8B");
    sapScene.append("path").attr("d", `M ${w*0.5} ${h*0.52} L ${w*0.62} ${h*0.52} L ${w*0.59} ${h*0.75} L ${w*0.53} ${h*0.75} Z`).attr("fill", "rgba(236, 239, 241, 0.9)").attr("stroke", "#CFD8DC").attr("stroke-width", 2);

    const particleColors = ["#42A5F5", "#66BB6A", "#78909C"]; 
    for(let i = 0; i < 40; i++) {
      let randY = h*0.55 + Math.random() * (h*0.18);
      let pX = w * (0.51 + 0.02 * ((randY - h*0.52) / (h*0.23)));
      let pMaxX = w * (0.61 - 0.02 * ((randY - h*0.52) / (h*0.23)));
      sapScene.append("circle").attr("cx", pX + Math.random() * (pMaxX - pX)).attr("cy", randY).attr("r", 3 + Math.random() * 3).attr("fill", particleColors[Math.floor(Math.random() * particleColors.length)]);
    }

    leaf = sapScene.append("path").attr("d", mapleLeafPath).attr("fill", "#D84315").style("opacity", 0);

    // --- SCENE 2 & 3: ASSEMBLY (MORPHING CRATE) ---
    assemblyNode = svg.append("g").attr("class", "assembly-node");

    crateGeo = assemblyNode.append("g").style("opacity", 0);
    backWall = crateGeo.append("rect").attr("fill", "#3E2723"); 
    floor = crateGeo.append("polygon").attr("fill", "#4E342E");
    leftWall = crateGeo.append("polygon").attr("fill", "#5D4037");
    rightWall = crateGeo.append("polygon").attr("fill", "#5D4037");

    crateBack = assemblyNode.append("g").style("opacity", 0);
    crateBack.selectAll(".bottle-back").data([0,1,2,3,4]).enter()
      .append("path").attr("class", "bottle-back").attr("d", flaskPath)
      .attr("fill", "rgba(230, 140, 20, 0.9)").attr("stroke", "#ccc").attr("stroke-width", 1.5);

    crateMid = assemblyNode.append("g").style("opacity", 0);
    crateMid.selectAll(".bottle-front").data([0,1,2,3]).enter()
      .append("path").attr("class", "bottle-front").attr("d", flaskPath)
      .attr("fill", "rgba(255, 167, 38, 0.9)").attr("stroke", "#fff").attr("stroke-width", 1.5);

    flaskScene = assemblyNode.append("g").style("opacity", 0);
    flaskScene.append("path").attr("d", flaskPath).attr("fill", "rgba(255, 167, 38, 0.8)").attr("stroke", "#fff").attr("stroke-width", 3);
    flaskScene.append("text").attr("class", "flask-label").attr("y", 15).attr("text-anchor", "middle").attr("fill", "#fff").attr("font-weight", "bold").attr("font-size", "14px").text("SAP");

    crateFront = assemblyNode.append("g").style("opacity", 0);
    frontWallRect = crateFront.append("rect").attr("fill", "#8D6E63");
    frontLine1 = crateFront.append("line").attr("stroke", "#5D4037").attr("stroke-width", 2);
    frontLine2 = crateFront.append("line").attr("stroke", "#5D4037").attr("stroke-width", 2);
    frontText = crateFront.append("text").attr("text-anchor", "middle").attr("fill", "#FFF").attr("font-weight", "bold");

    applyCrateState('3D', 0);

    // --- SCENE 4: TRUCK ---
    truckScene = svg.append("g").attr("class", "scene-layer").style("opacity", 0);
    const truckGroup = truckScene.append("g").attr("class", "truck");
    
    truckGroup.append("rect").attr("x", w*0.15).attr("y", h*0.75).attr("width", w*0.75).attr("height", h*0.02).attr("fill", "#263238");
    truckGroup.append("rect").attr("x", w*0.2).attr("y", h*0.7).attr("width", w*0.6).attr("height", h*0.05).attr("fill", "#37474F"); 
    truckGroup.append("path").attr("d", `M ${w*0.8} ${h*0.77} L ${w*0.8} ${h*0.55} L ${w*0.88} ${h*0.55} L ${w*0.93} ${h*0.65} L ${w*0.93} ${h*0.77} Z`).attr("fill", "#546E7A");
    truckGroup.append("path").attr("d", `M ${w*0.81} ${h*0.65} L ${w*0.81} ${h*0.57} L ${w*0.87} ${h*0.57} L ${w*0.91} ${h*0.65} Z`).attr("fill", "#CFD8DC");

    truckGroup.append("circle").attr("cx", w*0.3).attr("cy", h*0.77).attr("r", 15).attr("fill", "#212121");
    truckGroup.append("circle").attr("cx", w*0.65).attr("cy", h*0.77).attr("r", 15).attr("fill", "#212121");
    truckGroup.append("circle").attr("cx", w*0.86).attr("cy", h*0.77).attr("r", 15).attr("fill", "#212121");
    truckGroup.append("circle").attr("cx", w*0.3).attr("cy", h*0.77).attr("r", 6).attr("fill", "#B0BEC5");
    truckGroup.append("circle").attr("cx", w*0.65).attr("cy", h*0.77).attr("r", 6).attr("fill", "#B0BEC5");
    truckGroup.append("circle").attr("cx", w*0.86).attr("cy", h*0.77).attr("r", 6).attr("fill", "#B0BEC5");
  }

  function playLeafAnimation() {
    leaf.interrupt() 
        .attr("transform", `translate(${w*0.15}, ${h*0.1}) scale(1.5) rotate(0)`)
        .style("opacity", 1)
        .transition().duration(3500).ease(d3.easeQuadIn) 
        .attr("transform", `translate(${w*0.2}, ${h*0.85}) scale(1.5) rotate(140)`)
        .transition().duration(1000).style("opacity", 0); 
  }

  function onStepEnter(stepId, direction) {
    if (stepId === "anshs-maple-module-sap") {
      sapScene.transition().duration(800).style("opacity", 1);
      flaskScene.transition().duration(500).style("opacity", 0);
      crateGeo.transition().duration(500).style("opacity", 0);
      crateBack.transition().duration(500).style("opacity", 0);
      crateMid.transition().duration(500).style("opacity", 0);
      crateFront.transition().duration(500).style("opacity", 0);
      truckScene.transition().duration(500).style("opacity", 0);
      
      assemblyNode.transition().duration(500).attr("transform", "translate(0,0)");
      applyCrateState('3D', 0);
      playLeafAnimation();
    } 
    
    else if (stepId === "anshs-maple-module-flask") {
      sapScene.transition().duration(800).style("opacity", 0); 
      crateGeo.transition().duration(500).style("opacity", 0);
      crateBack.transition().duration(500).style("opacity", 0);
      crateMid.transition().duration(500).style("opacity", 0);
      crateFront.transition().duration(500).style("opacity", 0);
      truckScene.transition().duration(500).style("opacity", 0);
      
      assemblyNode.transition().duration(500).attr("transform", "translate(0,0)");
      applyCrateState('3D', 0);
      
      flaskScene.transition().duration(800).style("opacity", 1)
                .attr("transform", `translate(${w*0.5}, ${h*0.3}) scale(1.5)`);
      flaskScene.select(".flask-label").transition().duration(500).style("opacity", 1);
    } 
    
    else if (stepId === "anshs-maple-module-crate") {
      sapScene.transition().duration(500).style("opacity", 0);
      truckScene.transition().duration(500).style("opacity", 0);
      
      applyCrateState('3D', 800);
      
      crateGeo.transition().duration(800).style("opacity", 1);
      crateBack.transition().duration(800).style("opacity", 1);
      crateMid.transition().duration(800).style("opacity", 1);
      crateFront.transition().duration(800).style("opacity", 1);
      
      // Ensure the crate is reset to the top in case they scroll backwards
      assemblyNode.transition().duration(500).attr("transform", "translate(0,0)");
      truckScene.select(".truck").transition().duration(500).attr("transform", "translate(0, 0)");
      
      // Scale is now 0.35 to match the enlarged 3D bottles
      let targetX_3D = w*0.35 + (w*0.3/5) * 2.5; 
      let targetY_3D = h*0.48;
      flaskScene.transition().duration(1000).ease(d3.easeCubicInOut)
        .attr("transform", `translate(${targetX_3D}, ${targetY_3D}) scale(0.35)`);
        
      flaskScene.select(".flask-label").transition().duration(300).style("opacity", 0);
    }
    
    else if (stepId === "anshs-maple-module-shipping") {
      crateGeo.transition().duration(300).style("opacity", 1);
      crateBack.transition().duration(300).style("opacity", 1);
      crateMid.transition().duration(300).style("opacity", 1);
      crateFront.transition().duration(300).style("opacity", 1);
      flaskScene.transition().duration(300).style("opacity", 1);
      truckScene.transition().duration(500).style("opacity", 1);
      
      applyCrateState('2D', 800);
      
      let truck = truckScene.select(".truck");
      
      truck.attr("transform", `translate(-${w}, 0)`)
           .transition().duration(1200).ease(d3.easeCubicOut)
           .attr("transform", "translate(0, 0)")
           .on("end", () => {
              assemblyNode.transition().duration(800).ease(d3.easeCubicInOut)
                .attr("transform", `translate(0, ${h*0.14})`); 
           });
    }

    // --- NEW: THE DRIVE OFF ---
    else if (stepId === "anshs-maple-module-outro") {
       let truck = truckScene.select(".truck");
       
       truck.transition().duration(1500).ease(d3.easeCubicInOut)
            .attr("transform", `translate(${w}, 0)`);
            
       // The crate is already dropped at Y: h*0.14, so we just move X to w
       assemblyNode.transition().duration(1500).ease(d3.easeCubicInOut)
            .attr("transform", `translate(${w}, ${h*0.14})`);
    }
  }

  function resize(width, height) {
    w = width;
    h = height;
    svg.attr("width", w).attr("height", h).attr("viewBox", `0 0 ${w} ${h}`);
  }

  return { init, onStepEnter, resize };
}
