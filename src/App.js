import React, { useState } from 'react';

import Header from './components/Header';
import Card from './components/Card';
import Form from './components/Form';

const App = () => {
  const [route, setRoute] = useState(0);

  const cards = [];

  return (
    <div className="ui container">
      <Header setRoute={setRoute} />
      {route === 0 ?
        <Card data={{ title: "My campaign", description: "lorem ipsum loreumsndjsdnjsncjnisjncsdjcdnscijsdncijsdncsjdcndsijcndsij", amount: "1000 SOL", image: "https://media-exp1.licdn.com/dms/image/C4E1BAQGgT_vYaeRzyA/company-background_10000/0/1563203448078?e=2159024400&v=beta&t=cb5W5IzPhVdKqZamLCFbUDW-Am1m83nvNz92PHt67Bc" }} />
        :
        <Form />
      }
    </div>
  );
}

export default App;
