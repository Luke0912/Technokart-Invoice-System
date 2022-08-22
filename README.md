# Node Application

Invoice System for TechoKart

### Steps to clone the repository and open in VScode

```
git clone https://github.com/Luke0912/Technokart-Invoice-System.git
```

```
cd Technokart-Invoice-System
```

```
code .
```

## Paste .env file inside src folder or Create a .env File in src folder with "PORT" 8080 and your own Atlas Link for "DB_URL"

## Installation

Use the node package manager to install dependencies

```node
npm install
```

## Starting the Server

```node
npm start
```

## Starting the Development Server

```node
npm run dev
```

### Server starts at port 8080

#### Base URL : localhost:8080/invoices/

## How to use the App

### This App has 4 end Points.

1. Enter new invoice details.
2. Update a specific invoice based on invoice
   number
3. Delete a specific invoice based on invoice number
4. Get all invoices stored in the db
5. Get invoices between 2 dates

#### 1=> Enter new invoice details

End Point Example:

localhost:8080/invoices/createInvoice

POST Request: Accept's Json.

//invoiceDate required Format: <year>-<month>-<day>

Example : {
"invoiceDate":"2022-08-27",
"invoiceNumber":4,
"invoiceAmount":100
}

##### NOTE THIS END POINT HAVE BASIC VALIDATIONS.

// The Invoice which needs to be created it's date should not greater than the invoice date of previous or next invoice number.

#### 2=> Update a specific invoice based on invoice number

End Point Example:

localhost:8080/invoices/editInvoice/3

PATCH Request: Accept's Json.

{
"invoiceDate":"2022-08-25",
"invoiceNumber":3,
"invoiceAmount":120
}

##### NOTE THIS END POINT HAVE BASIC VALIDATIONS AND ITS DOES NOT VIOLATES THE VALIDATION OF INVOICE CREATION.

// Updates the invoices with the basic Validation involved at the time of invoice creation.

// The Invoice which needs to be updated it's date should not greater than the invoice date of previous or next invoice number.

#### 3=> Delete a specific invoice based on invoice number

End Point Example:

localhost:8080/invoices/deleteInvoice/1

DELETE Request: Accept's Invoice Number in Params

#### 4=> Get all invoices stored in the db

Get Request: It accept's the base URL to get all the invoices

End Point Example:

localhost:8080/invoices

Get Request: It also accept's 2 Queries for getting the invoices between dates

Example:

localhost:8080/invoices?startDate=2022-08-29&endDate=2022-08-30

1: startDate

2: endDate

##### NOTE THIS END POINT HAVE BASIC VALIDATIONS. BOTH THE QUERIES ARE REQUIRED TO FETCH THE DOCUMENTS.
