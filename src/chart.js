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
    EAutoRange
} from "scichart";


async function initSciChart() {

    // Initialize SciChartSurface. Don't forget to await!
    const { sciChartSurface, wasmContext } = await SciChartSurface.create("scichart-root", {
        theme: new SciChartJsNavyTheme(),
        title: "SciChart.js Pitch Data",
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


    // Create an XAxis and YAxis with growBy padding
    const growBy = new NumberRange(0.1, 0.1);
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext, { axisTitle: "X Axis", growBy }));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { axisTitle: "Y Axis", growBy, autoRange: EAutoRange.Always }));

    //Create a data series with some data
    const lineData = new XyDataSeries(wasmContext);

    // Create a line series
    const lineSeries = new FastLineRenderableSeries(wasmContext, {
        stroke: "steelblue",
        strokeThickness: 2,
        dataSeries: lineData,
    });

    //Assign data series to the line series
    // lineSeries.dataSeries = lineData;

    // Create a line series with some initial data
    sciChartSurface.renderableSeries.add(lineSeries);

    window.electronAPI.onPitchData((dataMessage) => {
   
        // console.log("Received new DataMessage:", dataMessage);

        const {timestamp, pitch} = dataMessage;

        // Ensure pitch is defined before using it
        if (pitch !== undefined) {
            lineData.append(timestamp, pitch);
        } else {
            console.error('Pitch data is undefined');
        }

        const xAxis = sciChartSurface.xAxes.get(0);

        if (sciChartSurface.zoomState !== EZoomState.UserZooming) {
            // sciChartSurface.zoomExtents();
            xAxis.visibleRange = new NumberRange(timestamp - 5000, timestamp);
        }

    });

}

initSciChart();