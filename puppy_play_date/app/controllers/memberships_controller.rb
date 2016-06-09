class MembershipsController < ApplicationController
  before_action :set_membership, only: :leave

  def leave
    p params
    if @membership.destroy
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

   def join
    p params
    @membership = Membership.create(dog_id: params[:dog_id], playdate_id: params[:id])
    if @membership.save
      render json: { success: true, membership: @membership.id }
    else
      render json: { success: false }
    end
  end

  private

    def set_membership
      @playdate = Playdate.find(params[:id])
      @dog = Dog.find(params[:dog_id])
      @membership = Membership.where("dog_id = "+@dog.id+" AND playdate_id = "+@playdate.id+"")
      p @membership
    end
end
