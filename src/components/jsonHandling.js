// this module manages saving and loading of user settings for the music app (sliders/checkboxes/dropdown)

// firstly retrieves current settings from the DOM
export function getCurrentSettings() {
    // bassline controls
    const p1Radio = document.getElementById('p1RadioDefault1');
    let p1State = 'off';
    if (p1Radio && p1Radio.checked) {
        p1State = 'on';
    }

    const basslineSelect = document.getElementById('basslineSelect');
    let basslinePattern = '0';
    if (basslineSelect && basslineSelect.value) {
        basslinePattern = basslineSelect.value;
    }

    // arpeggiator controls
    const p2Radio = document.getElementById('p2RadioDefault1');
    let p2State = 'off';
    if (p2Radio && p2Radio.checked) {
        p2State = 'on';
    }

    const arpSelect = document.getElementById('arpSelect');
    let arpPattern = '0';
    if (arpSelect && arpSelect.value) {
        arpPattern = arpSelect.value;
    }

    // drums
    const drumsCheck = document.getElementById('drumsCheck');
    let drumsEnabled = false;
    if (drumsCheck && drumsCheck.checked) {
        drumsEnabled = drumsCheck.checked;
    }

    const patternSelect = document.getElementById('patternSelect');
    let drumPattern = '0';
    if (patternSelect && patternSelect.value) {
        drumPattern = patternSelect.value;
    }

    // sliders
    // reverb
    const reverbSlider = document.getElementById('reverbSlider');
    let reverbValue = '0.6';
    if (reverbSlider && reverbSlider.value) {
        reverbValue = reverbSlider.value;
    }
    
    // volume
    const volumeSlider = document.getElementById('volumeSlider');
    let volumeValue = '1.0';
    if (volumeSlider && volumeSlider.value) {
        volumeValue = volumeSlider.value;
    }

    // bpm
    const bpmSlider = document.getElementById('bpmSlider');
    let bpmValue = '140';
    if (bpmSlider && bpmSlider.value) {
        bpmValue = bpmSlider.value;
    }

    // seconds per minute
    const secSlider = document.getElementById('secSlider');
    let secValue = '60';
    if (secSlider && secSlider.value) {
        secValue = secSlider.value;
    }

    // beats per cycle
    const cycleSlider = document.getElementById('cycleSlider');
    let cycleValue = '4';
    if (cycleSlider && cycleSlider.value) {
        cycleValue = cycleSlider.value;
    }

    // output of the json file
    // also the expected input when uploading a file.
    return {
        p1State: p1State,
        basslinePattern: basslinePattern,
        p2State: p2State,
        arpPattern: arpPattern,
        drumsEnabled: drumsEnabled,
        drumPattern: drumPattern,
        reverbValue: reverbValue,
        volumeValue: volumeValue,
        bpmValue: bpmValue,
        secValue: secValue,
        cycleValue: cycleValue,
        savedAt: new Date().toISOString(),
    };
}

// now to apply given settings to the DOM
// this will in essence set the sliders, checkboxes and dropdowns to what is determined by the imported JSON's values
export function applySettings(settings) {
    if (!settings) {
        return;
    }

    // bassline controls
    // both basslines
    if (settings.p1State === 'on') {
        const p1On = document.getElementById('p1RadioDefault1');
        if (p1On) {
            p1On.click();
        }
    } else {
        const p1Off = document.getElementById('p1RadioDefault2');
        if (p1Off) {
            p1Off.click();
        }
    }
    
    // baseline patterns selection
    if (settings.basslinePattern !== undefined) {
        const basslineSelect = document.getElementById('basslineSelect');
        if (basslineSelect) {
            basslineSelect.value = settings.basslinePattern;
        }
    }

    // arpeggiator controls
    // both arpeggios
    if (settings.p2State === 'on') {
        const p2On = document.getElementById('p2RadioDefault1');
        if (p2On) {
            p2On.click();
        }
    } else {
        const p2Off = document.getElementById('p2RadioDefault2');
        if (p2Off) {
            p2Off.click();
        }
    }
    // arpeggio pattern
    if (settings.arpPattern !== undefined) {
        const arpSelect = document.getElementById('arpSelect');
        if (arpSelect) {
            arpSelect.value = settings.arpPattern;
        }
    }

    // drum controls
    // checkbox
    if (settings.drumsEnabled !== undefined) {
        const drumsCheck = document.getElementById('drumsCheck');
        if (drumsCheck) {
            drumsCheck.checked = settings.drumsEnabled;
        }
    }
    // pattern dropdown
    if (settings.drumPattern !== undefined) {
        const patternSelect = document.getElementById('patternSelect');
        if (patternSelect) {
            patternSelect.value = settings.drumPattern;
        }
    }

    // relevant sliders within the app
    const sliders = [
        { id: 'reverbSlider', value: settings.reverbValue },
        { id: 'volumeSlider', value: settings.volumeValue },
        { id: 'bpmSlider', value: settings.bpmValue },
        { id: 'secSlider', value: settings.secValue },
        { id: 'cycleSlider', value: settings.cycleValue }
    ];

    // apply slider values
    sliders.forEach(function(sliderConfig) {
        if (sliderConfig.value !== undefined) {
            const slider = document.getElementById(sliderConfig.id);
            if (slider) {
                slider.value = sliderConfig.value;
            }
        }
    });
}

// downloads current settings as a JSON file
export function downloadSettings() {
    const settings = getCurrentSettings();
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `strudel-settings-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// uploads settings from a JSON file and applies them
export function uploadSettings(event, onLoadCallback) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const settings = JSON.parse(e.target.result);
            applySettings(settings);
            alert('✅ Settings loaded successfully!');

            // if this is successful, call the provided callback to re-process the code and play
            if (onLoadCallback) {
                setTimeout(function() {
                    onLoadCallback();
                    // small delay applied to make sure DOM updates are registered before processing
                    // not reactive so may need to exercise caution here
                }, 100);
            }
        } catch (error) {
            alert('❌ Error loading settings: ' + error.message);
        }
    };
    reader.readAsText(file);
}