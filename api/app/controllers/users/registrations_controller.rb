# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # permitindo parametro role na cricao de usuario
  before_action :configure_sign_up_params, only: [:create]

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:role])
  end

  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    role_param = sign_up_params[:role] # checa se o role é permitido (0 ou 1)
    unless User.roles.values.include?(role_param)
      render json: { error: 'Invalid role provided' }, status: :unprocessable_entity
      return
    end
    super
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  def update
    super
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  private

  # action name = def processada
  def respond_with(resource, _opts = {})
    if resource.persisted?
      message = case action_name
                when 'create' then 'User created successfully'
                when 'update' then 'User information updated successfully'
                else
                  'Action completed successfully'
                end

      render json: { message: "#{message}" }, status: :created
    else
      message = case action_name
                when 'create' then 'User not created'
                when 'update' then 'User information not updated'
                else
                  'Action not completed'
                end

      render json: { message: message, errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
