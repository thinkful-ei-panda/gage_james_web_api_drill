/* eslint-disable strict */
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));


/**
 * Create a route handler function on the path /sum that accepts two query parameters named a and b and find the sum of the two values. Return a string in the format "The sum of a and b is c". Note that query parameters are always strings so some thought should be given to converting them to numbers.
 * */


app.get('/sum', (req, res) => {

  //   const a = req.query.a; 
  //   const b = req.query.b;
  //same as above but shorthand destructuring^^
  const { a, b } = req.query;
  const c = Number(a) + Number(b);

  if(isNaN(Number(a)) || isNaN(Number(b))) {
    return res.status(400).send('hey send us a number fool');
  }

  const response = `The sum of ${a} and ${b} equals ${c}`;
  
  res.send(response);
});

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

app.get('/cipher', (req, res) => {

  const { text, shift } = req.query;
  const word = text.split('');
  const cipherKey = Number(shift);
  const temp = [];


  if(isNaN(cipherKey)) {
    return res.status(400).send('hey send us a number fool');
  }

  //   for (let i=0; i<text.length; i++) {
  //     temp.push(String.fromCharCode((text.codePointAt(i) + cipherKey)));
  //   }

  word.map((l)=>{
    let charCode = (l.charCodeAt() + cipherKey);

    if ((charCode - cipherKey) >= 97){
      if ((charCode ) > 122 ){
        temp.push(String.fromCharCode((charCode ) - 26));
      }else{
        temp.push(String.fromCharCode(charCode ));
      }
    }else if ((charCode - cipherKey) >= 65){
      if ((charCode ) > 90 ){
        temp.push(String.fromCharCode((charCode ) - 26));
      }else{
        temp.push(String.fromCharCode(charCode ));
      }
    }
    
  });

  const response = `new cipher equals ${temp.join('')}`;
  
  res.send(response);
} );

  




app.listen(8000, () => console.log('server is running on port 8000')); 
//listens for entry into web browser adddress bar