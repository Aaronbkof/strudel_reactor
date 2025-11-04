import './App.css';
import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export function SetupButtons() {
    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
    document.getElementById('process').addEventListener('click', () => {
        Proc()
    })
    document.getElementById('process_play').addEventListener('click', () => {
        if (globalEditor != null) {
            Proc()
            globalEditor.evaluate()
        }
    })
}

export function ProcAndPlay() {
    if (globalEditor != null && globalEditor.repl.state.started === true) {
        console.log(globalEditor)
        Proc()
        globalEditor.evaluate();
    }
}

export function Proc() {
    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', soundToggle('p1'));
    // handle for p2 controls
    proc_text_replaced = proc_text_replaced.replaceAll('<p2_Radio>', soundToggle('p2'));
    proc_text_replaced = proc_text_replaced.replaceAll('<drums_Toggle>', document.getElementById('drumsCheck').checked ? '1' : '0');
    proc_text_replaced = proc_text_replaced.replaceAll('<pattern_Idx>', document.getElementById('patternSelect').value);
    globalEditor.setCode(proc_text_replaced)
}

export function soundToggle(control) {
    // when starting the webapp the controls will default to on and not muted
    // so gain = 1
    let replace = "1"

    if (control === 'p1') {
        if (document.getElementById('flexRadioDefault2').checked) {
            // if toggled mute p1 (baseline)
            replace = "0"
        }
    } else if (control === 'p2') {
        if (document.getElementById('p2RadioDefault2').checked) {
            // if toggled mute p2 (arpeggio)
            replace = "0"
        }
    }

    return replace
}

export default function StrudelDemo() {
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;

            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            document.getElementById('proc').value = stranger_tune
            SetupButtons()
            Proc()
        }
    }, []);

    return (
        <div>
            <h2>Strudel Demo</h2>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
                            <textarea className="form-control" rows="15" id="proc" ></textarea>
                        </div>
                        <div className="col-md-4">
                            <nav>
                                <button id="process" className="btn btn-outline-primary">Preprocess</button>
                                <button id="process_play" className="btn btn-outline-primary">Proc & Play</button>
                                <br />
                                <button id="play" className="btn btn-outline-primary">Play</button>
                                <button id="stop" className="btn btn-outline-primary">Stop</button>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                        <div className="col-md-4">
                            <h5>Controls</h5>

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
                                    <option value="0">Pattern 0 (Sparse)</option>
                                    <option value="1">Pattern 1 (Medium)</option>
                                    <option value="2">Pattern 2 (Complex)</option>
                                </select>
                            </div> 
                        </div>
                    </div>
                </div>
                <canvas id="roll"></canvas>
            </main>
        </div>
    );
}