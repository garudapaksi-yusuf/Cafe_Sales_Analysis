// Title: Responsive design best practices for embedding Tableau
// Author: Eskinasy, A.
// Date: 2023
// Availability: https://github.com/alexeski/tableau-embed-viz-responsive-apiv3

import {
  TableauViz,
  TableauEventType,
} from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";

let vizDiv,
  currentWidth,
  scalingFactor,
  mediaQuery,
  maxWidth, // max width as defined in the dashboard with Fixed size
  activeSheet,
  behaviour; // dashboard behaviour when published to Tableau Server/Cloud. "Automatic/Exactly/Range"

// set breakpoint to switch between phone and desktop views
const mediaQueryString = "(max-width: 576px)";

// Tableau Embed Code
const viz = new TableauViz();
viz.src =
  "https://public.tableau.com/views/CafeSalesDashboard_17947344012720/Dashboard";
viz.toolbar = "hidden";
// viz.hideTabs = "false";
vizDiv = document.getElementById("tableauViz");
vizDiv.appendChild(viz);
viz.addEventListener(TableauEventType.FirstInteractive, ready);

// once the viz is ready, check if it's a dashboard or a standalone worksheet
// if it's dashboard AND behaviour = "exactly" (i.e. fixed height/width), call scale
function ready() {
  console.log("Viz has loaded!");
  activeSheet = viz.workbook.activeSheet;
  console.log("Active sheet:", activeSheet.name);
  console.log("Worksheet type:", activeSheet.sheetType);
  console.log("Workbook name:", viz.workbook.name);
  behaviour =
    activeSheet._workbookImpl._activeSheetImpl._sheetInfoImpl._sheetSize
      .behavior;

  // determine what type of sheet it is: worksheet, dashboard or story
  switch (activeSheet.sheetType) {
    case "worksheet":
      // placeholder to show as example
      break;
    case "dashboard":
      console.log("Found Dashboard!");

      // check dashboard size settings (exactly vs range vs automatic )
      // note: this function isn't implemented in the API, so user need to access it via the prototype
      // note: width will not exist and will an error will be throuwn if size isn't set to exactly or range
      if (behaviour === "exactly") {
        maxWidth =
          activeSheet._workbookImpl._activeSheetImpl._sheetInfoImpl._sheetSize
            .maxSize.width;
      }

      // check if user need to apply the first scaling on load (i.e. when size is fixed/range and current screen size different than max/min width )
      // also check if it's phone or mobile
      currentWidth = vizDiv.offsetWidth;
      mediaQuery = window.matchMedia(mediaQueryString);
      if (mediaQuery.matches) {
        // viz.device = "phone";
        scaleViz(currentWidth, maxWidth, "phone");
      } else {
        scaleViz(currentWidth, maxWidth, "desktop");
      }
      break;
    case "story":
      // placeholder to show as example
      break;
  }
}

// track any window resize events and whether it needs to change between phone/desktop or if it needs to be scaled
window.addEventListener("resize", () => {
  console.log(
    "Screen size is changing; mediaQuery.matches: ",
    mediaQuery.matches
  );

  currentWidth = vizDiv.offsetWidth;

  if (mediaQuery.matches) {
    // if device change (from desktop/default to phone), load 'phone' version and scale
    if (viz.device === "desktop" || viz.device === "default") {
      viz.device = "phone";
      scaleViz(currentWidth, maxWidth, "phone");

      // if no device changes, then just scale
    } else {
      scaleViz(currentWidth, maxWidth, "phone");
    }
  } else {
    // size change from phone to desktop
    if (viz.device === "phone") {
      viz.device = "desktop";

      scaleViz(currentWidth, maxWidth, "desktop");

      // if no device change, then just scale
    } else {
      scaleViz(currentWidth, maxWidth, "desktop");
    }
  }
});

function scaleViz(currentWidth, maxWidth, deviceType) {
  // only apply scaling when view size is fixed
  if (behaviour === "range") {
    console.log(
      "The dashboard is configured to use a Range; scaling not implemented. Non-scaling is fine for mobile layouts, but recommended for large screens using automatic or fixed size dashboards."
    );
  } else if (behaviour === "exactly") {
    // set the origin to scale from
    vizDiv.style.transformOrigin = "left top";

    // simple scaling factor
    // e.g. if currentWidth = 900 and maxWidth = 1200, scaling factor is .75
    scalingFactor = currentWidth / maxWidth;

    // cap scaling factor so it only scales down; does not scale up (increase size of viz)
    if (scalingFactor > 1) {
      scalingFactor = 1;
    }

    // scaling is essentially disabled for mobile; will always be 1
    if (deviceType === "phone") {
      scalingFactor = 1;
    }

    // scale the viz using the scalingFactor derived above
    // log current parameters
    console.log(
      "Current width: " +
        currentWidth +
        "; maxWidth: " +
        maxWidth +
        "; scalling Factor: " +
        scalingFactor +
        "; device= " +
        viz.device
    );
    // apply CSS transform
    vizDiv.style.transform = "scale(" + scalingFactor + ")";

    // tweak Flexbox to ensure the Tableau iframe content is always centered correctly to the page, regardless of scaling or device type
    let elems = document.getElementsByTagName("tableau-viz");
    for (let i = 0; i < elems.length; i++) {
      elems[i].style.justifyContent = "center";
      if (scalingFactor === 1) {
        elems[i].style.position = "relative";
      } else {
        elems[i].style.position = "absolute";
      }
    }

    // after applying the CSS transform and other adjustments, set visibility to visible.
    vizDiv.style.visibility = "visible";
  }
}