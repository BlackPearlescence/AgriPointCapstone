const express = require('express');
const { consoleLogger } = require('../errorhandling/logger');
const { ProductReview, Product, Customer } = require('../schema');
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');


const router = express.Router();

