import { useState } from "react";
import { donateToCampaign, getAllCampaigns, withdraw } from "../solana";

const Card = ({ data, setCards }) => {
    const [amount, setAmount] = useState(0);
    const onDonate = async (e) => {
        e.preventDefault();
        await donateToCampaign(data.id, amount);
        let newCards = await getAllCampaigns();
        setCards(newCards);
    }
    const onWithdraw = async (e) => {
        e.preventDefault();
        try {
            await withdraw(data.id, amount);
            alert('Withdraw successful!');
        } catch (e) {
            console.log(e);
            alert("only admin can withdraw");
        }
        let newCards = await getAllCampaigns();
        setCards(newCards);

    }
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
                                        <input type="text" name="amount" placeholder="Amount to donate" onChange={(e) => setAmount(e.target.value)} />
                                    </div>
                                </div>
                                <div className="column">
                                    <button className="ui button" type="submit" onClick={(e) => onDonate(e)} >Donate</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div>Only admin can withdraw </div>
                    <form className="ui form container">
                        <div className="ui grid">
                            <div className="row">
                                <div className="column thirteen wide">
                                    <div className="field">
                                        <input type="text" name="amount" placeholder="Amount to withdraw" onChange={(e) => setAmount(e.target.value)} />
                                    </div>
                                </div>
                                <div className="column">
                                    <button className="ui button" type="submit" onClick={(e) => onWithdraw(e)} >Withdraw</button>
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