class SessionController < ApplicationController

  def login
    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      render json: user.id
    else
      response = {
        success: false,
        error: "Invalid credentials"
      }
      render json: response, status: 401
    end
  end

end
