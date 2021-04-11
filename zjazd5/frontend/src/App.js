import './App.css';
import {useState} from "react";
import Post from './Post';
import MyForm from './MyForm';

function App() {

  const [ initialValue, setInitialValue ] = useState(1234);

  const handleInitialValue = (event) => {
    setInitialValue(event.target.value);
  }

  return (
    <div>
      {initialValue}
      <br />

      <input onChange={handleInitialValue}/>

      <Post noPosts={initialValue} changeParentHandler={setInitialValue}/><br />

      <MyForm/>
    </div>
  );
}

export default App;
