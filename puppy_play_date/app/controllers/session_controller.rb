class SessionController < ApplicationController
  def login

    new_user = User.find_by(username: params[:username])
    if new_user && new_user.authenticate(params[:password])
      p params
      render json: new_user.id
    else
      render json: { success: false }
    end
  end
end
