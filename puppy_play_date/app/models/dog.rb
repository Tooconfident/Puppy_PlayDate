class Dog < ActiveRecord::Base
  has_many :memberships
  has_many :playdates, through: :memberships
  belongs_to :owner, class_name: "User", foreign_key: "user_id"
  has_one :photo

  validates :name, :breed, :age, presence: true

  def avatar
    self.photo.url
  end

  def as_json(options = {})
    super(options.merge(include: :owner, methods: [:avatar, :owner_username]))
  end

  def owner_username
    self.owner.username
  end
end
