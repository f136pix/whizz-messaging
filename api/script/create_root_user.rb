require_relative '../config/environment'

user = User.create(email: 'root@mail.com', password: '123456', role: 1)

unless user.persisted?
  puts "Erro ao criar user: #{user.errors.full_messages.join(", ")}"
end