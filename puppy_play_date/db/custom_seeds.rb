
dog_breeds = []
CSV.foreach('./db/data/breeds.csv') do |row|
  dog_breeds << row[0]
end

carlos = User.create!(
  name: "Carlos",
  username: "carlos",
  password: "123",
  email: "carlos@mail.com"
)

carlos_dog = Dog.create!(
  name: Faker::Name.name,
  breed: dog_breeds.sample,
  age: rand(3..20),
  toy: Faker::Commerce.product_name,
  description: Faker::Lorem.paragraph,
  gender: ["male", "female"].sample,
  owner: carlos
)

Photo.create!(dog: carlos_dog, url: Faker::Placeholdit.image("50x50"))

ryan = User.create!(
  name: "Ryan",
  username: "ryan",
  password: "123",
  email: "ryan@mail.com"
)

ryan_dog = Dog.create!(
  name: "Link",
  breed: dog_breeds.sample,
  age: 1,
  toy: "Squeak",
  description: "A well-behaved, fun, dachshund, retriever mix. He loves to fetch and play with other dogs.",
  gender: "male",
  owner: ryan
)

Photo.create!(dog: ryan_dog, url: Faker::Placeholdit.image("50x50"))

buck = User.create!(
  name: "Buck",
  username: "buck",
  password: "123",
  email: "buck@mail.com"
)

buck_dog = Dog.create!(
  name: "Mimi",
  breed: dog_breeds.sample,
  age: 1,
  toy: "Squeak",
  description: "Hyper-active miniature poodle.",
  gender: "female",
  owner: buck
)

Photo.create!(dog: buck_dog, url: Faker::Placeholdit.image("50x50"))

renan = User.create!(
  name: "Renan",
  username: "renan",
  password: "123",
  email: "renan@mail.com"
)

renan_dog = Dog.create!(
  name: "Beegee",
  breed: dog_breeds.sample,
  age: 1,
  toy: "Squeak",
  description: "Loves adventure and running; always on the run. Let's go!",
  gender: "male",
  owner: renan
)

Photo.create!(dog: renan_dog, url: Faker::Placeholdit.image("50x50"))
