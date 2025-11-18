# Strudel REPL React Application

## Overview
This is a React and JavaScript based application that provides both a backend preprocessor and a front end intuitive control interface for the Strudel.cc library, a browser-based live music coding platform. The application builds upong Strudel's existing capabilities by providing an intuitive UI for real-time music editing.

## Project Structure
```
src/
├── App.js                      # Main application component
├── components/
│   ├── controls.js             # UI controls for music parameters
│   ├── editorArea.js           # Code editor display toggle
│   ├── visualiser.js           # D3 audio visualization
│   ├── textProcessor.js        # Template preprocessing logic
│   └── settingsManager.js      # JSON save/load functionality
├── tunes.js                    # Music composition template
└── console-monkey-patch.js     # Audio data interception
```

## Important: Branch Information

**For marking/assessment purposes, please use the `aaron_dev_final` branch for running the application.**
but view both `aaron_dev` and `aaron_dev_final` for complete git history.

This branch contains a clean version of all project features without historical build artifacts that may cause checkout issues on Windows.

Note: Again, branch: `aaron_dev` contains a substantial amount of git history covering most of the developemental phase of the project however contains Windows-incompatible paths from wrongly commited build artifacts. As such please view both `aaron_dev` and `aaron_dev_final` for complete history but only run the application on `aaron_dev_final`.

## Setup
1. Clone repository
2. cd into project directory
3. switch to branch `aaron_dev_final`
4. run `npm install`
5. run `npm start`
6. navigate to `http://localhost:3000` or other port depending on your port configurations and availability.

## Control and Functionalities

### Playback Controls
- **Play** - Starts audio playback
- **Stop** - Stops audio playback
- **Preprocess** - Processes template code with current control values
- **Proc & Play** - Both preprocesses and plays

### JSON Handling
- **Save** - Downloads current control configuration and saves as a JSON file
- **Load** - Uploads and appl2ies previously saved JSON configuration (auto-plays after loading)

### Bassline (p1)
- **ON/HUSH** - Toggle bassline on or off
- **Bassline Style** - Switch between two different bassline patterns

### Arpeggiator (p2)
- **ON/HUSH** - Toggle arpeggiator on or off
- **Arpeggio Selector** - Choose between the two provided arpeggio patterns

### Drums
- **Enable Drums** - Toggle drum tracks on or off
- **Drum Pattern** - Select from sparse, medium, or complex drum patterns

### Effect Sliders
- **Reverb** - Adjust reverb amount (0.0 to 1.0)
- **BPM** - Control tempo (60 to 200 beats per minute)
- **Beats per Cycle** - Set cycle length (1 to 8 beats)
- **Seconds per Minute** - Timing adjustment (30 to 120)

## Features

### JSON Save/Load
Settings can be exported and imported as JSON files. States of all control values are saved within the files, the likes of which include:
- Radio button states (bassline, arpeggiator on/off)
- Dropdown selections (patterns, styles)
- Checkbox states (drums enable)
- All slider values

### D3 Visualization
Real-time audio visualization displays gain values from the Strudel audio engine. The graph shows:
- Live audio output levels
- Time-series data (last 50 data points)
- Axis labels for gain and time

### Preprocessing System
Template-based code generation system that:
- Replaces placeholders (e.g., `<bpm_Value>`, `<p1_Radio>`) dynamically with actual control values
- Dynamically executes strudel code
- Updates in real-time as controls change

## Usage Notes

### For Markers
- The "Switch to Editor View" button toggles between preprocessor template and live code editor
- All controls trigger auto-preprocessing and update the music in real-time
- JSON files are timestamped for easy identification

### Known Quirks
- Audio requires user interaction before first playback
- 100ms delay after loading JSON settings ensures DOM updates complete before preprocessing
- Visualiser shows raw gain values without smoothing for more accurate peak representation
- the visualiser is also visibly jittery, with added smoothing it will impact peak representation

## Demo Video
- the video is located in the root folder named `Strudel_REPL_Demo_Aaron.mp4`

## Music Attribution
Original composition remixed and adapted from:
- **Algorave Dave's Stranger Things Theme**
- Modified with additional patterns, controls, and preprocessing system

## AI Usage
[Document any AI tools used and their specific prompts/outputs here]

Use 1:
- Tool: ChatGPT (OpenAI)
- Purpose: Code refactoring
- Input: "could you help me to refactor this section to include ternaries for a more functional programming approach?"
- Output: provided an output with examples of how to refactor the editorArea.js with turnaries to make the code more easily readible and succinct.

Use 2:
- Tool: ChatGPT (OpenAI)
- purpose: README project structure diagram
- Input: "could you help me to create a project structure diagram for my README.md based on my src folder contents?" (sends paint png detailing the diagram i want to show)
- Output: provided the project structure diagram in markdown format as shown below.

Use 3:
- Tool: ChatGPT (OpenAI)
- Purpose: documentation grammar check and flow
- Input: "could you help me to proofread and improve the flow of my README.md documentation for my project?
- Output: provided various suggestions and improvements to the overall flow and grammatical structure of the README.md documentation.

Use 4:
- Tool: ChatGPT (OpenAI)
- Purpose: D3 visualiser code generation (axis labels and data output parsing)
- Input: "could you help me add axis to my visualiser? with x being the samples and y being the gain?"
- Output: provided code snippets and suggestions on how to implement axis labels and data output parsing for the D3 visualiser component.

## Technologies Used
- React 18
- Strudel REPL (Web Audio version)
- D3.js for visualization
- Bootstrap 5 for UI components
- `Visual Studio` and `jetBrains Rider` for code editing