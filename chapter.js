import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function createChapter() {
    let root, svgOuter, svg, width, height;
    let currentStepId = null;

    function renderBase() {
        svg.selectAll("*").remove();
    }

    function drawPerson(parent, x, y, scale = 1) {
        const person = parent.append("g")
        .attr("class", "person")
        .attr("transform", `translate(${x},${y}) scale(${scale})`)
        .style("opacity", 0);

        // head
        person.append("circle")
        .attr("cx", 0)
        .attr("cy", -40)
        .attr("r", 14)
        .attr("fill", "#f1c27d");

        // body
        person.append("rect")
        .attr("x", -16)
        .attr("y", -30)
        .attr("width", 32)
        .attr("height", 40)
        .attr("rx", 6)
        .attr("fill", "#4f7cac");

        // stomach
        person.append("circle")
        .attr("class", "stomach")
        .attr("cx", 0)
        .attr("cy", -2)
        .attr("r", 7)
        .attr("fill", "#a35a1f");

        // left arm
        person.append("line")
        .attr("class", "arms")
        .attr("x1", -16)
        .attr("y1", -10)
        .attr("x2", -36)
        .attr("y2", 10)
        .attr("stroke", "#333")
        .attr("stroke-width", 5)
        .attr("stroke-linecap", "round");

        // right arm
        person.append("line")
        .attr("class", "arms")
        .attr("x1", 16)
        .attr("y1", -10)
        .attr("x2", 36)
        .attr("y2", 10)
        .attr("stroke", "#333")
        .attr("stroke-width", 5)
        .attr("stroke-linecap", "round");

        // left leg
        person.append("line")
        .attr("class", "legs")
        .attr("x1", -5)
        .attr("y1", 10)
        .attr("x2", -20)
        .attr("y2", 40)
        .attr("stroke", "#333")
        .attr("stroke-width", 5)
        .attr("stroke-linecap", "round");

        // right leg
        person.append("line")
        .attr("class", "legs")
        .attr("x1", 5)
        .attr("y1", 10)
        .attr("x2", 20)
        .attr("y2", 40)
        .attr("stroke", "#333")
        .attr("stroke-width", 5)
        .attr("stroke-linecap", "round");

        return person;
    }

    function drawNormalPFAS(parent, x, y, scale = 1) {
        
        const molecule = parent.append("g")
            .attr("class","pfas")
            .attr("transform",`translate(${x},${y}) scale(${scale})`);

        molecule.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 3)
            .attr("fill", "#000000");
        
        molecule.append("line")
            .attr("x1", -3)
            .attr("y1", 0)
            .attr("x2", -5)
            .attr("y2", 0)
            .attr("stroke", "#444")
        
        molecule.append("circle")
            .attr("cx", -8)
            .attr("cy", 0)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 0)
            .attr("y1", 3)
            .attr("x2", 0)
            .attr("y2", 5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 0)
            .attr("cy", 8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 0)
            .attr("y1", -3)
            .attr("x2", 0)
            .attr("y2", -5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 0)
            .attr("cy", -8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 3)
            .attr("y1", 0)
            .attr("x2", 5)
            .attr("y2", 0)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 8)
            .attr("cy", 0)
            .attr("r", 3)
            .attr("fill", "#000000")

        molecule.append("line")
            .attr("x1", 8)
            .attr("y1", 3)
            .attr("x2", 8)
            .attr("y2", 5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 8)
            .attr("cy", 8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 8)
            .attr("y1", -3)
            .attr("x2", 8)
            .attr("y2", -5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 8)
            .attr("cy", -8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 11)
            .attr("y1", 0)
            .attr("x2", 13)
            .attr("y2", 0)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 16)
            .attr("cy", 0)
            .attr("r", 3)
            .attr("fill", "#000000")

        molecule.append("line")
            .attr("x1", 16)
            .attr("y1", 3)
            .attr("x2", 16)
            .attr("y2", 5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 16)
            .attr("cy", 8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 16)
            .attr("y1", -3)
            .attr("x2", 16)
            .attr("y2", -5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 16)
            .attr("cy", -8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 19)
            .attr("y1", 0)
            .attr("x2", 21)
            .attr("y2", 0)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 24)
            .attr("cy", 0)
            .attr("r", 3)
            .attr("fill", "#000000")

        molecule.append("line")
            .attr("x1", 24)
            .attr("y1", 3)
            .attr("x2", 24)
            .attr("y2", 5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 24)
            .attr("cy", 8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 24)
            .attr("y1", -3)
            .attr("x2", 24)
            .attr("y2", -5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 24)
            .attr("cy", -8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 27)
            .attr("y1", 0)
            .attr("x2", 29)
            .attr("y2", 0)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 32)
            .attr("cy", 0)
            .attr("r", 3)
            .attr("fill", "#000000")

        molecule.append("line")
            .attr("x1", 32)
            .attr("y1", 3)
            .attr("x2", 32)
            .attr("y2", 5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 32)
            .attr("cy", 8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 32)
            .attr("y1", -3)
            .attr("x2", 32)
            .attr("y2", -5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 32)
            .attr("cy", -8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 35)
            .attr("y1", 0)
            .attr("x2", 37)
            .attr("y2", 0)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 40)
            .attr("cy", 0)
            .attr("r", 3)
            .attr("fill", "#000000")

        molecule.append("line")
            .attr("x1", 40)
            .attr("y1", 3)
            .attr("x2", 40)
            .attr("y2", 5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 40)
            .attr("cy", 8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

    molecule.append("line")
            .attr("x1", 40)
            .attr("y1", -3)
            .attr("x2", 40)
            .attr("y2", -5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 40)
            .attr("cy", -8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 43)
            .attr("y1", 0)
            .attr("x2", 45)
            .attr("y2", 0)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 48)
            .attr("cy", 0)
            .attr("r", 3)
            .attr("fill", "#000000")

        molecule.append("line")
            .attr("x1", 48)
            .attr("y1", 3)
            .attr("x2", 48)
            .attr("y2", 5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 48)
            .attr("cy", 8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 48)
            .attr("y1", -3)
            .attr("x2", 48)
            .attr("y2", -5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 48)
            .attr("cy", -8)
            .attr("r", 3)
            .attr("fill", "#90EE90")

        molecule.append("line")
            .attr("x1", 51)
            .attr("y1", 0)
            .attr("x2", 53)
            .attr("y2", 0)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 56)
            .attr("cy", 0)
            .attr("r", 3)
            .attr("fill", "#000000")

        molecule.append("line")
            .attr("x1", 55)
            .attr("y1", 2.7)
            .attr("x2", 55)
            .attr("y2", 5)
            .attr("stroke", "#444")

        molecule.append("line")
            .attr("x1", 57)
            .attr("y1", 2.7)
            .attr("x2", 57)
            .attr("y2", 5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 56)
            .attr("cy", 8)
            .attr("r", 3)
            .attr("fill", "#FF6B6B")

        molecule.append("line")
            .attr("x1", 56)
            .attr("y1", -3)
            .attr("x2", 56)
            .attr("y2", -5)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 56)
            .attr("cy", -8)
            .attr("r", 3)
            .attr("fill", "#FF6b6b")

        molecule.append("line")
            .attr("x1", 59)
            .attr("y1", -8)
            .attr("x2", 61)
            .attr("y2", -8)
            .attr("stroke", "#444")

        molecule.append("circle")
            .attr("cx", 64)
            .attr("cy", -8)
            .attr("r", 3)
            .attr("fill", "#FFC107")
            
        return molecule;
        
    }

    function drawFilter(parent, x, y, scale = 1) {
        const filter = parent.append("g")
            .attr("class","filter")
            .attr("transform",`translate(${x},${y}) scale(${scale})`);

        filter.append("ellipse")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("rx", 20)
            .attr("ry", 100)
            .attr("stroke", "#222")
            .attr("fill", "#FFFFFF")
        
        //Need to add more detail to the filter later
    }

    function drawEmphaticPFAS(parent, x, y,scale = 1) { 
        const miniMolecule = parent.append("g")
            .attr("class", "pfas")
            .attr("transform",`translate(${x},${y}) scale(${scale})`);

        miniMolecule.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 10)
            .attr("fill", "#000000")

        miniMolecule.append("line")
            .attr("x1", 10)
            .attr("y1", 0)
            .attr("x2", 15)
            .attr("y2", 0)
            .attr("stroke", "#444")
            .attr("stroke-width", 5)

        miniMolecule.append("circle")
            .attr("cx", 25)
            .attr("cy", 0)
            .attr("r", 10)
            .attr("fill", "#90EE90")

        
    }

    function drawShield(parent, x, y, scale = 1) {
        const shield = parent.append("g")
            .attr("class", "shield")
            .attr("transform",`translate(${x},${y}) scale(${scale})`);

        shield.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 50)
            .attr("fill", "none")
            .attr("stroke", "#90EE90")
    }


    function step01() {
        renderBase();

        const person = drawPerson(svg, width * .5, height * .55, 1.2);

        person.transition()
            .style("opacity", 1);
    }

    function step02() {
        
        const stomach = svg.select(".stomach");
        const person = svg.select(".person");
        const legs = svg.selectAll(".legs");
        const arms = svg.selectAll(".arms");

        person.transition()
            .duration(700)
            .attr("transform", `translate(${width * 0.5},${height * 0.6}) scale(9)`);

        // highlight stomach
        stomach.transition()
            .duration(700)
            .attr("r", 100)
            .style("opacity", 1);

        arms.transition()
            .duration(400)
            .style("opacity", 0);
        
        legs.transition()
            .duration(400)
            .style("opacity", 0);

        drawNormalPFAS(svg, width * .25, height * .2, 3)
        drawFilter(svg, width * .5, height * .2, 1.2)
        drawNormalPFAS(svg, width * .6, height * .2, 3)
        drawEmphaticPFAS(svg, width * .5, height * .6, 3)
        //Draw Scissors?
        
        

    }

    function step03() {
        const molecules = svg.selectAll(".pfas");
        const filter = svg.select(".filter");

        molecules
            .filter((d, i) => i !== 0)
            .transition()
            .duration(700)
            .style("opacity", 0);

        molecules
            .filter((d, i) => i === 0)
            .transition()
            .duration(700)
            .attr("transform", `translate(${width*0.4}, ${height*0.5}) scale(3.5)`);

        filter.transition()
            .style("opacity", 0);

        
        drawShield(svg, width * .5, height * .6, 4)

    }

    function step04() {
        renderBase();

        const person = drawPerson(svg, width * 0.6, height * 0.55, 1.2);
        person.style("opacity", 1);
    }

    function applyStep(stepId) {
        currentStepId = stepId;

        if (stepId === "c01-step-01") return step01();
        if (stepId === "c01-step-02") return step02();
        if (stepId === "c01-step-03") return step03();
        if (stepId === "c01-step-04") return step04();

        step01();
    }

    function init(container) {
        root = d3.select(container);

        width = root.node().clientWidth || 900;
        height = root.node().clientHeight || 560;

        svgOuter = root.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

        svg = svgOuter.append("g");

        renderBase();
        applyStep("c01-step-01");
    }

    function resize(w, h) {
        width = w ?? width;
        height = h ?? height;

        svgOuter
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

        applyStep(currentStepId ?? "c01-step-01");
    }

    function onStepEnter(stepId) {
        applyStep(stepId);
    }

  return { init, resize, onStepEnter };
}