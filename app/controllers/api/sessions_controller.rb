class Api::SessionsController < ApplicationController

  def show
    @user = current_user
    if @user
      render json: { user: {id: @user.id, email: @user.email} }
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])

    if @user 
      login!(@user)
      render json: { user: {id: @user.id, email: @user.email} }
    else
      render json: { errors: ['The email or password was invalid.']}, status: 422
    end
  end

  def destroy
    logout!
    render json: { message: 'success' }
  end

end
