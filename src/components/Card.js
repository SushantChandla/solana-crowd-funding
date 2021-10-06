
const Card = ({ data }) => {
    return (
        <div>
            <div className="ui card fluid">
                <div class="image">
                    <img src={data.image} />
                </div>
                <div className="content">
                    <div className="header">{data.title}</div>

                    <div>
                        <span>Raised: {data.amount}</span>
                    </div>
                    <p>{data.description}</p>


                    <form class="ui form container">
                        <div class="ui grid">
                            <div className="row">
                                <div className="column thirteen wide">
                                    <div className="field">
                                        <input type="text" name="first-name" placeholder="First Name" />
                                    </div>
                                </div>
                                <div className="column">
                                    <button class="ui button" type="submit">Donate</button>
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