## Pull the mysql:5.7 image
FROM mysql:5.7

## The maintainer name and email
LABEL Afrida Tabassum <afrida1009@gmail.com>

# database = test and password for root = password
ENV MYSQL_DATABASE=patientdb \
    MYSQL_ROOT_PASSWORD=password

# when container will be started, we'll have `test` database created with this schema
COPY ./patientschem_patient.sql /docker-entrypoint-initdb.d/