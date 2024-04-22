# Rails.application.routes.draw do
#   devise_for :users, controllers: {
#     sessions: 'users/sessions',
#     registration: 'users/registrations'
#   }
#   # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
# end

Rails.application.routes.draw do
  resources :users
  resources :messages
  get '/current_user', to: 'current_user#index'
  get '/current_user/check', to: 'current_user#check'
  devise_for :users, path: '', path_names: { # overriding default devise paths 
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
