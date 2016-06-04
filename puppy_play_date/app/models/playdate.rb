class Playdate < ActiveRecord::Base
  belongs_to :organizer, class_name: 'User'
  has_many :memberships
  has_many :dogs, through: :memberships
end
