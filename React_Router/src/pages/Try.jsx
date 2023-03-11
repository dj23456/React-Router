import React from 'react'

function Try() {
  const addnum = () => {
    //var value = document.querySelector('.add')[0].value;
   

    var numadd = document.getElementsByClassName("add")[0].value;
    console.log(numadd);
    var numque = document.getElementsByClassName('que')[0].value;
    var total = (numadd * numque);
    var discount = document.getElementsByClassName('dis')[0].value / 100;
    var dis = total - (total * discount);
    document.getElementsByClassName('total')[0].value = dis.toFixed(2);
  }




  function duplicate() {

    var original = document.getElementById("duplicater");
    var i = 0;
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "duplicater" + ++i;
    original.parentNode.appendChild(clone);
  }


  return (
    <>

      <div id='duplicater'>
        <div>
          <input type="txt" placeholder="value" name="value" />&nbsp;
          <input type="number" placeholder="price" name="price" class="add" onKeyUp={addnum} />&nbsp;
          <input type="number" placeholder="que" name="que" class="que" onKeyUp={addnum}  />
          <input type="number" placeholder="discount" name="discount" class="dis" onKeyUp={addnum} />&nbsp;=&nbsp;
          <input type="txt" name="total" class='total' />&nbsp;&nbsp;
          <button type='submit' name='btn' id='button' style={{ 'background-color': 'lightblue', 'padding': '8px' }}
           onClick={duplicate} >+</button>
        </div>
      </div>
      

    </>
  )
}

export default Try