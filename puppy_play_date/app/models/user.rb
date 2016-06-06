class User < ActiveRecord::Base
  has_secure_password

  has_many :dogs
  has_many :playdates

  validates :username, :email, :name, presence: true
  validates :email, uniqueness: true

  def as_json(options = {})
    super(options.merge(include: {dogs: { methods: [:avatar] }}))
  end
end
