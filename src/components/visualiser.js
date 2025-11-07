import { useState, useEffect } from "react";
import * as d3 from "d3";

export default function Visualiser() {
    const [values, setValues] = useState([]);
    const maxItems = 50;
    const maxValue = 500;

    // to listen for audio events broadcasted from console monkey patch
    // cleaned logs stored in the (logArray)
    useEffect(() => {
        const handleD3Data = (event) => {
            if (event.detail && Array.isArray(event.detail)) {
                // parse the latest gain
                const recent = event.detail.slice(-1)[0];
                // this is changing what is actively mapping to the graph in realtime
                const match = recent.match(/gain:([\d.]+)/);
                let val;
                if (match) {
                    val = parseFloat(match[1]) * maxValue;
                } else {
                    val = 0;
                }

                // this is what keeps the graph moving
                setValues(prev => {
                    //const next = [...prev, val];
                    const next = [];
                    for (let i = 0; i < prev.length; i++) {
                        next[i] = prev[i];
                    }
                    next[prev.length] = val;
                    if (next.length > maxItems) next.shift();
                    return next;
                });
            }
        };

        document.addEventListener("d3Data", handleD3Data);
        return () => document.removeEventListener("d3Data", handleD3Data);
    }, []);

    // decay the line gently back to 0 when music is stopped
    // (BUG: this will continue to show data on the graph even though its muted?)
    //useEffect(() => {
    //    const decayInterval = setInterval(() => {
    //        setValues(prev => {
    //            if (prev.length === 0) return prev;
    //            const decayed = Math.max(0, prev[prev.length - 1] - 5);
    //            const next = [...prev, decayed];
    //            if (next.length > maxItems) next.shift();
    //            return next;
    //        });
    //    }, 100);
    //    return () => clearInterval(decayInterval);
    //}, []);

    // draw the line (with axes)
    useEffect(() => {
        const svg = d3.select("#simpleViz");
        svg.selectAll("*").remove();

        const width = svg.node().getBoundingClientRect().width - 40;
        const height = 250;
        const margin = { top: 150, right: 30, bottom: 20, left: 60 };

        const xScale = d3.scaleLinear()
            .domain([0, maxItems - 1])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([height - margin.bottom, margin.top]);

        const line = d3.line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d))
            .curve(d3.curveBasis);

        // add X axis
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(5))
            .call(g => g.selectAll("text").style("fill", "#aaa"))
            .call(g => g.selectAll("line").style("stroke", "#444"))
            .call(g => g.select(".domain").style("stroke", "#555"));

        // add Y axis
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale).ticks(5))
            .call(g => g.selectAll("text").style("fill", "#aaa"))
            .call(g => g.selectAll("line").style("stroke", "#444"))
            .call(g => g.select(".domain").style("stroke", "#555"));

        // draw the line in realtime
        svg.append("path")
            .datum(values)
            .attr("fill", "none")

            // neon green line for better visibility
            .attr("stroke", "#00ff99")
            .attr("stroke-width", 2)
            .attr("d", line);

    }, [values]);

    // super basic styling for now
    return (
        <div style={{ padding: "10px", background: "#0f0f1e", borderRadius: "8px", marginTop: "10px" }}>
            <h5 style={{ color: "#fff", textAlign: "center", marginBottom: "8px" }}>
                Audio Visualiser
            </h5>
            <svg id="simpleViz" width="100%" height="250"></svg>
        </div>
    );
}
