require 'net/http'

class PlaydatesController < ApplicationController
  before_action :set_playdate, only: [:show, :update, :destroy]

  def index
    render json: Playdate.all
  end

  def show
    render json: @playdate
  end

  def create
    @playdate = Playdate.new(playdate_params)

    # Attach location latitude and longitude to the @playdate object
    # (using Google Geolocation API)
    url = URI.parse("https://maps.googleapis.com/maps/api/geocode/json?address=#{@playdate.address}&key=AIzaSyA-ZuNXFqKCOUj3Lmkv25H5AyBn-GO6-OY")
    res = JSON.parse(Net::HTTP.get(url))

    @playdate.location = JSON.generate(res['results'][0]['geometry']['location'])
    @playdate.location.sub! "lat", "latitude"
    @playdate.location.sub! "lng", "longitude"

    if @playdate.save!
      render json: @playdate, status: :created, location: @playdate
    else
      render status: :bad_request
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
