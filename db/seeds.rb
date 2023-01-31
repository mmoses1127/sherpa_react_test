# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating user types..."
  # Create A and B UserTypes:

  UserType.create!(

    name: 'A'
  )

  UserType.create!(

    name: 'B'
  )
  
  puts "Creating users..."
  # Create one user of each type, A and B:
  User.create!(

    email: 'a@user.io', 
    password: 'password',
    user_type_id: UserType.find_by(name: 'A').id
  )

  User.create!(

    email: 'b@user.io', 
    password: 'password',
    user_type_id: UserType.find_by(name: 'B').id
  )



  puts "Done!"
end