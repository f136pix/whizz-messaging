class CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user
      render json: current_user, status: :ok
    else
      render json: { error: 'User not logged in' }, status: :unauthorized
    end
  end

end