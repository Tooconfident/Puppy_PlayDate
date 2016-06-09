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

    puppies = ["https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/The-stages-of-puppy-growth.jpg",
    "http://ghk.h-cdn.co/assets/16/09/980x490/landscape-1457107485-gettyimages-512366437.jpg",
    "http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/c/c7/Puppy_on_Halong_Bay.jpg",
    "http://upload.wikimedia.org/wikipedia/commons/6/64/The_Puppy.jpg",
    "http://blogs-images.forbes.com/kristintablang/files/2016/02/Uber-Puppies.jpg",
    "http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg",
    "http://images2.fanpop.com/image/photos/9400000/Puppy-Love-puppies-9460996-1600-1200.jpg",
    "http://lovelace-media.imgix.net/uploads/191/0f832b40-d622-0132-cea9-0e01949ad350.jpg?",
    "http://www.cfau-pd.net/data/wallpapers/203/WDF_2411568.jpg",
    "http://science-all.com/images/wallpapers/puppy-images/puppy-images-20.jpg",
    "http://science-all.com/images/wallpapers/puppy-pic/puppy-pic-22.jpg",
    "https://puppydogweb.com/wp-content/uploads/2015/05/husky-puppy-18220-1920x1200.jpg",
    "http://www.pawderosa.com/images/puppies.jpg",
    "http://cdn2-www.dogtime.com/assets/uploads/2010/12/puppies.jpg"]

    url = puppies.sample

    Photo.create!(dog: dog, url: url)
  end
end

# Create fake playdates
60.times do
  Playdate.create!(
    name: Faker::Team.name,
    description: Faker::Lorem.paragraph,
    location: "{\"latitude\": " + (rand()*(37.8-37.71)+37.71).to_s + ", \"longitude\": " + ((rand()*(122.48-122.39)+122.39)* -1).to_s + "}",
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
