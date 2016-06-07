class PlaydatesController < ApplicationController
  before_action :set_playdate, only: [:show, :update, :destroy]

  def index
    render json: Playdate.where(user_id: params[:user_id])
  end

  def show
    render json: @playdate
  end

  def create
    @playdate = Playdate.new(playdate_params)
    if @playdate.save
      render json: @playdate, status: :created, location: @playdate
    else
    end
  end

  def update
    if @playdate.update(playdate_params)
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  def destroy
    if @playdate.destroy
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  private

    def set_playdate
      @playdate = Playdate.find(params[:id])
    end

    def playdate_params
      params.permit(:name, :description, :location, :address, :frequency, :time_day, :user_id)
    end
end
