import {useState} from 'react'
import './components/Wallet.css';
import './Compoents/WalletBoard.jsx';


function Wallet() {
    const [inputValue, setInputValue] =useState('')
  const [walletList, setWalletList]=useState([]) 
  const addItem =() => { 
    setWalletList([...walletList, inputValue])
  }

    return (
      <>
      <input value={inputValue} type="text" onChange={(event)=>setInputValue(event.target.value)} />
      <button onClick={addItem}>추가</button>
       
       <WalletBoard walletList={walletList} />
      </>
    )
  }
  
  export default Wallet;