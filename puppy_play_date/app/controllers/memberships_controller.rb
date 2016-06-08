class MembershipsController < ApplicationController
  before_action :set_membership

  def leave

    if @membership.destroy
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  private

    def set_membership
      @playdate = Playdate.find(params[:id])
      @dogs = Dog.find(params[:dog_id])
      @membership = Membership.where("dog_id = "+@dogs.id+" AND playdate_id = "+@playdate.id+"")
      p @membership
    end
end
