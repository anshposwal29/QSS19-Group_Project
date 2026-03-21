# Maple Story: Steps 0-1

This project is the introduction to a larger story about the presence of perfluoroalkyl and polyfluoroalkyl substances (PFAs) and metals in maple syrup. The story comes from ongoing research into maple trees in New England.

The introduction is broken down into two steps:

* Step 0: "From the environment to the breakfast table"

* Step 1: What Makes PFAs so hard to deal with?


## Step 0: "From the environment to the breakfast table"

In addition to a landing page, the code includes four chapters. The first two are part of Step 0. 
Step 0 begins by evoking concern about the seemingly invisible enemies wandering in our water and air. A falling maple leaf connects these natural environments to the processing of sap and its eventual arrival onto the kitchen table as maple syrup. PFAs and metals are exposed in the syrup bottle, signifying a danger that persists despite the long journey. 


## Step 1: What Makes PFAs so hard to deal with?

Chapters three and four make up Step 1. After raising awareness of PFAs, the visualizations will share basic chemistry to explain why they are "forever chemicals." Though they go almost unseen (depicted by the intentional color contrasts and zoom-ins), PFAs have the bonds and power to seriously harm humans. This threat will keep the audience engaged and provides background information for the rest of the Maple Story to unfold.


## Code Structure

The code is separated into a HTML, JavaScript (JS), and CSS file.

The HTML file (index.html) loads the CSS style sheet, a font imported from Google Fonts, and the JS file to initialize the landing page, chapter visualizations, and Scrollama scroll-tracking library.

The JS file (main.js) imports the D3 and Scrollama libraries used for visualization. It includes functions that render the landing page and draw images and animations in the four chapters. Each chapter is broken down further and exports a factory function that returns { initi, resize, onStepEnter }. The function main() at the bottom of the JS file configures Scrollama to trigger chapter transitions on scroll.

The CSS file (styles.css) defines project-wide design tokes (colors, shadows, max-widths) as CSS custom properties. It also applies border-box sizing globally and sets the base body typography. For accessibility purposes, the CSS file reduces spacing and font sizes on narrow screens to ensure content is still readable on mobile devices.


## Libraries and External Resources to Run Code

This project utilizes D3 for SVG rendering and data-driven DOM manipulation, and Scrollama to detect when scroll-step elements enter the viewport.

The D3 and Scrollama libraries are imported at the top of the JS file:

	import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
	import scrollama from "https://cdn.jsdelivr.net/npm/scrollama@3.2.0/+esm";


Josefin Sans is the selected typeface used across all text in the Maple Story. The font must be imported from Google Fonts and loaded into the HTML file,  inside head /head. 
 
	<link rel="preconnect" href="https://fonts.googleapis.com">
  	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  	<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">


To run the code, install the Live Server extension (by Ritwick Dey) on Visual Studio Code. View and install extensions by clicking on the fifth icon on the left-hand navigation bar. 


## Running the Code

To run the code as a standalone story, download the HTML, JS, and CSS file and maintain them together in a folder. The code will not run if the files are separated into different folders and the references are unchanged in the code.

For instance, moving the JS script in its own folder named "javascript", requires the following changes to its reference in the HTML sheet.

	Original code: <script type="module" src="main.js"></script>
	Updated code: <script type="module" src="./javascript/main.js"></script>

In Visual Studio Code, open the folder with the three files and open the HTML file. Click on "Port" at the bottom right and "Go Live" soonafter. The code will open on your default browser.


## Data Assumptions and Known Limitations

At the time this project was developed, no data had been released by the research team. However, discussion with Zig about preliminary discoveries of metals and PFAs in maple syrup allowed us to frame these chemicals as more than capable enough to reach maple syrup. 

