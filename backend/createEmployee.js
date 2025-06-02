db = require("./models");
Employee = db.employee;


const createSampleEmployee = async () => {
    try {
      const employee = await Employee.create({
        EMSSAN: 1001,  // Primary Key (required)
        EXNUM: 5001,    // Another required field
        DOB: '1985-07-15',
        EMLNAM: 'Doe',
        EMFNAM: 'John',
        EMCITY: 'New York',
        EMST: 'NY',
        EMZIP1: '10001',
        EMSEX: 'M',
        EMHTL0: '555-123-4567',
        EMADD1: '123 Main St',
        EMDEPT: 'Engineering',
        EMCLS: 'Full-Time',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        
        // Optional fields example
        EMSOT1: 45000.00,
        EMSOT2: 5000.00,
        EMPASN: 'P12345',
        EMCTRY: 'USA',
        EMETHX: 'Non-Hispanic',
        
        // Set null for some optional fields
        HID: null,
        OHD: null,
        TRD: null,
        EMNCNT: null
      });
  
      console.log('Employee created:', employee.toJSON());
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };
  
  // Execute the function
  createSampleEmployee();


  INSERT INTO EMPLOYEE (
    EMSSAN, EXNUM, DOB, EMLNAM, EMFNAM, EMCITY, EMST, 
    EMZIP1, EMSEX, EMHTL0, EMADD1, EMDEPT, EMCLS, 
    CREATEDAT, UPDATEDAT, EMSOT1, EMSOT2, EMPASN, 
    EMCTRY, EMETHX, "EMSPS#", EMUSG, BUSY
) VALUES (
    1001,                           
    5001,                           
    '1985-07-15',                   
    'Doe',                         
    'John',                        
    'New York',                    
    'NY',                          
    '10001',                       
    'M',                           
    '555-123-4567',                
    '123 Main St',                 
    'Engineering',                 
    'Full-Time',                   
    DATE('2023-01-01'),            
    DATE('2023-01-01'),            
    45000.00,                       
    5000.00,                        
    'P12345',                      
    'USA',                         
    'Non-Hispanic',                
    12345,                         
    'A',                           
    0                               
);