class Playdate < ActiveRecord::Base
  belongs_to :organizer, class_name: 'User', foreign_key: "user_id"
  has_many :memberships
  has_many :dogs, through: :memberships

  validates :name, :time_day, :location, presence: true

  def member_count
    self.dogs.count
  end

  def as_json(options = {})
    super(options.merge(include: :dogs, methods: :member_count))
  end
end
