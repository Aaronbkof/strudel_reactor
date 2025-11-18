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
import console_monkey_patch from './console-monkey-patch';

// importing app functions
import { Proc } from './components/textProcessor';
import Controls from './components/controls';
import EditorArea from './components/editorArea';
import Visualiser from './components/visualiser';

let globalEditor = null;

//const handleD3Data = (event) => {
//    console.log(event.detail);
//};

//export function SetupButtons() {
//    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//    document.getElementById('process').addEventListener('click', () => {
//        Proc(globalEditor)
//    })
//    document.getElementById('process_play').addEventListener('click', () => {
//        if (globalEditor != null) {
//            Proc(globalEditor)
//            globalEditor.evaluate()
//        }
//    })
//}

// more reactive amd safe version of SetupButtons
export function SetupButtons() {
    const play = document.getElementById('play');
    const stop = document.getElementById('stop');
    const process = document.getElementById('process');
    const processPlay = document.getElementById('process_play');

    // safetly return if any button is missing and not crash the webapp due to DOM issues
    // will always check this first before adding event listeners
    if (!play || !stop || !process || !processPlay) return;

    // will only go here if all buttons are present
    play.addEventListener('click', () => globalEditor.evaluate()); // parse and play
    stop.addEventListener('click', () => globalEditor.stop()); // stop parsing and playing
    process.addEventListener('click', () => Proc(globalEditor)); // just parse

    // combined parse and then play
    processPlay.addEventListener('click', () => {
        if (globalEditor != null) {
            Proc(globalEditor);
            globalEditor.evaluate();
        }
    });
}

export function ProcAndPlay() {
    if (globalEditor != null && globalEditor.repl.state.started === true) {
        console.log(globalEditor)
        Proc(globalEditor)
        globalEditor.evaluate();
    }
}

export default function StrudelDemo() {
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            //document.addEventListener("d3Data", handleD3Data);
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
            Proc(globalEditor)
        }
    }, []);

    return (
        <div className="App">
            <h1>Strudel REPL Demo</h1>

            <main className="container-fluid text-start px-4">
                <div className="row">
                    {/* Left column: Editor + Visualiser */}
                    <div className="col-md-8">
                        {/* Editor */}
                        <div style={{ maxHeight: '60vh', overflowY: 'auto', marginBottom: '1rem' }}>
                            <EditorArea />
                        </div>

                        {/* Visualiser directly below editor */}
                        <Visualiser />
                    </div>

                    {/* Right column: Controls (full height) */}
                    <div className="col-md-4">
                        <Controls ProcAndPlay={ProcAndPlay} />
                    </div>
                </div>

                <canvas id="roll" style={{ display: 'none' }}></canvas>
            </main>
        </div>
    );
}