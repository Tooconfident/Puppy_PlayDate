class UsersController < ApplicationController

  before_action :set_user, only: [:show, :update, :destroy]

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created, location: @user
    else
    end
  end

  def update
    if @user.update(user_params)
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  def destroy
    if @user.destroy
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.permit(:username, :name, :email, :password)
    end
end
