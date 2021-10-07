import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import Card from './components/Card';
import Form from './components/Form';
import { getAllCampaigns } from "./solana";
const App = () => {
  const [route, setRoute] = useState(0);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getAllCampaigns().then((val) => {
      setCards(val);
      console.log(val);
    });
  }, []);
  return (
    <div className="ui container">
      <Header setRoute={setRoute} />
      {route === 0 ?
        <div>{
          cards.map((e, idx) => (
            <Card
              key={e.pubId.toString()}
              data={{
                title: e.name,
                description: e.description,
                amount: (e.amount_donated).toString(),
                image: e.image_link,
                id: e.pubId,
              }}
              setCards={setCards} />
          ))
        }
        </div>
        :
        <Form setRoute={(e) => {
          setRoute(e);
          getAllCampaigns().then((val) => {
            setCards(val);
          });
        }} />
      }
    </div>
  );
}

export default App;
