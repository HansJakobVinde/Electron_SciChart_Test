import {
    SciChartSurface,
    NumericAxis,
    CategoryAxis,
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
    FastColumnRenderableSeries,
    GradientParams,
    Point
} from "scichart";


async function initColumnSciChart() {

    // Initialize SciChartSurface. Don't forget to await!
    const { sciChartSurface, wasmContext } = await SciChartSurface.create("scichart_column-root", {
        theme: new SciChartJsNavyTheme(),
        title: "SciChart.js Column Chart",
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
    // Use CategoryAxis for the X axis to allow text labels
    sciChartSurface.xAxes.add(new CategoryAxis(wasmContext, {
        labels: ["FL", "FR", "RL", "RR"],
    }));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext));


    //Create a data series
    const columnData = new XyDataSeries(wasmContext, {
        xValues: [0, 1, 2, 3],
        yValues: [0.0, 0.0, 0.0, 0.0]
    });

    // Create a line series
    const columnSeries = new FastColumnRenderableSeries(wasmContext, {
         // When solid fill required, use fill
        fill: "rgba(176, 196, 222, 0.5)",
        // When gradient fill required, use fillGradient
        fillLinearGradient: new GradientParams(new Point(0, 0), new Point(0, 1), [
            { color: "rgba(70,130,180,0.77)", offset: 0 },
            { color: "rgba(70,130,180,0.0)", offset: 1 },
        ]),
        stroke: "#FFFFFF77",
        strokeThickness: 2,
        // optional cornerradius. Experimental!
        cornerRadius: 4,
        // Defines the relative width between columns
        dataPointWidth: 0.7,
        dataSeries: columnData,
    });

    sciChartSurface.renderableSeries.add(columnSeries);


    window.electronAPI.onMotorTorque((dataMessage) => {
   
        const {timestamp, fl, fr, rl, rr} = dataMessage;

        // Ensure gg data is defined before using it
        if ([fl, fr, rl, rr].every(val => !isNaN(val))) {  // Check all values are defined
            // columnData.yValues = newYValues;  // Update yValues directly
            // columnData.notifyDataChanged();   // Inform SciChart of the update

            // sciChartSurface.invalidateElement(); // Efficiently re-render the chart
            
            const newColumnData = new XyDataSeries(wasmContext, {
                xValues: [0, 1, 2, 3],
                yValues: [fl, fr, rl, rr]
            });
            columnSeries.dataSeries = newColumnData;
        } else {
            console.error('Torque data is undefined');
        }

        if (sciChartSurface.zoomState !== EZoomState.UserZooming) {
            sciChartSurface.zoomExtents();
        }
    });
}

initColumnSciChart();