import { useState } from "react";

export default function EditorArea() {
    const [showProc, setShowProc] = useState(false);

    return (
        <div style={{ position: 'relative' }}>
            { /* toggle button */}
            <button
                className="btn btn-outline-light btn-sm"
                onClick={() => setShowProc(!showProc)}
                style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',  // Changed from 'left' to 'right'
                    zIndex: 10,
                    borderColor: '#00ff99',
                    color: '#00ff99',
                    backgroundColor: 'rgba(26, 26, 46, 0.9)'
                }}
            >
                {showProc ? "👁 Switch to Editor View" : "📝 Switch to Preprocess View"}
            </button>

            {/* text processor window size */}
            <div style={{ display: showProc ? "block" : "none" }}>
                <textarea className="form-control" rows="30" id="proc"></textarea>
            </div>

            <div style={{ display: showProc ? "none" : "block" }}>
                <div id="editor" />
                <div id="output" />
            </div>
        </div>
    );
}