const connection = require('./connection');
const express = require('express');
const bodyParser= require('body-parser');

var app = express();

 app.use(bodyParser.json());

 app.get('/contacts',(req,res)=>{
    connection.query('SELECT c.id,c.firstName,c.lastNAme,p.phone FROM contact c LEFT JOIN phonenumbers p ON c.id = p.contactid'
        ,(err,rows)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            // console.log(rows);
            res.send(rows)
        }
    });

})

 app.get('/contacts/:id',(req,res)=>{
    connection.query('SELECT c.id,c.firstName,c.lastNAme,p.phone FROM contact c LEFT JOIN phonenumbers p ON c.id = p.contactid where id=?',[req.params.id],(err,rows)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            // console.log(rows);
            res.send(rows)
        }
    });
 })
 
 app.delete('/contacts/:id',(req,res)=>{
    
    connection.query('DELETE FROM phonenumbers WHERE contactid = ?', [req.params.id]);
    connection.query('DELETE FROM contact where id=?',[req.params.id],(err,rows)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            // console.log(rows);
            res.send(rows)
        }
    });
 })

 app.post('/contacts',(req,res)=>{
    
    const { id,firstName, lastName } = req.body
   
    connection.query('INSERT INTO CONTACT(id,firstname,lastname) VALUES(?)',[id,firstName,lastName],(err,rows)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            // console.log(rows);
            res.send(rows)
        }
    });
 })

 // Add a new phone number to a contact
app.post('/contacts/:id/phone',(req, res) => {
    const contactId = req.params.id;
    const { phoneNumber } = req.body;
  
    try {
      const [result] = connection.query('INSERT INTO phone_numbers (contact_id, phone_number) VALUES (?, ?)', [contactId, phoneNumber]);
  
      if (result.affectedRows === 0) {
        console.log("contact not found")
      } else {
        console.log("phone added succesfully")
      }
    } catch (error) {
      console.error(error);
      
    }
  });
  
  // Get phone numbers for a contact
  app.get('/contacts/:id/phone', (req, res) => {
    const contactId = req.params.id;
  
    try {
      const [phoneNumbers] =connection.query('SELECT * FROM phonenumbers WHERE contactid = ?', [contactId]);
      res.json(phoneNumbers);
    } catch (error) {
      console.error(error);
     
    }
  });
  
  // Delete a phone number
  app.delete('/contacts/:contactId/phone/:phoneNumberId',(req, res) => {
    const contactId = req.params.contactId;
    const phoneNumberId = req.params.phoneNumberId;
  
    try {
      const [result] = connection.query('DELETE FROM phonenumbers WHERE contactid = ? AND id = ?', [contactId, phoneNumberId]);
  
      if (result.affectedRows === 0) {
        console.log( 'Phone number not found' );
      } else {
        console.log('Phone number deleted successfully');
       
      }
    } catch (error) {
      console.error(error);
     
    }
  });
  

 app.listen(3000,()=>console.log("server is running on port no 3000")

 )