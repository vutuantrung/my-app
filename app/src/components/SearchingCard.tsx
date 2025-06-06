function displayName(name: string) {
    return name
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}
function displayNationalFlag(nationName: string) {
    return <img style={{ height: '20px', paddingLeft: '10px' }} src={require(`../assets/images/nationalFlag/${nationName}.svg`)} alt={nationName} />;
}

const SearchingCard = (item: any) => {
    return (
        <div key={item.id} style={{ margin: '10px' }}>
            <div className="fcrse_1 mt-30" style={{ display: 'flex', flexDirection: 'row', width: 'auto' }}>
                <div className="fcrse_img" style={{ width: 'auto', padding: '5px' }}>
                    <img
                        style={{ height: '230px', width: '200px', objectFit: 'cover' }}
                        src={`https://www.javdatabase.com/idolimages/full/${item.name}.webp`}
                        alt=""
                    />
                </div>
                <div className="fcrse_content" style={{ width: 'auto', minWidth: '250px', padding: '10px' }}>
                    <div className="eps_dots more_dropdown" style={{ paddingTop: '5px' }}>
                        <a href="/#">
                            <i className="uil uil-ellipsis-v"></i>
                        </a>
                        <div className="dropdown-content">
                            {!item.saved ? (
                                <span>
                                    <i className="uil uil-heart"></i>Save
                                </span>
                            ) : null}
                            <span>
                                <i className="uil uil-ban"></i>Not Interested
                            </span>
                        </div>
                    </div>
                    {/* <div className="vdtodt">
                        <span className="vdt14">{`${item.views} views`}</span>
                        <span className="vdt14">{`${item.publishedDate} ago`}</span>
                    </div> */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '40px' }}>
                        <h2>{displayName(item.name)}</h2>
                    </div>
                    <a href="/#" className="crse-cate">
                        {item.category}
                    </a>
                    <div className="auth1lnkprce" style={{ marginTop: '5px' }}>
                        <p style={{ display: 'flex', alignItems: 'center' }}>
                            <strong>Country:</strong> {displayNationalFlag(item.country)}
                        </p>
                        <p>
                            <strong>Height:</strong> {item.height} cm
                        </p>
                        <p>
                            <strong>Measurement:</strong> {item.measurement}
                        </p>
                        <p>
                            <strong>Date of Birth:</strong> {item.dob}
                        </p>
                        <p>
                            <strong>Metadata:</strong> {item.metadata}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchingCard;
