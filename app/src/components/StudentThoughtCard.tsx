const StudentThoughtCard = (item: any) => {
    return (
        <div className="item">
            <div className="fcrse_4 mb-20">
                <div className="say_content">
                    <p>{item.thought}</p>
                </div>
                <div className="st_group">
                    <div className="stud_img">
                        <img src={item.avatar} alt="avatar" />
                    </div>
                    <h4>{item.name}</h4>
                </div>
            </div>
        </div>
    );
};

export default StudentThoughtCard;
