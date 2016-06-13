class DogsController < ApplicationController
  before_action :set_dog, only: [:show, :update, :destroy]

  def show
    render json: @dog
  end

  def playdates
    dog = Dog.find(params[:dog_id])
    render json: dog.playdates
  end

  def create
    p params
    @dog = Dog.new(dog_params)
    if @dog.save
      render json: @dog, status: :created, location: @dog
    else
    end
  end

  def update
    if @dog.update(dog_params)
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  def destroy
    if @dog.destroy
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  private

    def set_dog
      @dog = Dog.find(params[:id])
    end

    def dog_params
      params.permit(:name, :breed, :age, :gender, :toy, :description, :user_id)
    end
end
