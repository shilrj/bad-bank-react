function Deposit(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState(''); 
  const [deposit, setDeposit]       = React.useState('');
  const [total,setTotal]            = React.useState(0);
  const ctx = React.useContext(UserContext);  

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function checkNumber(field, label) {
    if (isNaN(field)) {
      setStatus('Alert: not a number : ' + label + 'failed, Deposit again');
    if (field < 0) 
        setStatus('Alert: negative number: ' + label + 'failed, Deposit again');
      return false;
    }
    return true;
  }

  function handleDeposit(){
    console.log(deposit);
    if (!validate(deposit,    'deposit'))    return;
    if (!checkNumber(deposit,    'deposit'))    return;
    total = Number(deposit);
    setDeposit(`success! you have deposited ${deposit}$`);
    setTotal(total);
    ctx.users.push({deposit,balance:100});
    setShow(false);
  }

  function clearForm(){
    setName('');
    setDeposit('');
    setPassword('');
    setShow(true);
  }

  
  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      body={show ? (  
              <>
              
              Deposit Amount<br/>
              <input type="input" className="form-control" id="deposit" placeholder="Enter deposit" value={deposit} onChange={e => setDeposit(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button> <br/>
              New Balance ${total}  <br/>             
              </>
            ):(
              <>                        
              <button type="submit" className="btn btn-light" onClick={clearForm}>Deposit Received</button>
              </>
            )}
    />
  );   
}