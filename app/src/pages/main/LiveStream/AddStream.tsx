import AppFooter from '../../../Layouts/AppFooter';

const AddStream = () => {
    return (
        <>
            <div className="sa4d25">
                <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="section3125 stream_tabs">
                                <ul className="nav nav-tabs slive_tabs justify-content-center" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="add-streaming-tab"
                                            data-toggle="tab"
                                            href="#add-straming"
                                            role="tab"
                                            aria-controls="add-straming"
                                            aria-selected="true"
                                        >
                                            Add Streaming
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="setting-tab"
                                            data-toggle="tab"
                                            href="#setting"
                                            role="tab"
                                            aria-controls="setting"
                                            aria-selected="false"
                                        >
                                            Setting
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="add-straming" role="tabpanel">
                                        <div className="add_stream_content">
                                            <h4 className="strm_title">Connect your live stream to the Live API</h4>
                                            <div className="sf475">
                                                Use live-streaming software or a hardware encoder. <a href="#">Learn More</a>
                                            </div>
                                            <div className="stm_key">
                                                Preview your broadcast with a stream key or paired encoder.
                                            </div>
                                            <div className="live_form">
                                                <div className="group-form">
                                                    <label>Server URL*</label>
                                                    <input
                                                        className="_dlor1"
                                                        type="text"
                                                        data-testid="server_url"
                                                        placeholder="Stream URL"
                                                        disabled
                                                        value="rtmps://live-api-s.edututs+.com:443/rtmp/"
                                                    />
                                                    <button className="_6tf7s" type="submit" value="1">
                                                        Copy
                                                    </button>
                                                </div>
                                                <div className="group-form">
                                                    <label>Persistent stream key*</label>
                                                    <input
                                                        className="_dlor1"
                                                        type="text"
                                                        data-testid="server_url"
                                                        placeholder="Stream URL"
                                                        disabled
                                                        value="592030151361629?s_bl=1&s_ps=1&s_sw=065&s_vt=api-s&a=AbzB7xYk7XdnKpBf"
                                                    />
                                                    <button className="_6tf7s" type="submit" value="1">
                                                        Copy
                                                    </button>
                                                </div>
                                                <button className="_145d1">
                                                    <i className="uil uil-video"></i>Go Live
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="setting" role="tabpanel">
                                        <div className="add_stream_content">
                                            <h4 className="strm_title1">Live Streaming Setting</h4>
                                            <div className="ui toggle checkbox _1457s2">
                                                <input type="checkbox" name="stream_ss1" checked />
                                                <label>Publish this as a continuous live video</label>
                                            </div>
                                            <div className="ui toggle checkbox _1457s2">
                                                <input type="checkbox" name="stream_ss2" />
                                                <label>Allow embedding </label>
                                            </div>
                                            <div className="ui toggle checkbox _1457s2">
                                                <input type="checkbox" name="stream_ss3" />
                                                <label>Unpublish after live video ends</label>
                                            </div>
                                            <div className="ui toggle checkbox _1457s2">
                                                <input type="checkbox" name="stream_ss4" checked />
                                                <label>Allow viewers to rewind</label>
                                            </div>
                                            <div className="ui toggle checkbox _1457s2">
                                                <input type="checkbox" name="stream_ss5" checked />
                                                <label>End broadcast when stream ends</label>
                                            </div>
                                            <div className="ui toggle checkbox _1457s2">
                                                <input type="checkbox" name="stream_ss6" />
                                                <label>Publish as a test broadcast</label>
                                            </div>
                                            <div className="ui toggle checkbox _1457s2">
                                                <input type="checkbox" name="stream_ss7" />
                                                <label>Turn off live commentary</label>
                                            </div>
                                            <button className="_145d1">Save changes &amp; Go Live</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </>
    );
};

export default AddStream;
