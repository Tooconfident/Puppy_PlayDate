class Membership < ActiveRecord::Base
  belongs_to :dog
  belongs_to :playdate
end
