import { useState } from "react";
export default function Controls({ ProcAndPlay }) {
    const [reverbValue, setReverbValue] = useState(0.6);

    return (
        <div className="col-md-4">
            <h5>Controls</h5>

            { /* playback buttons */}
            <div className="col-md-4">
                <nav>
                    <button id="process" className="btn btn-outline-primary">Preprocess</button>
                    <button id="process_play" className="btn btn-outline-primary">Proc & Play</button>
                    <br />
                    <button id="play" className="btn btn-outline-primary">Play</button>
                    <button id="stop" className="btn btn-outline-primary">Stop</button>
                </nav>
            </div>

            {/* P1 controls for baseline */}
            <div className="mb-3">
                <label className="form-label">Bassline (p1)</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        ON
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        HUSH
                    </label>
                </div>
            </div>

            {/* P2 controls for arpeggio*/}
            <div className="mb-3">
                <label className="form-label">Arpeggiator (p2)</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="p2RadioDefault" id="p2RadioDefault1" onChange={ProcAndPlay} defaultChecked />
                    <label className="form-check-label" htmlFor="p2RadioDefault1">
                        ON
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="p2RadioDefault" id="p2RadioDefault2" onChange={ProcAndPlay} />
                    <label className="form-check-label" htmlFor="p2RadioDefault2">
                        HUSH
                    </label>
                </div>
            </div>

            {/* drum toggle (checkbox) */}
            <div className="mb-3">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="drumsCheck"
                        defaultChecked
                        onChange={ProcAndPlay}
                    />
                    <label className="form-check-label" htmlFor="drumsCheck">
                        Enable Drums
                    </label>
                </div>
            </div>

            {/* drum patterns (dropdown 1-3) */}
            <div className="mb-3">
                <label htmlFor="patternSelect" className="form-label">Drum Pattern</label>
                <select
                    className="form-select"
                    id="patternSelect"
                    defaultValue="0"
                    onChange={ProcAndPlay}
                >
                    <option value="0">Pattern 1 (Sparse)</option>
                    <option value="1">Pattern 2 (Medium)</option>
                    <option value="2">Pattern 3 (Complex)</option>
                </select>
            </div>

            {/* different basslines */}
            <div className="mb-3">
                <label htmlFor="basslineSelect" className="form-label">Bassline Style</label>
                <select
                    className="form-select"
                    id="basslineSelect"
                    defaultValue="0"
                    onChange={ProcAndPlay}
                >
                    <option value="0">Bassline A</option>
                    <option value="1">Bassline B</option>
                </select>
            </div>

            {/* reverb slider */}
            <div className="mb-3">
                <label htmlFor="reverbSlider" className="form-label">
                    Reverb: {reverbValue.toFixed(2)}
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="reverbSlider"
                    min="0"
                    max="1"
                    step="0.01"
                    defaultValue="0.6"
                    onChange={(x) => {
                        setReverbValue(Number(x.target.value));
                        ProcAndPlay();
                    }}
                />
            </div>
        </div>
    );
}