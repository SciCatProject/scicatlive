#!/bin/sh

# enable management plugin and creating user
( rabbitmqctl wait --pid 1 --timeout 60 ; \
rabbitmq-plugins enable rabbitmq_management ; \
rabbitmqctl add_user "$RABBITMQ_USER" "$RABBITMQ_PASSWORD" 2>/dev/null ; \
rabbitmqctl set_user_tags "$RABBITMQ_USER" administrator ; \
rabbitmqctl set_permissions -p / "$RABBITMQ_USER"  ".*" ".*" ".*" ; \
echo "*** User '$RABBITMQ_USER' with password '$RABBITMQ_PASSWORD' completed. ***" ; \
echo "*** Log in the WebUI at port 15672 (example: http:/localhost:15672) ***") &

rabbitmq-server "$@"
