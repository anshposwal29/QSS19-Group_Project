import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function createChapter() {
    let root, svgOuter, svg, width, height, g;
    let currentStepId = null;
    let outer = null;

    // variables for drawing
    let firstleaf = null;
    let secondleaf = null;
    let thirdleaf = null;
    let water_wave = null;


// ── Drawing Functions ──────────────────────────────────────────────────────────
    function drawLeaf(parent, x, y) {
        const leaf = parent.append("g")
        .attr("class", "leaf")
        .attr("transform", `scale(2)`);

        const d = `
        M30 10
        L24 13
        L40 47
        L18 60
        L36 58
        L22 100
        L28 97
        L34 120
        L39 98
        L47 110
        L50 70  
        L65 112
        L70 94
        L85 116
        L79 93
        L93 98
        L60 58
        L95 68
        L90 60
        L108 56
        L90 48
        L95 41
        L60 43
        L70 27
        L48 40
        L30 10
        ` .trim();

        leaf.append("path")
        .attr("d", d)
        .attr("fill", "#d66508")
        .attr("stroke", "#d66508")
        .attr("stroke-width", 3)
        .attr("stroke-linejoin", "round")
        .attr("transform", `rotate(-10)`);

        return leaf;
    }


    function draw_water(parent){
        const water = parent.append('g').attr('class', 'water');
        // background
        water.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "#6ab4f5");

        // water waves
        const a = `
            M24 206 C76 208, 85 380, 345 428
            M345 428 C408 410, 403 352, 350 349
            `.trim();

        water.append("path")
            .attr("d", a)
            .attr("fill", "none")
            .attr("stroke", "#d9e4ea")
            .attr("stroke-width", 4)
            .attr("transform", `scale(1) translate(${width * 0.45}, 50) rotate(-10)`);

        const b = `
            M24 206 C24 206, 130 208, 197 102
            M197 102 C291 60, 315 200, 245 166
            `.trim();

        water.append("path")
            .attr("d", b)
            .attr("fill", "none")
            .attr("stroke", "#d9e4ea")
            .attr("stroke-width", 3.5)
            .attr("transform", `rotate(60) translate(300, -100)`);

        water.append("text")
            .attr("x", width * 0.55).attr("y", height * 0.1)
            .attr("font-family", "Josefin Sans")
            .attr("font-size", 35)
            .attr("font-weight", 700)
            .attr("fill", "#e0ebf1")
            .text("they are in our water,");

        return water;
    }


    function draw_water_caption(parent) {
        const water_caption = parent.append("g").attr("class", "water_caption");

        water_caption.append("text")
            .attr("x", width * 0.55).attr("y", height * 0.1)
            .attr("font-family", "Josefin Sans")
            .attr("font-size", 35)
            .attr("font-weight", 700)
            .attr("fill", "black")
            .text("they are in our water,");
        
            return water_caption;
}

    function drawAir(parent) {
        const air = parent.append('g').attr('class', 'air');
        // background
        air.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#bddbf6");

        // clouds
        air.append("ellipse")
        .attr("cx", 50)
        .attr("cy", 200)
        .attr("rx", 130)
        .attr("ry", 90)
        .attr("fill", "#e3eaf1");

        air.append("ellipse")
        .attr("cx", 0)
        .attr("cy", 100)
        .attr("rx", 100)
        .attr("ry", 80)
        .attr("fill", "#e3eaf1");

        air.append("ellipse")
        .attr("cx", 700)
        .attr("cy", 100)
        .attr("rx", 80)
        .attr("ry", 50)
        .attr("fill", "#e3eaf1");

        air.append("ellipse")
        .attr("cx", 800)
        .attr("cy", 120)
        .attr("rx", 120)
        .attr("ry", 60)
        .attr("fill", "#e3eaf1");

        air.append("text")
        .attr("x", width * 0.2).attr("y", height * 0.2)
        .attr("font-family", "Josefin Sans")
        .attr("font-size", 35)
        .attr("font-weight", 700)
        .attr("fill", "black")
        .text("in our air,");

        return air;
    }


    function draw_final_scene_intro(parent) {
        const last_scene = parent.append('g').attr('class', 'syruptap');

        // tree
        last_scene.append('rect')
        .attr("x", width * .85)
        .attr("y", 0)
        .attr("width", width * .15)
        .attr("height", height)
        .attr("fill", "#975503");

        // syrup tap
        last_scene.append("rect")
        .attr("x", width * .82)
        .attr("y", height * .6)
        .attr("width", 70)
        .attr("height", 20)
        .attr("fill", "#a5a4a2");

        last_scene.append("circle")
        .attr("cx", width * .82 + 70)
        .attr("cy", height * .6 + 10)
        .attr("r", 10)
        .attr("fill", "#a5a4a2");

        last_scene.append("circle")
        .attr("cx", width * .82)
        .attr("cy", height * .6 + 10)
        .attr("r", 10)
        .attr("fill", "#81807f");

        // syrup dripping from tap
        last_scene.append("circle")
        .attr("cx", width * .82)
        .attr("cy", height * .6 + 40)
        .attr("r", 13)
        .attr("fill", "#f18927");

        last_scene.append("ellipse")
        .attr("cx", width * .82)
        .attr("cy", height * .6 + 34)
        .attr("rx", 10)
        .attr("ry", 15)
        .attr("fill", "#f18927");

        last_scene.append("text")
        .attr("x", width * 0.3).attr("y", height * 0.5)
        .attr("font-family", "Josefin Sans")
        .attr("font-size", 35)
        .attr("font-weight", 700)
        .attr("fill", "black")
        .text("and our maple syrup");

        return last_scene; 
    }
   

