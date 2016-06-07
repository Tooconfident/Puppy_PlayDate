# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Photo.delete_all
Membership.delete_all
Playdate.delete_all
Dog.delete_all
User.delete_all

# Create fake users
24.times do
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
      breed: Faker::StarWars.specie,
      age: rand(3..20),
      toy: Faker::Commerce.product_name,
      description: Faker::Lorem.paragraph,
      gender: ["male", "female"].sample,
      owner: user
    )

    Photo.create!(dog: dog, url: Faker::Placeholdit.image("50x50"))
  end
end

4.times do
  Playdate.create!(
    name: Faker::Team.name,
    description: Faker::Lorem.paragraph,
    location: "1, 2",
    frequency: [nil, "daily", "weekly", "monthly"].sample,
    time_day: "#{Date::DAYNAMES.sample} at #{rand(0..24)}",
    organizer: User.all.sample,
    address: Faker::Address.street_address + ", " + Faker::Address.city + ", " + Faker::Address.state_abbr
  )
end

12.times do
  Membership.create!(
    dog: Dog.all.sample,
    playdate: Playdate.all.sample
  )
end

carlos = User.create!(
  name: "Carlos",
  username: "carlos",
  password: "123",
  email: "carlos@mail.com"
)

carlos_dog = Dog.create!(
  name: Faker::Name.name,
  breed: Faker::StarWars.specie,
  age: rand(3..20),
  toy: Faker::Commerce.product_name,
  description: Faker::Lorem.paragraph,
  gender: ["male", "female"].sample,
  owner: carlos
)

Photo.create!(dog: carlos_dog, url: Faker::Placeholdit.image("50x50"))
