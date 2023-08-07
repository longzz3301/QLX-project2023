const express = require('express');
const bodyParser = require('body-parser');
const yup = require('yup');

interface User {
    username : string;
    email: string ;
    password : string;
    phone:string ;
    age: number ; 
    officeCode : string ;
    role: string ;
    

}

export default yup.object({
    body: yup.object({
        username: yup.string().require() ,
        email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
        age: yup.number().require() ,
        phone: yup.string().matches(/^\d{10}$/, 'Số điện thoại không hợp lệ'),
        role: yup.string() ,
        office: yup.string().require() ,
    })
  
})