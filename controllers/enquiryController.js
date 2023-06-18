'use strict';

const Enquiries = require('../models/enquiry');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;
const Credentials = require('../models/credentails');


const getEnquiries =async (req, res, next) => {

    var offset = 0, count={$exists: true}, message;
    var currentTime = new Date()
    var currentYear;
    var month,paymentType,name,phone,id;
    var status = {$exists: true};

    if(req.query.offset){
        offset = req.query.offset
    }
    if(req.query.count){
        count = req.query.count
    }
    if(req.query.status){
        status = req.query.status
    }
    paymentType = req.query.paymentType ? req.query.paymentType : {$exists: true};
    name = req.query.name ? req.query.name : {$exists: true};
    phone = req.query.phone ? req.query.phone : {$exists: true};
    id = req.query.id ? ObjectId(""+req.query.id+"") : {$exists: true};


    if(req.query.month){
        month = req.query.month
    }else{
        month = currentTime.getMonth() + 1
        if(month<10)
        month = '0'+month;
    }
    if(req.query.year){
        currentYear = req.query.year
    }else{
        currentYear = new Date().getFullYear().toString();
    }
   Enquiries.find({ status: status, payment_status: paymentType, phone: phone, name: name, _id: id }).limit(count).skip(offset)
    .then(result => {
        var data = [];


        result.forEach(record=>{

           if(record.entryDate.substring(3, 5) === month && record.entryDate.substring(6, 10) === currentYear ){
                data.push(record);
            }
        })
        if(data.length>0){
            message = 'Enquiries fetched successfully!';
        }else{
            message = 'No results found!';
        }
        res.status(200).json({
            success:true, 
            totalCount:data.length,
            message:message,
            result:data
        });
     
    }).catch(err=>{
        res.status(500).json({
            success:false, 
            message: err,
            result:[]
        }); 
      }) 
}

const getAllEnquiries =async (req, res, next) => {

    var offset = 0, count={$exists: true}, message;
    var paymentType,name,phone,id;
    var status = {$exists: true};

    if(req.query.offset){
        offset = req.query.offset
    }
    if(req.query.count){
        count = req.query.count
    }
    if(req.query.status){
        status = req.query.status
    }
    paymentType = req.query.paymentType ? req.query.paymentType : {$exists: true};
    name = req.query.name ? req.query.name : {$exists: true};
    phone = req.query.phone ? req.query.phone : {$exists: true};
    id = req.query.id ? ObjectId(""+req.query.id+"") : {$exists: true};


   Enquiries.find({ status: status, payment_status: paymentType, phone: phone, name: name, _id: id }).limit(count).skip(offset)
    .then(data => {

        if(data.length>0){
            message = 'Enquiries fetched successfully!';
        }else{
            message = 'No results found!';
        }
        res.status(200).json({
            success:true, 
            totalCount:data.length,
            message:message,
            result:data
        });
     
    }).catch(err=>{
        res.status(500).json({
            success:false, 
            message: err,
            result:[]
        }); 
      }) 
}

//posting new record
const postEnquiries =async (req, res, next) => {


    if(req.body.phone&&req.body.service_value&&req.body.brand_value&&req.body.entryDate){

    }else{
        res.status(500).json({
            success:false, 
            message: 'Phone/typeOfService/brand/EntryDate missing!',
            result:[]
        });    }

        var enquiry = {
              address: req.body.address?req.body.address:"",
              brand_value: req.body.brand_value,
              email:req.body.email?req.body.email:"",
              entryDate: req.body.entryDate,
              message: req.body.message?req.body.message:"",
              name: req.body.name?req.body.name:"",
              phone: req.body.phone,
              service_value:req.body.service_value ,
              staffName: req.body.staffName?req.body.staffName:"", 
              status: req.body.status?req.body.status:"",
              completedDate: req.body.completedDate?req.body.completedDate:"",
              deliveryDate: req.body.deliveryDate?req.body.deliveryDate:"",
              payment_status: req.body.payment_status?req.body.payment_status:"",
              pcbType: req.body.pcbType?req.body.pcbType:"",
              price: req.body.price?req.body.price:"",
              qrCodeURL: req.body.qrCodeURL?req.body.qrCodeURL:"",
              reason: req.body.reason?req.body.reason:"",
              technician: req.body.technician?req.body.technician:""
        }

    Enquiries.insertMany(enquiry)
    .then(result => {
        res.status(200).json({
            success:true, 
            message: 'Enquiry added successfully',
            result:result
        });

    }).catch(err=>{
        res.status(500).json({
            success:false, 
            message: err,
            result:[]
        }); 
      })

 
}

const patchEnquiries =async (req, res, next) => {
    

        Enquiries.updateOne(
            {"_id" : ObjectId(""+req.params.id+"")},
            {$set: { 
              address: req.body.address,
              brand_value: req.body.brand_value,
              email:req.body.email,
              entryDate: req.body.entryDate,
              message: req.body.message,
              name: req.body.name,
              phone: req.body.phone,
              service_value:req.body.service_value ,
              staffName: req.body.staffName, 
              status: req.body.status,
              completedDate: req.body.completedDate,
              deliveryDate: req.body.deliveryDate,
              payment_status: req.body.payment_status,
              pcbType: req.body.pcbType,
              price: req.body.price,
              qrCodeURL: req.body.qrCodeURL,
              reason: req.body.reason,
              technician: req.body.technician
            }}).then(result => {

        res.status(200).json({
            success:true, 
            message: 'Enquiry updated successfully',
            result:result
        });
     
    }).catch(err=>{
        res.status(500).json({
            success:false, 
            message: err,
            result:[]
        }); 
      })
 
}

const deleteEnquiry =async (req, res, next) => {
    

Enquiries.deleteOne(
        {"_id" : ObjectId(""+req.params.id+"")}).then(result => {

    res.status(200).json({
        success:true, 
        message: 'Enquiry deleted successfully',
        result:result
    });
}).catch(err=>{
    res.status(500).json({
        success:false, 
        message: err,
        result:[]
    }); 
  })

}

const sendMessage =async (req, res, next) => {
    
        Credentials.find()
        .then(result => {
            console.log(result)
            
    const accountSid = result[0].accountSid;
    const authToken = result[0].authToken;
    const client = require('twilio')(accountSid, authToken);
            client.messages
            .create({
                body: req.body.message,
                from: result[0].from,
                to: 'whatsapp:+91'+req.body.phone
            })
            .then(message => {
                res.status(200).json({
                    success:true, 
                    message:'Message sent successfully',
                });
            })
            .done();

       
         
        }).catch(err=>{
            res.status(500).json({
                success:false, 
                message: err,
                result:[]
            }); 
          }) 
}

const showwelcomeMessage =async (req, res, next) => {
    res.json('This is MeenakshiControlSystem API'); 
  }
   
module.exports = {
    getEnquiries, getAllEnquiries, postEnquiries,patchEnquiries,
    deleteEnquiry,sendMessage, showwelcomeMessage
}