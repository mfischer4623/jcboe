# jcboe

(1) cd auth-server
    node server.js

    Server is running on port 5000

(2) cd backend
    node server.js

    Server is running on port 8080

(3) cd frontend
    HTTPS=true SSL_CRT_FILE=\wildcard_jcboe_org.crt SSL_KEY_FILE=\wildcard_jcboe_org.key npm start
__________________________________________________________________________________________________________________
(3a)
    cd frontend
    PORT=443 HTTPS=true SSL_CRT_FILE=wildcard_jcboe_org.crt SSL_KEY_FILE=wildcard_jcboe_org.key npm start

    cd testfrontend
    PORT=8444 HTTPS=true SSL_CRT_FILE=wildcard_jcboe_org.crt SSL_KEY_FILE=wildcard_jcboe_org.key npm start

    cd ..
    node frontend-server.js

    website URL:        https://10.0.0.42:8443
    test website URL:   https://10.0.0.43:8443
__________________________________________________________________________________________________________________

    website URL:   https://"IP Address":443

SQL Server

    10.0.0.42:1433
    