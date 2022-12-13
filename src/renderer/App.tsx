/* eslint-disable jsx-a11y/anchor-is-valid */
// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { defaultTheme } from '@adobe/react-spectrum';
import { Provider } from '@react-spectrum/provider';
import React from 'react';

import Home from './components/home/Home';

const App = () => {
  // let [userName, setUserName] = React.useState('');
  // let [password, setPassword] = React.useState('');
  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <Home />
    </Provider>
  );
};

export default App;
// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<App />} />
//       </Routes>
//     </Router>
//   );
// }
