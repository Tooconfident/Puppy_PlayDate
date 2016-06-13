
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

carlos_dog = Dog.new(
  name: Faker::Name.name,
  breed: dog_breeds.sample,
  age: rand(3..20),
  toy: Faker::Commerce.product_name,
  description: Faker::Lorem.paragraph,
  gender: ["male", "female"].sample,
  owner: carlos
)

Photo.create!(dog: carlos_dog, url: "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/The-stages-of-puppy-growth.jpg")
carlos_dog.save!

ryan = User.create!(
  name: "Ryan",
  username: "ryan",
  password: "123",
  email: "ryan@mail.com"
)

ryan_dog = Dog.new(
  name: "Link",
  breed: dog_breeds.sample,
  age: 1,
  toy: "Squeak",
  description: "A well-behaved, fun, dachshund, retriever mix. He loves to fetch and play with other dogs.",
  gender: "male",
  owner: ryan
)

Photo.create!(dog: ryan_dog, url: "http://ghk.h-cdn.co/assets/16/09/980x490/landscape-1457107485-gettyimages-512366437.jpg")
ryan_dog.save!

buck = User.create!(
  name: "Buck",
  username: "buck",
  password: "123",
  email: "buck@mail.com"
)

buck_dog = Dog.new(
  name: "Mimi",
  breed: dog_breeds.sample,
  age: 1,
  toy: "Squeak",
  description: "Hyper-active miniature poodle.",
  gender: "female",
  owner: buck
)

Photo.create!(dog: buck_dog, url: "http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg")
buck_dog.save!

renan = User.create!(
  name: "Renan",
  username: "renan",
  password: "123",
  email: "renan@mail.com"
)

renan_dog = Dog.new(
  name: "Beegee",
  breed: dog_breeds.sample,
  age: 1,
  toy: "Squeak",
  description: "Loves adventure and running; always on the run. Let's go!",
  gender: "male",
  owner: renan
)

Photo.create!(dog: renan_dog, url: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Puppy_on_Halong_Bay.jpg")
renan_dog.save!

