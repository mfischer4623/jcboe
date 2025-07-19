# jcboe

(1) cd auth-server
    node server.js

    Server is running on port 5000
__________________________________________________________________________________________________________________

(2) cd backend
    node server.js

    Server is running on port 8080

(3) cd frontend
    HTTPS=true SSL_CRT_FILE=\wildcard_jcboe_org.crt SSL_KEY_FILE=\wildcard_jcboe_org.key npm start
__________________________________________________________________________________________________________________

(2a) cd backend
     node server.js

     Server is running on port 8080

     cd testbackend
     node server.js

     Server is running on port 8081

__________________________________________________________________________________________________________________
(3a)
    cd frontend
    HOST=10.0.0.42 PORT=443 HTTPS=true SSL_CRT_FILE=wildcard_jcboe_org.crt SSL_KEY_FILE=wildcard_jcboe_org.key npm start

    cd testfrontend
    HOST=10.0.0.43 PORT=8444 HTTPS=true SSL_CRT_FILE=wildcard_jcboe_org.crt SSL_KEY_FILE=wildcard_jcboe_org.key npm start

    cd ..
    node frontend-server.js

    website URL:        https://as400.jcboe.org
    test website URL:   https://testas400.jcboe.org:8444
__________________________________________________________________________________________________________________

    website URL:   https://"IP Address":443

SQL Server

    10.0.0.42:1433
    