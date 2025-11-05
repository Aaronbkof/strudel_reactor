export function Proc(globalEditor) {
    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', soundToggle('p1'));
    // handle for p2 controls
    proc_text_replaced = proc_text_replaced.replaceAll('<p2_Radio>', soundToggle('p2'));
    proc_text_replaced = proc_text_replaced.replaceAll('<drums_Toggle>', document.getElementById('drumsCheck').checked ? '1' : '0');
    // handle for pattern, bassline and reverb controls
    proc_text_replaced = proc_text_replaced.replaceAll('<pattern_Selector>', document.getElementById('patternSelect').value);
    proc_text_replaced = proc_text_replaced.replaceAll('<bassline_Selector>', document.getElementById('basslineSelect').value);
    proc_text_replaced = proc_text_replaced.replaceAll('<reverb_Value>', document.getElementById('reverbSlider').value);
    // handles for bpm and cycle values
    proc_text_replaced = proc_text_replaced.replaceAll('<bpm_Value>', document.getElementById('bpmSlider').value);
    proc_text_replaced = proc_text_replaced.replaceAll('<secpm_Value>', document.getElementById('secSlider').value);
    proc_text_replaced = proc_text_replaced.replaceAll('<cycle_Value>', document.getElementById('cycleSlider').value);

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