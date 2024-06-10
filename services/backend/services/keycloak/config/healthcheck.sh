#!/bin/bash

if ! exec 3<>/dev/tcp/localhost/9000; then
    exit 1
fi

printf "GET /health/ready HTTP/1.1\r\nHost: localhostConnection: close\r\n\r\n" >&3
timeout --preserve-status 5 grep -m 1 "UP" <&3
exit_status=$?
exec 3>&-
exit $exit_status
