
import './index.css';
import store from './lib/store';

import { Provider } from 'react-redux';
import TaskInboxScreen from './components/TaskInboxScreen';

/*----- JavaScript Tips -----
  
  --- Ternary Operators ---
 
  - Nesting -
    function example() {
      return condition1 ? value1
        : condition2 ? value2
        : condition3 ? value3
        : value4;
    }

*/

function App() {
 return (
  <Provider store={store}>
    <section className="bodyFlex">
      <TaskInboxScreen />
    </section>
  </Provider>
 );
}
export default App;