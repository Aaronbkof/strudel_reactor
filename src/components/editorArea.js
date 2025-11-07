import { useState } from "react";

export default function EditorArea() {

    // using state reactively to toggle preprocess/demo view
    const [showProc, setShowProc] = useState(false);

    return (
        <div>
            { /* button to trigger the toggle */}
            <button
                className="btn btn-secondary btn-sm mb-2"
                onClick={() => setShowProc(!showProc)}
            >
                {showProc ? "Switch to Preprocess View" : "Switch to Editor View"}
            </button>

            {/* text processor window size */}
            <div style={{ display: showProc ? "block" : "none" }}>
                {/*<label className="form-label">Text to preprocess:</label>*/}
                <textarea className="form-control" rows="30" id="proc"></textarea>
            </div>

            <div style={{ display: showProc ? "none" : "block" }}>
                <div id="editor" />
                <div id="output" />
            </div>
        </div>
    );
}
