import './firebase/config';
import { ToastContainer } from 'react-toastify';

import Links from './components/Links'
import LinkForm from './components/LinkForm';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
      <Links/>
      <ToastContainer />
    </div>
  );
}

export default App;
