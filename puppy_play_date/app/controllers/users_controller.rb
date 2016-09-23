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
      render json: { success: false }
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

  # Returns all the dogs for a specific user
  def dogs
    user = User.find(params[:user_id])
    render json: user.dogs
  end

  def playdates
    user = User.find(params[:user_id])
    render json: user.playdates
  end

  private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.permit(:username, :name, :email, :password)
    end
end
