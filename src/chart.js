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
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext, { axisTitle: "X Axis", growBy}));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { axisTitle: "Y Axis", growBy }));

    //Create a data series with some data
    const lineData1 = new XyDataSeries(wasmContext);
    const lineData2 = new XyDataSeries(wasmContext);
    const lineData3 = new XyDataSeries(wasmContext);
    const lineData4 = new XyDataSeries(wasmContext);
    const lineData5 = new XyDataSeries(wasmContext);
    const lineData6 = new XyDataSeries(wasmContext);
    const lineData7 = new XyDataSeries(wasmContext);
    const lineData8 = new XyDataSeries(wasmContext);
    const lineData9 = new XyDataSeries(wasmContext);
    const lineData10 = new XyDataSeries(wasmContext);
    const lineData11 = new XyDataSeries(wasmContext);
    const lineData12 = new XyDataSeries(wasmContext);
    const lineData13 = new XyDataSeries(wasmContext);
    const lineData14 = new XyDataSeries(wasmContext);
    const lineData15 = new XyDataSeries(wasmContext);
    const lineData16 = new XyDataSeries(wasmContext);
    const lineData17 = new XyDataSeries(wasmContext);
    const lineData18 = new XyDataSeries(wasmContext);
    const lineData19 = new XyDataSeries(wasmContext);
    const lineData20 = new XyDataSeries(wasmContext);
    const lineData21 = new XyDataSeries(wasmContext);
    const lineData22 = new XyDataSeries(wasmContext);
    const lineData23 = new XyDataSeries(wasmContext);
    const lineData24 = new XyDataSeries(wasmContext);
    const lineData25 = new XyDataSeries(wasmContext);


    // Create a line series
    const lineSeries1 = new FastLineRenderableSeries(wasmContext, {
        stroke: "black",
        strokeThickness: 2,
        dataSeries: lineData1,
    });
    const lineSeries2 = new FastLineRenderableSeries(wasmContext, {
        stroke: "gray",
        strokeThickness: 2,
        dataSeries: lineData2,
    });
    const lineSeries3 = new FastLineRenderableSeries(wasmContext, {
        stroke: "maroon",
        strokeThickness: 2,
        dataSeries: lineData3,
    });
    const lineSeries4 = new FastLineRenderableSeries(wasmContext, {
        stroke: "red",
        strokeThickness: 2,
        dataSeries: lineData4,
    });
    const lineSeries5 = new FastLineRenderableSeries(wasmContext, {
        stroke: "purple",
        strokeThickness: 2,
        dataSeries: lineData5,
    });
    const lineSeries6 = new FastLineRenderableSeries(wasmContext, {
        stroke: "fuchsia",
        strokeThickness: 2,
        dataSeries: lineData6,
    });
    const lineSeries7 = new FastLineRenderableSeries(wasmContext, {
        stroke: "green",
        strokeThickness: 2,
        dataSeries: lineData7,
    });
    const lineSeries8 = new FastLineRenderableSeries(wasmContext, {
        stroke: "lime",
        strokeThickness: 2,
        dataSeries: lineData8,
    });
    const lineSeries9 = new FastLineRenderableSeries(wasmContext, {
        stroke: "yellow",
        strokeThickness: 2,
        dataSeries: lineData9,
    });
    const lineSeries10 = new FastLineRenderableSeries(wasmContext, {
        stroke: "navy",
        strokeThickness: 2,
        dataSeries: lineData10,
    });
    const lineSeries11 = new FastLineRenderableSeries(wasmContext, {
        stroke: "aqua",
        strokeThickness: 2,
        dataSeries: lineData11,
    });
    const lineSeries12 = new FastLineRenderableSeries(wasmContext, {
        stroke: "azure",
        strokeThickness: 2,
        dataSeries: lineData12,
    });
    const lineSeries13 = new FastLineRenderableSeries(wasmContext, {
        stroke: "beige",
        strokeThickness: 2,
        dataSeries: lineData13,
    });
    const lineSeries14 = new FastLineRenderableSeries(wasmContext, {
        stroke: "teal",
        strokeThickness: 2,
        dataSeries: lineData14,
    });
    const lineSeries15 = new FastLineRenderableSeries(wasmContext, {
        stroke: "darkgoldenrod",
        strokeThickness: 2,
        dataSeries: lineData15,
    });
    const lineSeries16 = new FastLineRenderableSeries(wasmContext, {
        stroke: "darkorange",
        strokeThickness: 2,
        dataSeries: lineData16,
    });
    const lineSeries17 = new FastLineRenderableSeries(wasmContext, {
        stroke: "darkred",
        strokeThickness: 2,
        dataSeries: lineData17,
    });
    const lineSeries18 = new FastLineRenderableSeries(wasmContext, {
        stroke: "darkviolet",
        strokeThickness: 2,
        dataSeries: lineData18,
    });
    const lineSeries19 = new FastLineRenderableSeries(wasmContext, {
        stroke: "deeppink",
        strokeThickness: 2,
        dataSeries: lineData19,
    });
    const lineSeries20 = new FastLineRenderableSeries(wasmContext, {
        stroke: "dimgray",
        strokeThickness: 2,
        dataSeries: lineData20,
    });
    const lineSeries21 = new FastLineRenderableSeries(wasmContext, {
        stroke: "dodgerblue",
        strokeThickness: 2,
        dataSeries: lineData21,
    });
    const lineSeries22 = new FastLineRenderableSeries(wasmContext, {
        stroke: "firebrick",
        strokeThickness: 2,
        dataSeries: lineData22,
    });
    const lineSeries23 = new FastLineRenderableSeries(wasmContext, {
        stroke: "forestgreen",
        strokeThickness: 2,
        dataSeries: lineData23,
    });
    const lineSeries24 = new FastLineRenderableSeries(wasmContext, {
        stroke: "gold",
        strokeThickness: 2,
        dataSeries: lineData24,
    });
    const lineSeries25 = new FastLineRenderableSeries(wasmContext, {
        stroke: "gray",
        strokeThickness: 2,
        dataSeries: lineData25,
    });

    //Assign data series to the line series
    // lineSeries.dataSeries = lineData;

    // Create a line series with some initial data
    sciChartSurface.renderableSeries.add(lineSeries1);
    sciChartSurface.renderableSeries.add(lineSeries2);
    sciChartSurface.renderableSeries.add(lineSeries3);
    sciChartSurface.renderableSeries.add(lineSeries4);
    sciChartSurface.renderableSeries.add(lineSeries5);
    sciChartSurface.renderableSeries.add(lineSeries6);
    sciChartSurface.renderableSeries.add(lineSeries7);
    sciChartSurface.renderableSeries.add(lineSeries8);
    sciChartSurface.renderableSeries.add(lineSeries9);
    sciChartSurface.renderableSeries.add(lineSeries10);
    sciChartSurface.renderableSeries.add(lineSeries11);
    sciChartSurface.renderableSeries.add(lineSeries12);
    sciChartSurface.renderableSeries.add(lineSeries13);
    sciChartSurface.renderableSeries.add(lineSeries14);
    sciChartSurface.renderableSeries.add(lineSeries15);
    sciChartSurface.renderableSeries.add(lineSeries16);
    sciChartSurface.renderableSeries.add(lineSeries17);
    sciChartSurface.renderableSeries.add(lineSeries18);
    sciChartSurface.renderableSeries.add(lineSeries19);
    sciChartSurface.renderableSeries.add(lineSeries20);
    sciChartSurface.renderableSeries.add(lineSeries21);
    sciChartSurface.renderableSeries.add(lineSeries22);
    sciChartSurface.renderableSeries.add(lineSeries23);
    sciChartSurface.renderableSeries.add(lineSeries24);
    sciChartSurface.renderableSeries.add(lineSeries25);


    window.electronAPI.onPitchData((dataMessage) => {
   
        // console.log("Pitch data received:");

        const {timestamp, pitch} = dataMessage;

        // Ensure pitch is defined before using it
        if (pitch !== undefined) {
            lineData1.append(timestamp, pitch);
        } else {
            console.error('Pitch data is undefined');
        }

        const xAxis = sciChartSurface.xAxes.get(0);

        if (sciChartSurface.zoomState !== EZoomState.UserZooming) {
            // sciChartSurface.zoomExtents();
            xAxis.visibleRange = new NumberRange(timestamp - 5000, timestamp);
        }

    });

    window.electronAPI.onGGdata((dataMessage) => {
   
        // console.log("GG data received:");

        const {timestamp, ax, ay} = dataMessage;

        // Ensure gg data is defined before using it
        if (ax !== undefined && ay !== undefined) {
            lineData2.append(timestamp, ax);
            lineData3.append(timestamp, ay);
        } else {
            console.error('ax data or ay data is undefined');
        }

        const xAxis = sciChartSurface.xAxes.get(0);

        if (sciChartSurface.zoomState !== EZoomState.UserZooming) {
            // sciChartSurface.zoomExtents();
            xAxis.visibleRange = new NumberRange(timestamp - 5000, timestamp);
        }

    });

    window.electronAPI.onMotorTorque((dataMessage) => {
   
        // console.log("Torque data received");

        const {timestamp, fl, fr, rl, rr} = dataMessage;

        // Ensure gg data is defined before using it
        if ([fl, fr, rl, rr].every(val => !isNaN(val))) {  // Check all values are defined
            
            lineData4.append(timestamp, fl);
            lineData5.append(timestamp, fr);
            lineData6.append(timestamp, rl);
            lineData7.append(timestamp, rr);
        } else {
            console.error('Torque data is undefined');
        }

        const xAxis = sciChartSurface.xAxes.get(0);

        if (sciChartSurface.zoomState !== EZoomState.UserZooming) {
            // sciChartSurface.zoomExtents();
            xAxis.visibleRange = new NumberRange(timestamp - 5000, timestamp);
        }

    });

    window.electronAPI.onIMUdata((dataMessage) => {
   
        // console.log("Received IMU data");

        const {timestamp, ax, ay, az, lsb, msb, picth, roll, yaw, pps_lsb } = dataMessage;

        // Ensure gg data is defined before using it
        if ([ax, ay, az, lsb, msb, picth, roll, yaw, pps_lsb].every(val => !isNaN(val))) {  // Check all values are defined
            // console.log('IMU data is defined');
            
            lineData8.append(timestamp, ax);
            lineData9.append(timestamp, ay);
            lineData10.append(timestamp, az);
            lineData11.append(timestamp, lsb);
            lineData12.append(timestamp, msb);
            lineData13.append(timestamp, picth);
            lineData14.append(timestamp, roll);
            lineData15.append(timestamp, yaw);
            lineData16.append(timestamp, pps_lsb);
        } else {
            console.error('IMU data is undefined');
        }

        const xAxis = sciChartSurface.xAxes.get(0);

        if (sciChartSurface.zoomState !== EZoomState.UserZooming) {
            // sciChartSurface.zoomExtents();
            xAxis.visibleRange = new NumberRange(timestamp - 5000, timestamp);
        }

    });
    
    window.electronAPI.onAirPressure((dataMessage) => {
        const {timestamp, probe_1, probe_2, probe_3, probe_4, probe_5, probe_6, probe_7, probe_8, temp} = dataMessage;

        if ([probe_1, probe_2, probe_3, probe_4, probe_5, probe_6, probe_7, probe_8, temp].every(val => !isNaN(val))) {
            lineData17.append(timestamp, probe_1);
            lineData18.append(timestamp, probe_2);
            lineData19.append(timestamp, probe_3);
            lineData20.append(timestamp, probe_4);
            lineData21.append(timestamp, probe_5);
            lineData22.append(timestamp, probe_6);
            lineData23.append(timestamp, probe_7);
            lineData24.append(timestamp, probe_8);
            lineData25.append(timestamp, temp);
        } else {
            console.error('Air pressure data is undefined');
        }

        const xAxis = sciChartSurface.xAxes.get(0);

        if (sciChartSurface.zoomState !== EZoomState.UserZooming) {
            // sciChartSurface.zoomExtents();
            xAxis.visibleRange = new NumberRange(timestamp - 5000, timestamp);
        }
    });

}

initSciChart();