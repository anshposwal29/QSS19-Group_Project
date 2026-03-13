import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function createChapter() {
    let root, svgOuter, svg, width, height;
    let currentStepId = null;
    let currentIndex = -1;
    let wrapper = null;
    let outer = null;
    let slides = [];
 
// -------------- HORIZONTAL SCROLLING STUFF
// bringing in css from my previous draft for horizontal scrolling, but it does not work!
    const styles = `
    .slide { width:100vw; height:100vh; }
    .slide.active { outline:4px solid rgba(255,255,255,0.2); }
    .leaf { opacity:0; transition: opacity 0.5s; }
    .outer-wrapper { overflow-y: scroll; overflow-x: hidden; position: relative;}
    // .wrapper {display:flex,}
    .wrapper{position: sticky; display: flex; flex-direction: row; height: 100vh;}
      `;


     function ensureStyles() {
        if (document.getElementById('chapter-03-leaf-styles')) return;
        const style = document.createElement('style');
        style.id = 'chapter-03-leaf-styles';
        style.textContent = styles;
        document.head.appendChild(style);
     } 

     function buildDOM(mount) {
        ensureStyles();
        outer = document.createElement('div');
        outer.className = 'outer-wrapper';
   
        const stepCount = 3;
        outer.style.width = mount.clientWidth + 'px';
        outer.style.height = (mount.clientHeight * stepCount) + 'px';

        wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
    
        slides = new Array(stepCount).fill(null).map((_, i) => {
            const sec = document.createElement('section');
            sec.className = `slide step-${i}`;
            return sec;
        });

        outer.appendChild(wrapper);
        mount.appendChild(outer);

         outer.addEventListener('scroll', () => {
            const max = outer.scrollHeight - outer.clientHeight || 1;
            const progress = outer.scrollTop / max;            // 0 … 1
            const idx = Math.min(
                slides.length - 1,
                Math.floor(progress * slides.length)
            );
            setActive(idx);     
        }, { passive: true });
    }
     
    function renderBase() {
    if (svg) svg.selectAll("*").remove();
  }


// ----------- DRAWING FUNCTIONS
 function drawLeaf(parent, x, y, scale=1) {
        const leaf = parent.append("g")
        .attr("class", "leaf")
        .attr('transform', `translate(${x}, ${y}) scale(${scale})`);
        
        leaf.append("circle")
        .attr("cx", 10)
        .attr("cy", 0)
        .attr("r", 50)
        .attr("fill", "#d66508")

        return leaf;
    }

    function drawAir(parent) {
        const g = parent.append('g').attr('class', 'air');
        g.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#dcd3d3");
        return g;
    }

    // drawing water function currently not working, will check on it over the weekend
    function drawWater(parent) {
        const g = parent.append('g').attr('class', 'water');
       
        g.append('rect')
        // Water.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#85b0fe");
        return g;
    }


// ------ STEPS
    function step01() {
    setActive(0);
    renderBase();
        drawAir(svg);
        const leaf = drawLeaf(svg);
        leaf.transition()
            .duration(500).style("opacity", 1);
  }

  function step02() {
    setActive(1);
    renderBase();
    drawWater(svg);
    const leaf = drawLeaf(svg,  width = width * 3.5, height = height * .5);
        leaf.transition().duration(500).style('opacity', 1);
  }

  function step03() {
    setActive(2);
    renderBase();
    drawAir(svg);
    const leaf = drawLead(svg);
    leaf.transition().duration(500).style('opacity', 1);
  }


//  -------- MORE HORIZONTAL SCROLL STUFF
function setActive(index) {
    if (index === currentIndex) return;
    currentIndex = index;

    slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
        s.style.opacity = i === index ? '1':'0.6';
    });
    wrapper.style.transform = `translateX(${-index * 100}vw)`;
}


    function applyStep(stepId) {
        currentStepId = stepId;

        if (stepId === "c03-step-01") return step01();
        if (stepId === "c03-step-02") return step02();
        if (stepId === "c03-step-03") return step03();

        step01();
    }

    function init(container) {
        root = d3.select(container);

        width = root.node().clientWidth || 900;
        height = root.node().clientHeight || 560;

        buildDOM(container);

        svgOuter = d3.select(container)
        .select(".wrapper")
        .append("svg")

        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

        svg = svgOuter.append("g");

        applyStep("c03-step-01");
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


        applyStep(currentStepId ?? "c03-step-01");
    }

    function onStepEnter(stepId) {
        applyStep(stepId);
    }

  return { init, resize, onStepEnter };
}