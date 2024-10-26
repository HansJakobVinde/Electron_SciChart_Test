import {
    SciChartSurface,
    NumericAxis,
    FastLineRenderableSeries,
    XyDataSeries,
    EllipsePointMarker,
    SweepAnimation,
    SciChartJsNavyTheme,
    NumberRange,
    RubberBandXyZoomModifier,
    MouseWheelZoomModifier,
    ZoomPanModifier,
    ZoomExtentsModifier,
    EZoomState,
    EAutoRange,
    XyScatterRenderableSeries,
} from "scichart";


async function initScatterSciChart() {

    // Initialize SciChartSurface. Don't forget to await!
    const { sciChartSurface, wasmContext } = await SciChartSurface.create("scichart_scatter-root", {
        theme: new SciChartJsNavyTheme(),
        title: "SciChart.js GG-Plot",
        titleStyle: { fontSize: 22 }
    });

    {// Add some interaction modifiers to show zooming and panning
    const mouseWheelZoomModifier = new MouseWheelZoomModifier();
    const zoomPanModifier = new ZoomPanModifier();
    const rubberBandZoomModifier = new RubberBandXyZoomModifier();
    const zoomExtentsModifier = new ZoomExtentsModifier();

    sciChartSurface.chartModifiers.add(zoomExtentsModifier);
    sciChartSurface.chartModifiers.add(zoomPanModifier);
    sciChartSurface.chartModifiers.add(rubberBandZoomModifier);
    sciChartSurface.chartModifiers.add(mouseWheelZoomModifier);
    
    const inputEnablePan = document.getElementById("enable-pan");
    const inputEnableZoom = document.getElementById("enable-zoom");
    const inputEnableZoomToFit = document.getElementById("enable-zoom-to-fit");
    const inputEnableMouseWheel = document.getElementById("enable-mouse-wheel-zoom");
    
    inputEnablePan.addEventListener("input", (event) => {
        zoomPanModifier.isEnabled = inputEnablePan.checked;
        rubberBandZoomModifier.isEnabled = !inputEnablePan.checked;
        inputEnableZoom.checked = !inputEnablePan.checked;
    });
    
    inputEnableZoom.addEventListener("input", (event) => {
        rubberBandZoomModifier.isEnabled = inputEnableZoom.checked;
        zoomPanModifier.isEnabled = !inputEnableZoom.checked;
        inputEnablePan.checked = !inputEnableZoom.checked;
    });
    
    inputEnableZoomToFit.addEventListener("input", (event) => {
        zoomExtentsModifier.isEnabled = inputEnableZoomToFit.checked;
    });
    
    inputEnableMouseWheel.addEventListener("input", (event) => {
        mouseWheelZoomModifier.isEnabled = inputEnableMouseWheel.checked;
    });
    }


    // Create an XAxis and YAxis);
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext));


    //Create a data series
    const scatterData = new XyDataSeries(wasmContext);

    // Create a line series
    const scatterSeries = new XyScatterRenderableSeries(wasmContext, {
        dataSeries: scatterData,
        pointMarker: new EllipsePointMarker(wasmContext, {
            width: 7,
            height: 7,
            strokeThickness: 2,
            fill: "steelblue",
            stroke: "LightSteelBlue",
        }),
    });

    sciChartSurface.renderableSeries.add(scatterSeries);


    window.electronAPI.onGGdata((dataMessage) => {
   
        // console.log("Received new DataMessage:", dataMessage);

        const {timestamp, ax, ay} = dataMessage;


        // Ensure gg data is defined before using it
        if (ax !== undefined && ay !== undefined) {
            scatterData.append(ax, ay);
        } else {
            console.error('ax data or ay data is undefined');
        }

        if (sciChartSurface.zoomState !== EZoomState.UserZooming) {
            sciChartSurface.zoomExtents();
        }
    });
}

initScatterSciChart();