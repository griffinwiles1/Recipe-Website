
import './index.css';
import store from './lib/store';

import { Provider } from 'react-redux';
import TaskInboxScreen from './components/TaskInboxScreen';

function App() {
 return (
  <Provider store={store}>
    <TaskInboxScreen />
  </Provider>
 );
}
export default App;