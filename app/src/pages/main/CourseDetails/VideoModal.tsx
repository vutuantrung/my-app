const VideoModal = () => {
    return (
        <div className="modal vd_mdl fade" id="videoModal" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="modal-body">
                        <iframe
                            src="https://www.youtube.com/embed/Ohe_JzKksvA"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
