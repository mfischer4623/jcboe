# jcboe

(1) cd testbackend
    node server.js

    Server is running on port 10.0.0.42:8080

(2) cd testfrontend
    HOST=10.0.0.42 PORT=443 HTTPS=true SSL_CRT_FILE=wildcard_jcboe_org.crt SSL_KEY_FILE=wildcard_jcboe_org.key npm start

__________________________________________________________________________________________________________________

    website URL:    https://as400.jcboe.org/
                    https://as400.jcboe.org/adminlogin
    
    https://10.0.0.42:443       frontend
    https://10.0.0.42:8080      backend

    10.0.0.42:1433              SQL Server

    
    