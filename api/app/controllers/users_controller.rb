class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    page = params[:page].presence&.to_i || 1
    per_page = params[:per_page].presence&.to_i || 10
    
    if params[:raw]
      render json: User.all
      return
    end

    if params[:email]
      @users = User.where('email LIKE ?', "%#{params[:email]}%")
    else
      @users = User.all
    end

    if params[:sort] == nil
      @users = @users.offset((page - 1) * per_page).limit(per_page)
    end

    if params[:sort] == "email"
      @users = @users.order(email: :asc).offset((page - 1) * per_page).limit(per_page)
    end
    
    render json: @users
  end

  # GET /users/:id
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/:id
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  def user_params
    params.require(:user).permit(:email, :password, :role)
  end
end