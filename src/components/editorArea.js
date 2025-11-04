export default function EditorArea() {
    return (
        <>
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
            </div>
        </>
    );
}