// ── Animate Leaf ───────────────────────────────────────────────────────────────────
    function move_leaf(leafG, xpos=0, ypos=0, targetX=100, targetY=100){
        const leaff = leafG.select('path');
        let x=xpos;
        let y=ypos;
        const duration = 2000;
        let targetXpos=targetX;
        let targetYpos=targetY;

        const startTime = performance.now();
        const tick = () => {
            const currentTime = performance.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed/duration, 1);
            x= progress * targetXpos + Math.cos(progress * 2 * Math.PI) * 20; 
            y = progress * targetYpos;
            leaff.attr("transform", `translate(${x}, ${y})`);
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
            
    }


// ── Step Functions ───────────────────────────────────────────────────────────────────
    function step01() {

        // draw water background w/ waves and caption
        water_wave = draw_water(svg);
        water_wave.style("opacity", 0); 
        water_wave.transition()
        .duration(2000)
        .style("opacity", 1);
        
        // draw leaf in first position
        firstleaf = drawLeaf(svg);

            // hide first step card
            const card = firstleaf.node().closest(".step")
            ?.querySelector(".step-card")
            || document.querySelector(".step-card");

            if (card) {
                void card.offsetWidth;
                card.style.opacity = "0";
            }
    }

    function step02(){

        // hide first leaf and water waves
        firstleaf.style("opacity", 0); 
        water_wave.style("opacity", 0); 

        // draw air scene + caption from previous step in a different color
        drawAir(svg);
        const caption = draw_water_caption(svg);

        // draw second leaf and animate it
        secondleaf = drawLeaf(svg);
        move_leaf(secondleaf);
        secondleaf.attr("transform", `rotate(-10) scale(2)`);
    }

    function step03() {
        // hide second leaf
        secondleaf.style("opacity", 0); // hide second leaf

        // draw third leaf and animate it
        thirdleaf = drawLeaf(svg);
        thirdleaf.attr("transform", "translate(300, 140) scale(2) rotate(-7)"); 
        move_leaf(thirdleaf)
        
        // draw last scene 
        const syruptap = draw_final_scene_intro(svg)
        syruptap.style("opacity", 0);
        syruptap.transition()
        .duration(2000)
        .style("opacity", 1);

    }


    function applyStep(stepId) {
        currentStepId = stepId;

        if (stepId === "c03-step1") return step01();
        if (stepId === "c03-step2") return step02();
        if (stepId === "c03-step3") return step03();

        step01();
    }

    function init(container) {
        root = d3.select(container);

        width = root.node().clientWidth || 900;
        height = root.node().clientHeight || 560;

         svgOuter = root
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`);
            
          svg = svgOuter.append("g");


        applyStep("c03-step1");
    }

    function resize(w, h) {
        width = w ?? width;
        height = h ?? height;

        svgOuter
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

        if (outer) {
            outer.style.width = `${width}px`;
            outer.style.height = `${height}px`;
        }

        applyStep(currentStepId ?? "c03-step1");
    }

    function onStepEnter(stepId) {
        applyStep(stepId);
    }

  return { init, resize, onStepEnter };
}