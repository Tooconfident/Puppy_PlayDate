require 'csv'

Photo.delete_all
Membership.delete_all
Playdate.delete_all
Dog.delete_all
User.delete_all

dog_descriptions = [
  "A lovely dog always seeking adventure.",
  "Loves to play outside and socialize.",
  "A strong and active dog. Loves to play catch.",
  "A family dog who cares a lot about the ones around him",
]

dog_breeds = []
CSV.foreach('./db/data/breeds.csv') do |row|
  dog_breeds << row[0]
end

# Create fake users
# 500.times do
20.times do
  user = User.create!(
    name: Faker::Name.name,
    username: Faker::Internet.user_name,
    email: Faker::Internet.email,
    password: '123'
  )

  # Create fake dogs
  rand(0..10).times do
    dog = Dog.create!(
      name: Faker::Name.name,
      breed: dog_breeds.sample,
      age: rand(3..20),
      toy: Faker::Commerce.product_name,
      description: dog_descriptions.sample,
      gender: ["male", "female"].sample,
      owner: user
    )

    # Create picture for the dog
    Photo.create!(dog: dog, url: Faker::Placeholdit.image("50x50"))
  end
end

# Create fake playdates
50.times do
  Playdate.create!(
    name: Faker::Team.name,
    description: Faker::Lorem.paragraph,
    location: "{\"coordinate\":{\"latitude\": " + (rand()*(37.8-37.71)+37.71).to_s + ", \"longitude\": " + ((rand()*(122.48-122.39)+122.39)* -1).to_s + "}}",
    frequency: [nil, "daily", "weekly", "monthly"].sample,
    time_day: "#{Date::DAYNAMES.sample} at #{rand(0..24)}",
    organizer: User.all.sample,
    address: Faker::Address.street_address + ", " + Faker::Address.city + ", " + Faker::Address.state_abbr
  )
end

100.times do
  Membership.create!(
    dog: Dog.all.sample,
    playdate: Playdate.all.sample
  )
end

# For personal custom seeds
require_relative 'custom_seeds'
