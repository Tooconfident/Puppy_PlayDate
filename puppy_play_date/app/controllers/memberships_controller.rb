class MembershipsController < ApplicationController
  # before_action :set_membership, only: :leave

  def leave
    p params
    @membership2 = Membership.where("dog_id = #{params[:dog_id]} AND playdate_id = #{params[:id]}")
    p @membership2
    if @membership2[0].destroy
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
