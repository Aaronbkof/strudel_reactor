export default function EditorArea() {
    return (
        <div>
            <div className="row">
                <div className="col-md-12" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
                    <textarea className="form-control" rows="15" id="proc" ></textarea>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                    <div id="editor" />
                    <div id="output" />
                </div>
            </div>
        </div>
    );
}