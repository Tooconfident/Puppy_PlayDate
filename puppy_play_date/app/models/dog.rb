class Dog < ActiveRecord::Base
  before_save :ensure_avatar

  has_many :memberships
  has_many :playdates, through: :memberships
  belongs_to :owner, class_name: "User", foreign_key: "user_id"
  has_one :photo

  validates :name, :breed, :age, presence: true

  def avatar
    self.photo.url
  end

  def as_json(options = {})
    super(options.merge(methods: [:avatar, :owner_username]))
  end

  def owner_username
    self.owner.username
  end

  # Ensures a dog has a photo if no one was provided
  def ensure_avatar
    if self.photo.nil?
      default_avatar_url = "http://coastalgsrsd.org/wp-content/uploads/2015/10/dogPlaceholder.png"
      Photo.create!(dog: self, url: default_avatar_url)
    end
  end
end
