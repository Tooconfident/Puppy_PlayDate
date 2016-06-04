class User < ActiveRecord::Base
  has_many :dogs
  has_many :playdates
end
