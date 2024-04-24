# begin
#   ActiveRecord::Base.connection
# rescue ActiveRecord::NoDatabaseError
#   puts "--> Criando DB"
#   `rails db:create`
#
#   ActiveRecord::Migration.check_pending!
# rescue ActiveRecord::PendingMigrationError
#   puts "--> Realizando migrations"
#   `rails db:migrate`
# end