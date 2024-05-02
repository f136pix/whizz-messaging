#!/bin/sh

set -e

if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

echo "Bundle version: $(bundle -v)"
echo "Rails version: $(rails --version)"
#echo $(ls)

#rails s -b 0.0.0.0
#RAILS_ENV=production bundle exec rails s -b 0.0.0.0

export DATABASE_USERNAME=admin
export DATABASE_PASSWORD=paS5w0rD!
export DATABASE_HOST=pgsql-clusterip-srv
export DATABASE_PORT=5432

rake db:create
rake db:migrate

bundle exec rails runner script/create_root_user.rb

bundle exec rails s -b 0.0.0.0


