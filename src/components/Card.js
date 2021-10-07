
const Card = ({ data }) => {
    return (
        <div>
            <div className="ui card fluid">
                <div className="image">
                    <img src={data.image} />
                </div>
                <div className="content">
                    <div className="header">{data.title}</div>

                    <div>
                        <span>Raised: {data.amount}</span>
                    </div>
                    <p>{data.description}</p>

                    <form className="ui form container">
                        <div className="ui grid">
                            <div className="row">
                                <div className="column thirteen wide">
                                    <div className="field">
                                        <input type="text" name="first-name" placeholder="First Name" />
                                    </div>
                                </div>
                                <div className="column">
                                    <button className="ui button" type="submit">Donate</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Card;