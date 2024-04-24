FROM ruby:3.0.2

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN gem install bundler -v 2.3.5

WORKDIR /app
COPY Gemfile Gemfile.lock ./

RUN bundle check || bundle install

COPY . ./

RUN chmod +x ./entrypoints/docker-entrypoint.sh

ENTRYPOINT ["./entrypoints/docker-entrypoint.sh"]
