class Dog < ActiveRecord::Base
  has_many :memberships
  has_many :playdates, through: :memberships
  belongs_to :owner, class_name: 'User'
  has_one :photo
end
