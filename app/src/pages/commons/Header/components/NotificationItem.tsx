export const NotificationItem = (props: any) => {
    return (
        <a href={props.href} className="channel_my item">
            <div className="profile_link">
                <img src={props.avatar} alt="" />
                <div className="pd_content">
                    <h6>{props.name}</h6>
                    <p>
                        Like Your Comment On Video <strong>How to create sidebar menu</strong>.
                    </p>
                    <span className="nm_time">{props.time}</span>
                </div>
            </div>
        </a>
    );
};
